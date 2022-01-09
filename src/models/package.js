import { Module, UnmarshalModules } from "./module.js"

export class Package {
  /**
   * Package is identical to Android.bp dir
   * @param {string} name pkg's name
   * @param {Array<Module>} modules pkg's mods
   */
  constructor(name, modules) {
    this.name = name
    this.modules = modules
  }
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
