import * as fs from 'fs'
import { File, OutFile, SourceFile } from '../models/File.js'
import { Repository } from '../models/Repository.js'
import { Module } from '../models/Module.js'
import { Package } from '../models/Package.js'
import { RepoPkgModJSONUnmarshaller } from './RepoPkgModJSONUnmarshaller.js';

export class Reflector {

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
      const repo = this.repos[i]
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
      const pkg = pkgs[i]
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
}

let json_txt = fs.readFileSync("repo_pkg_module.json")
let repo_pkg_module = JSON.parse(json_txt)

let unmarshaller = new RepoPkgModJSONUnmarshaller()
let reflector = new Reflector(
  unmarshaller.UnmarshalRepositories(repo_pkg_module)
)

export {
  reflector
}
