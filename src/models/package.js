import { UnmarshalModules } from "./module.js"

class Package {
  constructor(name, modules) {
    this.name = name
    this.modules = modules
  }
}

function UnmarshalPackage(input_package) {
  return new Package(input_package.name, UnmarshalModules(input_package.modules))
}

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
