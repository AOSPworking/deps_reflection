import { Module } from '../models/module.js'
import { Package } from '../models/package.js'
import { Repository } from '../models/repository.js'

function UnmarshalModule(input_module) {
  return new Module(input_module.name, input_module.type)
}

/**
 * Unmarshal Modules
 * @param {Object} input_modules
 * @returns {Array<Module>} mod
 */
export function UnmarshalModules(input_modules) {
  if (input_modules == null) {
    return []
  }

  let modules = []
  input_modules.forEach(input_module => {
    modules.push(UnmarshalModule(input_module))
  })
  return modules
}

function UnmarshalPackage(input_package) {
  return new Package(input_package.name, UnmarshalModules(input_package.modules))
}

/**
 * Unmarshal Packages
 * @param {Object} input_packages
 * @returns {Array<Package>} pkgs
 */
export function UnmarshalPackages(input_packages) {
  if (input_packages == null) {
    return []
  }

  let packages = []
  input_packages.forEach(input_package => {
    packages.push(UnmarshalPackage(input_package))
  })
  return packages
}

export function UnmarshalRepository(input_repository) {
  return new Repository(
    input_repository.name,
    UnmarshalPackages(input_repository.packages)
  )
}

export function UnmarshalManifest(input_manifest) {
  let repos = []
  for (const repo_name in input_manifest) {
    if (repo_name == "default") {
      continue
    }
    repos.push(UnmarshalRepository(input_manifest[repo_name]))
  }
  return repos
}
