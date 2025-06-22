export class InvalidGenerateProjectRequestFormat extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidGenerateProjectRequestFormat'
    Object.setPrototypeOf(this, InvalidGenerateProjectRequestFormat.prototype)
  }
}
