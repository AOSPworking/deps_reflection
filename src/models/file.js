export const FILE_TYPE = Object.freeze({
  OUT: 0,
  SOURCE: 1
})

export class File {
  /**
   * A file abstraction
   * @param {string} file_name
   * @param {FILE_TYPE} file_type
   */
  constructor(file_name, file_type) {
    this.file_name = file_name
    this.file_type = file_type
    this.dependencies = []
  }
}

export class SourceFile extends File {
  constructor(file_name, repo_name, pkg_name) {
    super(file_name, FILE_TYPE.SOURCE)
    this.repo_name = repo_name
    this.pkg_name = pkg_name
  }
}

export class OutFile extends File {
  /**
   * OutFile is about output of ninja
   * @param {string} file_name
   */
  constructor(file_name) {
    super(file_name, FILE_TYPE.OUT)
    let parts = file_name.split("/")

    // 只记录三个目录，但是也有处在两级目录下的
    // 比如 out/soong 下的 txt，out/soong/boot.arm.oatdump.txt
    // 所以这里暂时改成 < 3
    if (parts.length < 3) {
      throw Error("file name do not has 2 slash: " + file_name)
    }
    this.out_dir = [parts[0], parts[1], parts[2]]
  }
}
