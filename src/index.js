import { readFileSync } from "fs";
import { ImpactAnalyzer } from "./services/ImpactAnalyzer.js";
import { reflector } from "./services/reflection.js";
import { ImpactJSONUnmarshaller } from './services/ImpactJSONUnmarshaller.js';

let fd = readFileSync("./test.json")
let json = JSON.parse(fd)

let nodes = []
let edges = []
const nodes_from_json = json["nodes"]
const edges_from_json = json["edges"]

let iunmrsl = new ImpactJSONUnmarshaller(json)

let ia = new ImpactAnalyzer(iunmrsl.nodes, iunmrsl.edges)
ia.Begin()
console.log(ia.nodes_m)
