import { Module } from '../models/module.js'
import { Package } from '../models/package.js'
import { Repository } from '../models/repository.js'

export class RepoPkgModJSONUnmarshaller {
  /**
   * Unmarshal Module
   * @param {Object} input_module
   * @returns {Module} mod
   */
  UnmarshalModule(input_module) {
    return new Module(input_module.name, input_module.type)
  }

  /**
   * Unmarshal Modules
   * @param {Array<Object>} input_modules
   * @returns {Array<Module>} mods
   */
  UnmarshalModules(input_modules) {
    if (input_modules == null) {
      return []
    }

    let modules = []
    input_modules.forEach(input_module => {
      modules.push(this.UnmarshalModule(input_module))
    })
    return modules
  }

  /**
   * Unmarshal Package
   * @param {Object} input_package
   * @returns {Package} pkg
   */
  UnmarshalPackage(input_package) {
    return new Package(input_package.name, this.UnmarshalModules(input_package.modules))
  }

  /**
   * Unmarshal Packages
   * @param {Array<Object>} input_packages
   * @returns {Array<Package>} pkgs
   */
  UnmarshalPackages(input_packages) {
    if (input_packages == null) {
      return []
    }

    let packages = []
    input_packages.forEach(input_package => {
      packages.push(this.UnmarshalPackage(input_package))
    })
    return packages
  }

  /**
   * Unmarshal Repository
   * @param {Object} input_repository
   * @returns {Repository} repo
   */
  UnmarshalRepository(input_repository) {
    return new Repository(
      input_repository.name,
      this.UnmarshalPackages(input_repository.packages)
    )
  }

  /**
   * Unmarshal Repositories
   * @param {Array<Object>} input_repositories
   * @returns {Array<Repository>}
   */
  UnmarshalRepositories(input_repositories) {
    let repos = []
    for (const repo_name in input_repositories) {
      if (repo_name == "default") {
        continue
      }
      repos.push(this.UnmarshalRepository(input_repositories[repo_name]))
    }
    return repos
  }
}

