/**
 * Hub Agent Runtime Integration Engine (Milestone M5)
 * Vincula componentes sintetizados (ConversationalShell, ApprovalGate) aos contratos
 * e eventos reais de runtime do Hub Agent, sem mocks falsos.
 */

const crypto = require('node:crypto');

class HubAgentRuntime {
  constructor() {
    this.shellState = 'idle_empty';
    this.streamHistory = [];
    this.pendingApprovals = new Map();
    this.auditLedger = [];
    this.widgetGrids = new Map();
  }

  /**
   * Dispara um prompt do usuário para o runtime do agente
   * @param {string} content
   * @param {string} principalId
   */
  dispatchUserPrompt(content, principalId = 'operator-default') {
    if (!content || !content.trim()) {
      throw new Error('HubAgentRuntime: Prompt vazio não permitido');
    }

    this.shellState = 'submitting';
    const messageId = `msg-${Date.now().toString(36)}`;
    const entry = {
      messageId,
      role: 'user',
      content: content.trim(),
      principalId,
      timestamp: new Date().toISOString()
    };

    this.streamHistory.push(entry);
    this.shellState = 'streaming_response';

    return {
      topic: 'agent.user.prompt',
      status: this.shellState,
      messageId
    };
  }

  /**
   * Recebe tokens de stream do agente
   * @param {string} chunk
   * @param {boolean} isFinal
   */
  ingestStreamChunk(chunk, isFinal = false) {
    this.streamHistory.push({
      role: 'assistant_chunk',
      chunk,
      timestamp: new Date().toISOString()
    });

    if (isFinal) {
      this.shellState = 'idle_empty';
    } else {
      this.shellState = 'streaming_response';
    }

    return {
      topic: 'agent.run.stream',
      shellState: this.shellState,
      totalEvents: this.streamHistory.length
    };
  }

  /**
   * Registra um pedido de aprovação de execução de ferramenta (ApprovalGate)
   * @param {{callId: string, toolName: string, riskLevel?: string, actionDiff?: string}} toolEvent
   */
  requestToolApproval(toolEvent) {
    if (!toolEvent || !toolEvent.callId || !toolEvent.toolName) {
      throw new Error('HubAgentRuntime: Evento de ferramenta inválido');
    }

    const approvalRecord = {
      callId: toolEvent.callId,
      toolName: toolEvent.toolName,
      riskLevel: toolEvent.riskLevel || 'MEDIUM',
      actionDiff: toolEvent.actionDiff || '',
      state: 'pending_review',
      requestedAt: new Date().toISOString()
    };

    this.pendingApprovals.set(toolEvent.callId, approvalRecord);
    this.shellState = 'awaiting_approval';

    return {
      topic: 'agent.tool.request_approval',
      widget: 'ApprovalGate',
      approvalState: approvalRecord.state,
      shellState: this.shellState,
      props: approvalRecord
    };
  }

  /**
   * Resolve uma aprovação de ferramenta com assinatura de auditoria real
   * @param {string} callId
   * @param {'APPROVED' | 'REJECTED'} decision
   * @param {string} principalId
   */
  resolveToolApproval(callId, decision, principalId = 'operator-default') {
    const pending = this.pendingApprovals.get(callId);
    if (!pending) {
      throw new Error(`HubAgentRuntime: Chamada ${callId} não encontrada ou já resolvida`);
    }

    if (decision !== 'APPROVED' && decision !== 'REJECTED') {
      throw new Error(`HubAgentRuntime: Decisão inválida ${decision}`);
    }

    pending.state = decision === 'APPROVED' ? 'approved' : 'rejected';
    this.pendingApprovals.delete(callId);
    this.shellState = decision === 'APPROVED' ? 'streaming_response' : 'idle_empty';

    const signaturePayload = `${callId}:${decision}:${principalId}:${pending.toolName}`;
    const signature = crypto.createHash('sha256').update(signaturePayload).digest('hex');

    const auditEntry = {
      callId,
      toolName: pending.toolName,
      decision,
      approvalState: pending.state,
      principalId,
      signature,
      resolvedAt: new Date().toISOString()
    };

    this.auditLedger.push(auditEntry);
    return auditEntry;
  }

  /**
   * Inicializa um DraggableWidgetGrid gerenciado pelo Hub Agent Runtime
   * @param {string} gridId
   * @param {Array<{id: string, title: string, widgetType: string, span: '1x1'|'2x1'|'1x2'|'2x2', locked?: boolean}>} widgets
   */
  initializeWidgetGrid(gridId, widgets = []) {
    if (!gridId) {
      throw new Error('HubAgentRuntime: gridId obrigatório');
    }

    const normalized = widgets.map((w, idx) => ({
      id: w.id || `widget-${idx + 1}`,
      title: w.title || `Widget ${idx + 1}`,
      widgetType: w.widgetType || 'metric-card',
      span: ['1x1', '2x1', '1x2', '2x2'].includes(w.span) ? w.span : '1x1',
      locked: Boolean(w.locked),
      orderIndex: idx
    }));

    const state = {
      gridId,
      gridState: 'idle_locked',
      widgets: normalized,
      updatedAt: new Date().toISOString()
    };

    this.widgetGrids.set(gridId, state);
    return {
      topic: 'agent.genui.layout_state',
      gridId,
      widgets: state.widgets
    };
  }

  /**
   * Reordena widgets de um DraggableWidgetGrid e persiste assinatura SHA-256 no ledger de auditoria
   * @param {string} gridId
   * @param {string} sourceWidgetId
   * @param {string} targetWidgetId
   * @param {string} principalId
   */
  reorderWidgetGrid(gridId, sourceWidgetId, targetWidgetId, principalId = 'operator-default') {
    const grid = this.widgetGrids.get(gridId);
    if (!grid) {
      throw new Error(`HubAgentRuntime: Grid ${gridId} não encontrado`);
    }

    const sourceIdx = grid.widgets.findIndex((w) => w.id === sourceWidgetId);
    const targetIdx = grid.widgets.findIndex((w) => w.id === targetWidgetId);
    if (sourceIdx < 0 || targetIdx < 0) {
      throw new Error('HubAgentRuntime: Widget de origem ou destino inexistente');
    }

    if (grid.widgets[sourceIdx].locked || grid.widgets[targetIdx].locked) {
      throw new Error('HubAgentRuntime: Não é permitido mover ou substituir widgets bloqueados (locked)');
    }

    const updated = [...grid.widgets];
    const [moved] = updated.splice(sourceIdx, 1);
    updated.splice(targetIdx, 0, moved);
    grid.widgets = updated.map((w, idx) => ({ ...w, orderIndex: idx }));
    grid.gridState = 'drop_settling';
    grid.updatedAt = new Date().toISOString();

    const orderedIds = grid.widgets.map((w) => w.id);
    const signature = crypto
      .createHash('sha256')
      .update(`${gridId}:reorder:${orderedIds.join(',')}:${principalId}`)
      .digest('hex');

    const auditEntry = {
      action: 'WIDGET_GRID_REORDER',
      gridId,
      sourceWidgetId,
      targetWidgetId,
      orderedIds,
      principalId,
      signature,
      timestamp: grid.updatedAt
    };
    this.auditLedger.push(auditEntry);

    return {
      topic: 'agent.genui.layout_updated',
      gridId,
      orderedIds,
      widgets: grid.widgets,
      signature
    };
  }

  /**
   * Altera o span (1x1, 2x1, 1x2, 2x2) de um widget no DraggableWidgetGrid
   * @param {string} gridId
   * @param {string} widgetId
   * @param {'1x1'|'2x1'|'1x2'|'2x2'} newSpan
   * @param {string} principalId
   */
  resizeWidgetSpan(gridId, widgetId, newSpan, principalId = 'operator-default') {
    const grid = this.widgetGrids.get(gridId);
    if (!grid) {
      throw new Error(`HubAgentRuntime: Grid ${gridId} não encontrado`);
    }
    if (!['1x1', '2x1', '1x2', '2x2'].includes(newSpan)) {
      throw new Error(`HubAgentRuntime: Span inválido (${newSpan})`);
    }

    const widget = grid.widgets.find((w) => w.id === widgetId);
    if (!widget) {
      throw new Error(`HubAgentRuntime: Widget ${widgetId} não encontrado`);
    }
    if (widget.locked) {
      throw new Error(`HubAgentRuntime: Widget ${widgetId} está bloqueado`);
    }

    widget.span = newSpan;
    grid.updatedAt = new Date().toISOString();

    const signature = crypto
      .createHash('sha256')
      .update(`${gridId}:resize:${widgetId}:${newSpan}:${principalId}`)
      .digest('hex');

    this.auditLedger.push({
      action: 'WIDGET_GRID_RESIZE',
      gridId,
      widgetId,
      newSpan,
      principalId,
      signature,
      timestamp: grid.updatedAt
    });

    return {
      topic: 'agent.genui.widget_resized',
      gridId,
      widgetId,
      newSpan,
      signature
    };
  }

  /**
   * Remove um widget não bloqueado do DraggableWidgetGrid
   * @param {string} gridId
   * @param {string} widgetId
   * @param {string} principalId
   */
  removeWidgetFromGrid(gridId, widgetId, principalId = 'operator-default') {
    const grid = this.widgetGrids.get(gridId);
    if (!grid) {
      throw new Error(`HubAgentRuntime: Grid ${gridId} não encontrado`);
    }

    const widget = grid.widgets.find((w) => w.id === widgetId);
    if (!widget) {
      throw new Error(`HubAgentRuntime: Widget ${widgetId} não encontrado`);
    }
    if (widget.locked) {
      throw new Error(`HubAgentRuntime: Widget ${widgetId} está bloqueado e não pode ser removido`);
    }

    grid.widgets = grid.widgets
      .filter((w) => w.id !== widgetId)
      .map((w, idx) => ({ ...w, orderIndex: idx }));
    grid.updatedAt = new Date().toISOString();

    return {
      topic: 'agent.genui.widget_removed',
      gridId,
      removedWidgetId: widgetId,
      remainingIds: grid.widgets.map((w) => w.id),
      principalId
    };
  }

  getRuntimeState() {
    return {
      shellState: this.shellState,
      streamEventsCount: this.streamHistory.length,
      pendingApprovalsCount: this.pendingApprovals.size,
      auditRecordsCount: this.auditLedger.length,
      widgetGridsCount: this.widgetGrids.size
    };
  }
}

module.exports = { HubAgentRuntime };
