import { File } from '../models/file.js';
import { Repository } from '../models/repository.js'
import { Module } from '../models/module.js'
import { Package } from '../models/package.js'

export class Reflector {
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
    const repo = this.FileReflectRepository(file_path)
    const pkg = this.FileReflectPackage(repo, file_path)
    return new File(repo.name, pkg.name, file_path)
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
    throw Error("cannot get repo's name about " + file_path)
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
      throw Error(repository.name + "'s pkgs is empty, \
                  but file path is: " + file_path)
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
}


