export class Module {
  /**
   * Module is identified as a definition in Android.bp
   * @param {string} name mod's name
   * @param {string} type mod's type
   */
  constructor(name, type) {
    this.name = name
    this.type = type
  }
}
