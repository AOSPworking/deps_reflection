import { Module } from "./Module.js"

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
