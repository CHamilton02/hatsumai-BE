export class EmailExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailExistsError'
    Object.setPrototypeOf(this, EmailExistsError.prototype)
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCredentialsError'
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype)
  }
}
