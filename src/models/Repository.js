import { Package } from "./Package.js";

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
