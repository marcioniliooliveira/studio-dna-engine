/**
 * Directed Acyclic Graph (DAG) for Variable Dependencies and Delta Propagation
 */
class DependencyGraph {
  constructor() {
    this.nodes = new Map(); // id -> { metadata }
    this.edges = new Map(); // id -> Map(targetId -> rule)
    this.inEdges = new Map(); // targetId -> Map(sourceId -> rule)
  }

  addNode(id, metadata = {}) {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, metadata);
      this.edges.set(id, new Map());
      this.inEdges.set(id, new Map());
    }
  }

  addEdge(sourceId, targetId, rule = 'depends-on') {
    this.addNode(sourceId);
    this.addNode(targetId);
    this.edges.get(sourceId).set(targetId, rule);
    this.inEdges.get(targetId).set(sourceId, rule);
  }

  getDependencies(nodeId) {
    if (!this.inEdges.has(nodeId)) return [];
    return Array.from(this.inEdges.get(nodeId).keys());
  }

  getDependents(nodeId) {
    if (!this.edges.has(nodeId)) return [];
    return Array.from(this.edges.get(nodeId).keys());
  }

  topologicalSort() {
    const visited = new Set();
    const visiting = new Set();
    const order = [];

    const visit = (id) => {
      if (visiting.has(id)) {
        throw new Error(`Cycle detected in dependency graph involving node: '${id}'`);
      }
      if (!visited.has(id)) {
        visiting.add(id);
        const children = this.edges.get(id) || new Map();
        for (const childId of children.keys()) {
          visit(childId);
        }
        visiting.delete(id);
        visited.add(id);
        order.unshift(id);
      }
    };

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        visit(nodeId);
      }
    }

    return order;
  }

  static fromDnaIr(dnaIr) {
    const graph = new DependencyGraph();
    if (!dnaIr) return graph;

    (dnaIr.parameters || []).forEach(p => {
      graph.addNode(p.id, p);
    });

    (dnaIr.constraints || []).forEach(c => {
      if (c.source && c.target) {
        graph.addEdge(c.source, c.target, c.rule || c.type);
      }
    });

    return graph;
  }
}

module.exports = { DependencyGraph };
