import { readFileSync, writeFileSync } from "fs"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { GraphvizOutput } from "./services/GraphvizOutput.js"
import { ImpactAnalyzer } from "./services/ImpactAnalyzer.js"
import { ImpactJSONUnmarshaller } from './services/ImpactJSONUnmarshaller.js'

let argv = yargs(hideBin(process.argv))
          .usage("Usage: node $0 --ninjaOut=[str] --tool=[str]")
          .demandOption(["tool", "ninjaOut", "rpmOut"])
          .describe("tool", "choose a tool: " + "[nodes, graphviz]")
          .describe("rpmOut", "pkg_module_tool output json file")
          .default("rpmOut", "repo_pkg_module.json")
          .describe("ninjaOut", "ninja-hacked output json file")
          .default("ninjaOut", "ninja_origin_out.json")
          .argv

let fd = readFileSync(argv.ninjaOut)
let json = JSON.parse(fd)
let iunmrsl = new ImpactJSONUnmarshaller(json)

switch (argv.tool) {
  // 输出 out.nodes，是一个 json，内部包含了所有受影响的文件，以及影响原因(pkg)
  case "nodes":
    let ia = new ImpactAnalyzer(iunmrsl.nodes, iunmrsl.edges)
    ia.Begin()
    writeFileSync("out.nodes", JSON.stringify(ia.nodes_m, null, 2))
    break

  // 利用 graphviz 输出 svg，默认 rankdir = LR
  case "graphviz":
    GraphvizOutput(iunmrsl.nodes, iunmrsl.edges)
    break

  default:
    break
}
