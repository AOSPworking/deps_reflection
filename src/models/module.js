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
