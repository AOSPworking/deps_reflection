import { Node, Edge } from '../models/Graph.js'
import { reflector } from './Reflection.js'

export class ImpactJSONUnmarshaller {

  constructor(input_json) {
    this.nodes_m = {}
    this.nodes = this.NodesUnmarshal(input_json.nodes)
    this.nodes.forEach(n => {this.nodes_m[n.file.file_name] = n})
    this.edges = this.EdgesUnmarshal(input_json.edges)
  }

  /**
   * Get nodes with nodes in json
   * @param {Array<Object>} input_nodes
   * @returns {Array<Node>} nodes
   */
  NodesUnmarshal(input_nodes) {
    let nodes = []
    input_nodes.forEach(n => {
      nodes.push(this.NodeUnmarshal(n.name, n.distance))
    })
    return nodes
  }

  /**
   * Get edges with input_edges in json
   * @param {Array<Object>} input_edges
   * @returns {Array<Edge>} edges
   */
  EdgesUnmarshal(input_edges) {
    let edges = []
    input_edges.forEach(e => {
      edges.push(this.EdgeUnmarshal(e.target, e.source, e.impact_source))
    })
    return edges
  }

  /**
   * Get a node with file_path and distance
   * @param {string} file_path
   * @param {number} distance
   * @returns {Node} node
   */
  NodeUnmarshal(file_path, distance) {
    const file = reflector.FileReflect(file_path)
    return new Node(file, distance)
  }

  /**
   * Get a edge with target, source and impact_source
   * @param {Array<string>} target
   * @param {Array<string>} source
   * @param {Array<string>} impact_source
   * @returns {Edge} edge
   */
  EdgeUnmarshal(target, source, impact_source) {
    let target_files = []
    let source_files = []
    let impact_source_files = []
    target.forEach(t => { target_files.push(this.nodes_m[t]) })
    source.forEach(s => { source_files.push(this.nodes_m[s]) })
    // impact source 的距离 distance 置为 -1
    impact_source.forEach(s => { impact_source_files.push(
      new Node(reflector.FileReflect(s), -1)
    ) })
    return new Edge(target_files, source_files, impact_source_files)
  }
}
