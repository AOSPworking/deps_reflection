import * as fs from 'fs'
import { UnmarshalManifest } from './models/repository.js';

let json_txt = fs.readFileSync("repo_pkg_module.json")
let repo_pkg_module = JSON.parse(json_txt)
console.log(UnmarshalManifest(repo_pkg_module))
