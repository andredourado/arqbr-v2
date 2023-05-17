interface IUserDTO {
  id?: string
  userGroupId?: string
  name?: string
  login?: string
  password?: string
  isAdmin?: boolean
  isSuperUser?: boolean
  isBlocked?: boolean
  blockReasonId?: string
  mustChangePasswordNextLogon?: boolean
  avatar?: string
  isDisabled?: boolean
  disabled?:boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IUserDTO }
