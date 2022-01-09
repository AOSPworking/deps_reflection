import { File } from './file.js';

export class Edge {
  /**
   * Edge is an abstraction in .json
   * @param {Array<File>} target
   * @param {Array<File>} source
   * @param {Array<File>} impact_source
   */
  constructor(target, source, impact_source) {
    this.target = target
    this.source = source
    this.impact_source = impact_source
  }
}
