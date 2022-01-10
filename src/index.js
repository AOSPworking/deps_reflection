import { readFileSync } from "fs"
import { ImpactAnalyzer } from "./services/ImpactAnalyzer.js"
import { ImpactJSONUnmarshaller } from './services/ImpactJSONUnmarshaller.js'

let fd = readFileSync("./test.json")
let json = JSON.parse(fd)
let iunmrsl = new ImpactJSONUnmarshaller(json)

let ia = new ImpactAnalyzer(iunmrsl.nodes, iunmrsl.edges)
ia.Begin()
console.log(ia.nodes_m)
