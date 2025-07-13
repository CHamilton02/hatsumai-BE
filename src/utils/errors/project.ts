export class InvalidGenerateProjectRequestFormat extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidGenerateProjectRequestFormat'
    Object.setPrototypeOf(this, InvalidGenerateProjectRequestFormat.prototype)
  }
}

export class ProjectDoesNotExist extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProjectDoesNotExist'
    Object.setPrototypeOf(this, ProjectDoesNotExist.prototype)
  }
}
