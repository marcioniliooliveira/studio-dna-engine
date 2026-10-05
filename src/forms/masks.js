'use strict';

/**
 * studio-dna v2.5 Adaptive Input Masks & Modulo 11 Verification Engine
 * Provides deterministic masking, caret tracking, and Brazilian document/postal validations.
 * Pure vanilla JS with zero external dependencies.
 */

/**
 * Strips all non-digit characters from a string.
 * @param {string|number} value
 * @returns {string}
 */
function stripNonDigits(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\D/g, '');
}

/**
 * Checks if all characters in a string are identical.
 * @param {string} str
 * @returns {boolean}
 */
function isAllIdentical(str) {
  if (!str || str.length <= 1) return false;
  return str.split('').every(ch => ch === str[0]);
}

/**
 * Validates a Brazilian CPF using strict Modulo 11 check digits.
 * @param {string} cpf
 * @returns {boolean}
 */
function validateCPF(cpf) {
  const digits = stripNonDigits(cpf);
  if (digits.length !== 11) return false;
  if (isAllIdentical(digits)) return false;

  const d = digits.split('').map(Number);

  // Check digit 1: weights 10 down to 2
  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += d[i] * (10 - i);
  }
  const rem1 = sum1 % 11;
  const expectedD1 = rem1 < 2 ? 0 : 11 - rem1;
  if (d[9] !== expectedD1) return false;

  // Check digit 2: weights 11 down to 2
  let sum2 = 0;
  for (let i = 0; i < 10; i++) {
    sum2 += d[i] * (11 - i);
  }
  const rem2 = sum2 % 11;
  const expectedD2 = rem2 < 2 ? 0 : 11 - rem2;
  if (d[10] !== expectedD2) return false;

  return true;
}

/**
 * Validates a Brazilian CNPJ using strict Modulo 11 check digits.
 * @param {string} cnpj
 * @returns {boolean}
 */
function validateCNPJ(cnpj) {
  const digits = stripNonDigits(cnpj);
  if (digits.length !== 14) return false;
  if (isAllIdentical(digits)) return false;

  const d = digits.split('').map(Number);
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Check digit 1
  let sum1 = 0;
  for (let i = 0; i < 12; i++) {
    sum1 += d[i] * weights1[i];
  }
  const rem1 = sum1 % 11;
  const expectedD1 = rem1 < 2 ? 0 : 11 - rem1;
  if (d[12] !== expectedD1) return false;

  // Check digit 2
  let sum2 = 0;
  for (let i = 0; i < 13; i++) {
    sum2 += d[i] * weights2[i];
  }
  const rem2 = sum2 % 11;
  const expectedD2 = rem2 < 2 ? 0 : 11 - rem2;
  if (d[13] !== expectedD2) return false;

  return true;
}

/**
 * Validates either a CPF or CNPJ based on length.
 * @param {string} doc
 * @returns {boolean}
 */
function validateDocument(doc) {
  const digits = stripNonDigits(doc);
  if (digits.length === 11) {
    return validateCPF(digits);
  }
  if (digits.length === 14) {
    return validateCNPJ(digits);
  }
  return false;
}

/**
 * Validates Brazilian CEP (postal code, 8 digits).
 * @param {string} cep
 * @returns {boolean}
 */
function validateCEP(cep) {
  const digits = stripNonDigits(cep);
  if (digits.length !== 8) return false;
  if (isAllIdentical(digits)) return false;
  return true;
}

/**
 * Validates phone number (10 or 11 digits standard BR, or E.164 10-15 digits).
 * @param {string} phone
 * @returns {boolean}
 */
function validatePhone(phone) {
  if (!phone) return false;
  const digits = stripNonDigits(phone);
  if (digits.length < 10 || digits.length > 15) return false;
  // If Brazilian 10 or 11 digits, verify area code (DDD 11-99)
  if (digits.length === 10 || digits.length === 11) {
    const ddd = parseInt(digits.slice(0, 2), 10);
    if (ddd < 11 || ddd > 99) return false;
    if (digits.length === 11 && digits[2] !== '9') return false; // Mobile starts with 9
  }
  return true;
}

/**
 * RFC 5322 compliant email validator regex.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Adaptive CPF mask (000.000.000-00).
 * @param {string} value
 * @returns {string}
 */
function maskCPF(value) {
  const digits = stripNonDigits(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Adaptive CNPJ mask (00.000.000/0001-00).
 * @param {string} value
 * @returns {string}
 */
function maskCNPJ(value) {
  const digits = stripNonDigits(value).slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

/**
 * Dynamic Document mask: adapts automatically between CPF (<= 11 digits) and CNPJ (12-14 digits).
 * @param {string} value
 * @returns {string}
 */
function maskDocument(value) {
  const digits = stripNonDigits(value).slice(0, 14);
  if (digits.length <= 11) {
    return maskCPF(digits);
  }
  return maskCNPJ(digits);
}

/**
 * Dynamic phone mask:
 * Supports landline (10 digits: (XX) XXXX-XXXX),
 * mobile (11 digits: (XX) XXXXX-XXXX),
 * and international prefix (+00...).
 * @param {string} value
 * @returns {string}
 */
function maskPhone(value) {
  if (!value) return '';
  const str = String(value).trim();
  const hasPlus = str.startsWith('+');
  const digits = stripNonDigits(str);

  if (hasPlus) {
    if (digits.length <= 2) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 9) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 13) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
  }

  const capped = digits.slice(0, 11);
  if (capped.length <= 2) return capped.length > 0 ? `(${capped}` : '';
  if (capped.length <= 6) return `(${capped.slice(0, 2)}) ${capped.slice(2)}`;
  if (capped.length <= 10) {
    return `(${capped.slice(0, 2)}) ${capped.slice(2, 6)}-${capped.slice(6)}`;
  }
  // 11 digits: mobile
  return `(${capped.slice(0, 2)}) ${capped.slice(2, 7)}-${capped.slice(7)}`;
}

/**
 * Adaptive CEP mask (00000-000).
 * @param {string} value
 * @returns {string}
 */
function maskCEP(value) {
  const digits = stripNonDigits(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/**
 * BRL Currency mask: formats value into Brazilian Real representation (R$ 1.234,56).
 * Accepts number or raw cents/digit string.
 * @param {number|string} value
 * @returns {string}
 */
function maskBRL(value) {
  if (value === null || value === undefined || value === '') return 'R$ 0,00';
  let cents = 0;
  if (typeof value === 'number') {
    cents = Math.round(value * 100);
  } else {
    const digits = stripNonDigits(value);
    cents = digits ? parseInt(digits, 10) : 0;
  }

  const sign = cents < 0 ? '-' : '';
  const absCents = Math.abs(cents);
  const reais = Math.floor(absCents / 100);
  const remainder = String(absCents % 100).padStart(2, '0');
  const formattedReais = String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${sign}R$ ${formattedReais},${remainder}`;
}

/**
 * Parses BRL formatted string back to float number.
 * @param {string} str
 * @returns {number}
 */
function unmaskBRL(str) {
  if (!str) return 0;
  const digits = stripNonDigits(str);
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
}

/**
 * Caret tracking algorithm for adaptive input masking.
 * Preserves the user's cursor position smoothly when masking introduces punctuation.
 *
 * @param {Function} maskFn - Mask function (raw => formatted)
 * @param {string} previousValue - Previous input value
 * @param {string} nextValue - Current unformatted or partially modified input value
 * @param {number} [cursorPosition] - Position of cursor in nextValue
 * @returns {{ maskedValue: string, rawValue: string, nextCursorPosition: number }}
 */
function applyMaskWithCaret(maskFn, previousValue, nextValue, cursorPosition) {
  const safeNext = nextValue !== undefined && nextValue !== null ? String(nextValue) : '';
  const safePrev = previousValue !== undefined && previousValue !== null ? String(previousValue) : '';

  // If cursor position not provided, default to end of nextValue
  const currentCursor = typeof cursorPosition === 'number' ? cursorPosition : safeNext.length;

  // Count non-separator characters (raw characters) before cursor in nextValue
  // For digit-centric masks, raw characters are digits
  const rawBeforeCursor = safeNext.slice(0, currentCursor).replace(/\D/g, '').length;

  // Compute formatted value
  const maskedValue = maskFn(safeNext);
  const rawValue = stripNonDigits(safeNext);

  // Find the index in maskedValue that corresponds to the same count of raw characters
  let digitsCounted = 0;
  let nextCursorPosition = maskedValue.length;

  for (let i = 0; i < maskedValue.length; i++) {
    if (/\d/.test(maskedValue[i])) {
      digitsCounted++;
    }
    if (digitsCounted === rawBeforeCursor) {
      nextCursorPosition = i + 1;
      break;
    }
  }

  // Handle boundary at start
  if (rawBeforeCursor === 0) {
    // If mask starts with non-digits like '(' or 'R$ ', cursor should stay after prefix or at 0
    let firstDigitIndex = maskedValue.search(/\d/);
    nextCursorPosition = firstDigitIndex > 0 && safeNext.length > 0 ? firstDigitIndex : 0;
  }

  return {
    maskedValue,
    rawValue,
    nextCursorPosition: Math.min(nextCursorPosition, maskedValue.length)
  };
}

module.exports = {
  stripNonDigits,
  validateCPF,
  validateCNPJ,
  validateDocument,
  validateCEP,
  validatePhone,
  validateEmail,
  maskCPF,
  maskCNPJ,
  maskDocument,
  maskPhone,
  maskCEP,
  maskBRL,
  unmaskBRL,
  applyMaskWithCaret
};
