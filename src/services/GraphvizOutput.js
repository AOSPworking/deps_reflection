import * as graphviz from "graphviz"
import { Node, Edge } from "../models/Graph.js";

/**
 *
 * @param {Array<Node>} nodes
 * @param {Array<Edge>} edges
 */
export function GraphvizOutput(nodes, edges) {
  let g = graphviz.digraph("ninja")
  g.set("rankdir", "LR")
  nodes.forEach(n => {
    g.addNode(n.file.file_name)
  })
  edges.forEach(e => {
    const targets = e.target
    const sources = e.source
    targets.forEach(t => {
      sources.forEach(s => {
        g.addEdge(t.file.file_name, s.file.file_name)
      })
    })
  })
  // the path of graphviz
  g.setGraphVizPath("/usr/bin")
  g.output("svg", "out.svg")
}
