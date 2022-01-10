import { FILE_TYPE } from "../models/File.js"
import { Edge, Node } from "../models/Graph.js"

export class ImpactAnalyzer {
  /**
   *
   * @param {Array<Node>} nodes
   * @param {Array<Edge>} edges
   * @param {Object<string, Array<string>>} nodes_m // 这个只是为了类型提示
   */
  constructor(nodes, edges, nodes_m={}) {
    this.edges = edges
    this.nodes_m = nodes_m
    nodes.forEach(n => {
      const key = n.file.file_name
      this.nodes_m[key] = []
    })
  }

  Begin() {
    this.edges.forEach(edge => this.AnalyzeOneEdge(edge))
  }

  /**
   * Analyze only 1 edge:
   * 1. 到 m 中看 source 的影响因素，把所有的影响因素合到一起
   * 2. 把合成的因素赋给 impact_source 和 target
   * @param {Edge} edge
   */
  AnalyzeOneEdge(edge) {
    const { target, source, impact_source } = edge
    // 获得 source 中所有的影响因素
    let all_impact_factor = []
    source.forEach(s => {
      if (s.file.file_type == FILE_TYPE.OUT) {
        ;
      } else if (s.file.file_type == FILE_TYPE.SOURCE && s.file.pkg_name.length != 0) {
        // source 中可能是来自其他 pkg 中的，不在本次统计内
        // 如果这个 source 的 distance 为 1，那么需要到 nodes_m 中存一下
        if (s.distance == 1) {
          this.nodes_m[s.file.file_name] = [s.file.pkg_name]
        }
      }
      // 把 source 中所有文件的 impact factor merge 到 all_impact_factor 中
      const impact_factor_of_s = this.nodes_m[s.file.file_name]
      impact_factor_of_s.forEach(ifos => {
        if (!all_impact_factor.includes(ifos)) {
          all_impact_factor.push(ifos)
        }
      })
    })

    // 给 target 赋值，因为每个文件只有一个 in_edge
    // 所以可以直接赋值
    target.forEach(t => {
      this.nodes_m[t.file.file_name] = all_impact_factor
    })

    // 给 impact_source 赋值
    // 但是这里要考虑一个文件多次作为 impact_source 的情况
    impact_source.forEach(s => {
      if (!this.nodes_m[s.file.file_name]) {
        this.nodes_m[s.file.file_name] = all_impact_factor
      } else {
        // 说明 nodes_m 中对应项已经有了 impact factor
        // 需要看是否重复
        const former_impact_factor = this.nodes_m[s.file.file_name]
        all_impact_factor.forEach(factor => {
          if (!former_impact_factor.includes(factor)) {
            this.nodes_m[s.file.file_name].push(factor)
          }
        })
      }
    })
  }
}
