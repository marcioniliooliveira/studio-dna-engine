'use strict';

/**
 * studio-dna v2.5 Zag-Style DOM Accessibility Connector
 * Maps micro-FSM state and context to WCAG 2.2 AA compliant DOM attributes and handlers.
 * Conforms to Zag.js prop getter conventions.
 */

/**
 * Default prop normalizer (identity).
 * @param {Object} props
 * @returns {Object}
 */
function defaultNormalizeProps(props) {
  return props;
}

/**
 * Connects FSM state and send dispatcher to accessible DOM prop getters.
 * Accepts either (state, send, normalizeProps) or (machine, normalizeProps).
 *
 * @param {Object} stateOrMachine - State snapshot or machine instance
 * @param {Function|Object} [sendOrNormalize] - Event dispatcher or normalizeProps
 * @param {Function} [customNormalize] - Custom prop normalizer
 * @returns {Object} Zag-style form API with prop getters
 */
function connect(stateOrMachine, sendOrNormalize, customNormalize) {
  let state;
  let send;
  let normalizeProps = defaultNormalizeProps;

  if (stateOrMachine && typeof stateOrMachine.send === 'function' && stateOrMachine.state !== undefined) {
    // Passed machine instance directly
    const machine = stateOrMachine;
    send = (event) => machine.send(event);
    state = typeof machine.getSnapshot === 'function' ? machine.getSnapshot() : {
      state: machine.state,
      value: machine.state,
      context: machine.context,
      matches: (s) => machine.state === s
    };
    if (typeof sendOrNormalize === 'function') {
      normalizeProps = sendOrNormalize;
    }
  } else {
    // Passed state snapshot and send function
    state = stateOrMachine || {};
    send = typeof sendOrNormalize === 'function' ? sendOrNormalize : () => {};
    if (typeof customNormalize === 'function') {
      normalizeProps = customNormalize;
    }
  }

  const context = state.context || {};
  const currentState = state.value || state.state || 'idle';
  const errors = context.errors || {};
  const touched = context.touched || {};
  const values = context.values || {};
  const displayValues = context.displayValues || {};
  const isSubmitting = currentState === 'submitting' || Boolean(context.isSubmitting);
  const isValidating = currentState === 'validating' || Boolean(context.isValidating);
  const isSuccess = currentState === 'success';
  const isError = currentState === 'error';
  const isDelayed = Boolean(context.latency && context.latency.isDelayed);
  const submitCount = context.submitCount || 0;
  const activeField = context.activeField || null;

  const api = {
    // Direct status indicators
    state: currentState,
    isSubmitting,
    isValidating,
    isSuccess,
    isError,
    isDelayed,
    isValid: Boolean(context.isValid),

    /**
     * Props for root <form> element
     */
    getRootProps() {
      return normalizeProps({
        role: 'form',
        noValidate: true,
        'data-state': currentState,
        'aria-busy': isSubmitting ? 'true' : 'false',
        onSubmit(event) {
          if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
          }
          send({ type: 'SUBMIT' });
        }
      });
    },

    /**
     * Props for input / select / textarea field
     * @param {string} fieldName
     * @param {Object} [options]
     */
    getInputProps(fieldName, options = {}) {
      const fieldId = options.id || `field-${fieldName}`;
      const errorId = `error-${fieldName}`;
      const descId = options.describedBy || (errors[fieldName] ? errorId : undefined);
      const isFieldInvalid = Boolean(errors[fieldName]);
      const isTouched = Boolean(touched[fieldName]);
      const value = displayValues[fieldName] !== undefined
        ? displayValues[fieldName]
        : (values[fieldName] !== undefined ? values[fieldName] : '');

      const props = {
        id: fieldId,
        name: fieldName,
        value: String(value),
        disabled: Boolean(options.disabled || isSubmitting || isSuccess),
        'aria-invalid': isFieldInvalid ? 'true' : 'false',
        'aria-required': options.required ? 'true' : undefined,
        'aria-describedby': descId,
        'data-state': isFieldInvalid ? 'invalid' : (isTouched ? 'valid' : 'idle'),
        'data-touched': isTouched ? 'true' : 'false',
        'data-focused': activeField === fieldName ? 'true' : 'false',
        autoComplete: options.autoComplete || undefined,
        placeholder: options.placeholder || undefined,

        onChange(event) {
          const val = event && event.target ? event.target.value : (event !== undefined ? event : '');
          const cursorPosition = (event && event.target && typeof event.target.selectionStart === 'number')
            ? event.target.selectionStart
            : undefined;

          send({
            type: 'INPUT',
            field: fieldName,
            value: val,
            cursorPosition
          });
        },

        onBlur() {
          send({
            type: 'BLUR',
            field: fieldName
          });
        },

        onFocus() {
          send({
            type: 'FOCUS',
            field: fieldName
          });
        },

        onKeyDown(event) {
          if (event && event.key === 'Enter' && options.submitOnEnter !== false) {
            // Allow form submission on Enter in text inputs
            if (event.target && event.target.tagName !== 'TEXTAREA') {
              if (typeof event.preventDefault === 'function') {
                event.preventDefault();
              }
              send({ type: 'SUBMIT' });
            }
          }
        }
      };

      return normalizeProps(props);
    },

    /**
     * Alias for getInputProps
     */
    getFieldProps(fieldName, options) {
      return api.getInputProps(fieldName, options);
    },

    /**
     * Props for <label> associated with a field
     * @param {string} fieldName
     */
    getLabelProps(fieldName) {
      return normalizeProps({
        htmlFor: `field-${fieldName}`,
        id: `label-${fieldName}`,
        'data-invalid': Boolean(errors[fieldName]) ? 'true' : 'false',
        'data-disabled': (isSubmitting || isSuccess) ? 'true' : 'false'
      });
    },

    /**
     * Props for field error message element
     * @param {string} fieldName
     */
    getErrorMessageProps(fieldName) {
      const errorMessage = errors[fieldName] || '';
      const hasError = Boolean(errorMessage);

      return normalizeProps({
        id: `error-${fieldName}`,
        role: 'alert',
        'aria-live': 'polite',
        'data-visible': hasError ? 'true' : 'false',
        hidden: !hasError,
        children: errorMessage
      });
    },

    /**
     * Props for global form error banner
     */
    getErrorBannerProps() {
      const bannerError = context.bannerError || (isError ? (context.lastError || 'Falha ao processar formulário') : '');
      const hasError = Boolean(bannerError);

      return normalizeProps({
        id: 'form-error-banner',
        role: 'alert',
        'aria-live': 'assertive',
        'data-visible': hasError ? 'true' : 'false',
        hidden: !hasError,
        children: bannerError
      });
    },

    /**
     * Props for form submit button
     * @param {Object} [options]
     */
    getSubmitButtonProps(options = {}) {
      const shouldDisable = Boolean(
        options.disabled ||
        isSubmitting ||
        isSuccess ||
        (!context.isValid && submitCount > 0)
      );

      return normalizeProps({
        type: 'submit',
        disabled: shouldDisable,
        'aria-busy': isSubmitting ? 'true' : 'false',
        'data-state': isSubmitting ? 'submitting' : currentState,
        onClick(event) {
          if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
          }
          send({ type: 'SUBMIT' });
        }
      });
    },

    /**
     * Props for reset button
     */
    getResetButtonProps() {
      return normalizeProps({
        type: 'button',
        disabled: isSubmitting,
        onClick() {
          send({ type: 'RESET' });
        }
      });
    },

    /**
     * Props for latency watchdog delayed notice
     */
    getDelayedNoticeProps() {
      return normalizeProps({
        id: 'form-latency-notice',
        role: 'status',
        'aria-live': 'polite',
        'data-visible': isDelayed ? 'true' : 'false',
        hidden: !isDelayed,
        children: isDelayed ? 'Aguarde, processando cotação nos servidores JumpPlay...' : ''
      });
    },

    /**
     * Props for transaction success confirmation container
     */
    getSuccessNoticeProps() {
      return normalizeProps({
        id: 'form-success-notice',
        role: 'status',
        'aria-live': 'polite',
        'data-visible': isSuccess ? 'true' : 'false',
        hidden: !isSuccess,
        'data-token': context.confirmationToken || context.quoteId || undefined,
        children: isSuccess ? 'Solicitação confirmada com sucesso!' : ''
      });
    },

    /**
     * Props for draft recovery prompt / banner
     */
    getDraftNoticeProps() {
      const hasDraft = Boolean(context.hasSavedDraft);
      return normalizeProps({
        id: 'form-draft-notice',
        role: 'region',
        'aria-label': 'Recuperação de rascunho',
        'data-visible': hasDraft ? 'true' : 'false',
        hidden: !hasDraft
      });
    },

    /**
     * Props for draft restore action button
     */
    getDraftRestoreButtonProps() {
      return normalizeProps({
        type: 'button',
        disabled: isSubmitting,
        onClick() {
          send({ type: 'RESTORE_DRAFT' });
        }
      });
    },

    /**
     * Props for draft discard action button
     */
    getDraftDiscardButtonProps() {
      return normalizeProps({
        type: 'button',
        disabled: isSubmitting,
        onClick() {
          send({ type: 'DISCARD_DRAFT' });
        }
      });
    }
  };

  return api;
}

/**
 * Binds Zag-style prop getters to an actual DOM <form> tree.
 * Automatically synchronizes attributes and attaches event listeners.
 *
 * @param {HTMLElement} formElement - HTMLFormElement to bind
 * @param {Object} machine - FSM instance
 * @returns {Function} Unbind / cleanup function
 */
function bindToDOM(formElement, machine) {
  if (!formElement || typeof formElement.querySelector !== 'function') {
    throw new TypeError('bindToDOM requires a valid DOM element');
  }

  function render(snapshot) {
    const api = connect(snapshot, machine.send);
    const rootProps = api.getRootProps();

    formElement.setAttribute('data-state', rootProps['data-state']);
    formElement.setAttribute('aria-busy', rootProps['aria-busy']);

    // Sync input fields
    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const name = input.name || input.getAttribute('name');
      if (!name) return;

      const fieldProps = api.getInputProps(name);
      if (input.value !== fieldProps.value) {
        input.value = fieldProps.value;
      }
      input.setAttribute('aria-invalid', fieldProps['aria-invalid']);
      if (fieldProps['aria-describedby']) {
        input.setAttribute('aria-describedby', fieldProps['aria-describedby']);
      } else {
        input.removeAttribute('aria-describedby');
      }
      input.setAttribute('data-state', fieldProps['data-state']);
      input.disabled = fieldProps.disabled;
    });

    // Sync error elements
    const errorEls = formElement.querySelectorAll('[data-error-for]');
    errorEls.forEach(el => {
      const fieldName = el.getAttribute('data-error-for');
      const errorProps = api.getErrorMessageProps(fieldName);
      el.hidden = errorProps.hidden;
      el.textContent = errorProps.children || '';
      el.setAttribute('data-visible', errorProps['data-visible']);
    });

    // Sync submit button
    const submitBtn = formElement.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      const submitProps = api.getSubmitButtonProps();
      submitBtn.disabled = submitProps.disabled;
      submitBtn.setAttribute('aria-busy', submitProps['aria-busy']);
      submitBtn.setAttribute('data-state', submitProps['data-state']);
    }

    // Sync delayed notice
    const delayNotice = formElement.querySelector('#form-latency-notice');
    if (delayNotice) {
      const delayProps = api.getDelayedNoticeProps();
      delayNotice.hidden = delayProps.hidden;
      delayNotice.setAttribute('data-visible', delayProps['data-visible']);
      delayNotice.textContent = delayProps.children;
    }

    // Sync success notice
    const successNotice = formElement.querySelector('#form-success-notice');
    if (successNotice) {
      const successProps = api.getSuccessNoticeProps();
      successNotice.hidden = successProps.hidden;
      successNotice.setAttribute('data-visible', successProps['data-visible']);
      successNotice.textContent = successProps.children;
    }
  }

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault();
    machine.send({ type: 'SUBMIT' });
  };
  formElement.addEventListener('submit', onSubmit);

  // Handle input changes
  const onInput = (e) => {
    const target = e.target;
    if (!target || !target.name) return;
    machine.send({
      type: 'INPUT',
      field: target.name,
      value: target.value,
      cursorPosition: target.selectionStart
    });
  };
  formElement.addEventListener('input', onInput);

  // Handle blur
  const onFocusOut = (e) => {
    const target = e.target;
    if (!target || !target.name) return;
    machine.send({ type: 'BLUR', field: target.name });
  };
  formElement.addEventListener('focusout', onFocusOut);

  // Subscribe to updates
  const unsubscribe = machine.subscribe(render);

  return function unbind() {
    formElement.removeEventListener('submit', onSubmit);
    formElement.removeEventListener('input', onInput);
    formElement.removeEventListener('focusout', onFocusOut);
    unsubscribe();
  };
}

module.exports = {
  connect,
  bindToDOM
};
