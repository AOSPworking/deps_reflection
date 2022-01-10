import { File } from './file.js';

export class Node {
  /**
   * Node is an abstraction in .json
   * @param {File} file
   * @param {number} distance
   */
  constructor(file, distance) {
    this.file = file
    this.distance = distance
  }
}

export class Edge {
  /**
   * Edge is an abstraction in .json
   * @param {Array<Node>} target
   * @param {Array<Node>} source
   * @param {Array<Node>} impact_source
   */
  constructor(target, source, impact_source) {
    this.target = target
    this.source = source
    this.impact_source = impact_source
  }
}
