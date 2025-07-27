export interface RegisterUserDTO {
  phoneNumber: string
  fullName: string
  password: string
}

export interface LoginUserDTO {
  phoneNumber: string
  password: string
}