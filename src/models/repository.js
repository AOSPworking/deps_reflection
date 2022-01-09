import { Package, UnmarshalPackages } from "./package.js";

export class Repository {
  /**
   * Repository is fetched from android.googlesource.com
   * @param {string} name repo's name
   * @param {Array<Package>} packages pkgs
   */
  constructor(name, packages) {
    this.name = name
    this.packages = packages
  }
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
