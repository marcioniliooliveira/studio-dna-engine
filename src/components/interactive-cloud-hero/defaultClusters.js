/**
 * Default Volumetric Cloud Cluster Configurations
 *
 * Defines 5 independent 3D cloud clusters distributed spatially around the hero viewport,
 * each with a deterministic random seed, segment count, bounding envelope, and 3D center.
 */

const DEFAULT_CLUSTERS = [
  { seed: 101, segments: 24, bounds: [5, 2, 2], center: [-4.5, 1.2, -3] },
  { seed: 202, segments: 20, bounds: [4, 1.5, 1.5], center: [4.0, 1.8, -4] },
  { seed: 303, segments: 28, bounds: [6, 2.5, 2], center: [0, -1.5, -2] },
  { seed: 404, segments: 18, bounds: [3.5, 1.5, 1.5], center: [-3.5, -2.0, -1] },
  { seed: 505, segments: 22, bounds: [4.5, 2, 2], center: [4.5, -1.0, -2.5] }
];

module.exports = {
  DEFAULT_CLUSTERS,
  default: DEFAULT_CLUSTERS
};
