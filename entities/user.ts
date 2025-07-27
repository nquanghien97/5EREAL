import { USER_ROLE } from "@prisma/client"

export interface UserEntity {
  id: number
  fullName: string
  phoneNumber: string
  createdAt: Date
  role: USER_ROLE
}