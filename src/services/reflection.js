import * as fs from 'fs'
import { Edge, Node } from '../models/graph.js';
import { File, OutFile, SourceFile } from '../models/file.js';
import { Repository } from '../models/repository.js'
import { Module } from '../models/module.js'
import { Package } from '../models/package.js'
import { UnmarshalRepositories } from './unmarshaller.js';

class Reflector {

  OUT_HEADER = "out/"
  OUT_HOST_HEADER = "out/host/"
  OUT_SOONG_HEADER = "out/soong/"
  INTERMEDIATE_FILE_HEADER = "out/soong/.intermediates/"

  /**
   * Reflector is a tool to get repo/pkg's name
   * with a given file path
   * @param {Array<Repository>} repos
   */
  constructor(repos) {
    this.repos = repos
  }

  /**
   * Get Repo & Pkg with a given file_path
   * @param {string} file_path
   * @returns {File} file and its repo&pkg info
   */
  FileReflect(file_path) {
    if (file_path.startsWith(this.OUT_HEADER)) {
      return new OutFile(file_path)
    }
    const repo = this.FileReflectRepository(file_path)
    const pkg = this.FileReflectPackage(repo, file_path)
    return new SourceFile(file_path, repo.name, pkg.name)
  }

  /**
   * Get Repo with a given file_path
   * @param {string} file_path
   * @returns {Repository} repo
   */
  FileReflectRepository(file_path) {
    for (let i = 0; i < this.repos.length; i++) {
      const repo = this.repos[i];
      if (file_path.startsWith(repo.name)) {
        return repo
      }
    }
    console.error("FileReflectRepository: "
                + "cannot get repo's name about " + file_path)
    return new Repository("", [])
  }

  /**
   * Get Pkg with a given file_path & repo
   * @param {Repository} repository
   * @param {string} file_path
   * @returns {Package} pkg
   */
  FileReflectPackage(repository, file_path) {
    const pkgs = repository.packages
    if (pkgs.length == 0) {
      console.error("FileReflectPackage:" + repository.name
                  + "'s pkgs is empty,"
                  + " and file path is: " + file_path)
      return new Package("", [])
    }

    let maxMatchPkg = pkgs[0]
    let maxMatchNum = 0
    for (let i = 0; i < pkgs.length; i++) {
      const pkg = pkgs[i];
      if (pkg.name.length > maxMatchNum && file_path.startsWith(pkg.name)) {
        maxMatchPkg = pkg
        maxMatchNum = pkg.name.length
      }
    }
    return maxMatchPkg
  }

  /**
   * Get Module with a given file_path & pkg
   * and this method cannot be used now
   * @param {Package} pkg
   * @param {string} file_path
   * @returns {Module} mod
   */
  FileReflectModule(pkg, file_path) {
    return new Module("", "")
  }

  /**
   * Get a node with file_path and distance
   * @param {string} file_path
   * @param {number} distance
   * @returns {Node} node
   */
  NodeReflect(file_path, distance) {
    const file = this.FileReflect(file_path)
    return new Node(file, distance)
  }

  /**
   * Gett a edge with target, source and impact_source
   * @param {Array<string>} target
   * @param {Array<string>} source
   * @param {Array<string>} impact_source
   * @returns {Edge} edge
   */
  EdgeReflect(target, source, impact_source) {
    let target_files = []
    let source_files = []
    let impact_source_files = []
    target.forEach(t => { target_files.push(this.FileReflect(t)) })
    source.forEach(s => { source_files.push(this.FileReflect(s)) })
    impact_source.forEach(s => { impact_source_files.push(this.FileReflect(s)) })
    return new Edge(target_files, source_files, impact_source_files)
  }
}

let json_txt = fs.readFileSync("repo_pkg_module.json")
let repo_pkg_module = JSON.parse(json_txt)
let reflector = new Reflector(UnmarshalRepositories(repo_pkg_module))

export {
  reflector
}
