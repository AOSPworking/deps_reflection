class Module {
  constructor(name, type) {
    this.name = name
    this.type = type
  }
}

function UnmarshalModule(input_module) {
  return new Module(input_module.name, input_module.type)
}

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
