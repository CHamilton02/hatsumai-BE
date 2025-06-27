export class InvalidEmailFormatError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidEmailFormat'
    Object.setPrototypeOf(this, InvalidEmailFormatError.prototype)
  }
}

export class EmailExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailExistsError'
    Object.setPrototypeOf(this, EmailExistsError.prototype)
  }
}

export class EmailDoesNotExistError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailDoesNotExistError'
    Object.setPrototypeOf(this, EmailDoesNotExistError.prototype)
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCredentialsError'
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype)
  }
}
