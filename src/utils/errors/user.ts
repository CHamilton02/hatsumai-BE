export class UserNotLoggedIn extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotLoggedIn'
    Object.setPrototypeOf(this, UserNotLoggedIn.prototype)
  }
}

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

export class ExistingPasswordResetRequest extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ExistingPasswordResetRequest'
    Object.setPrototypeOf(this, ExistingPasswordResetRequest.prototype)
  }
}

export class PasswordResetRequestNotFound extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PasswordResetRequestNotFound'
    Object.setPrototypeOf(this, PasswordResetRequestNotFound.prototype)
  }
}

export class PasswordResetRequestExpired extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PasswordResetRequestExpired'
    Object.setPrototypeOf(this, PasswordResetRequestExpired.prototype)
  }
}
