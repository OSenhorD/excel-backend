interface IUserDTO {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
  isAdmin: boolean
  isActive: boolean
}

export interface IUserListRes {
  id: string
  name: string
  email: string
  isAdmin: boolean
  isActive: boolean
}

export interface IUserCreateParam extends Omit<IUserDTO, "id"> { }

export interface IUserUpdateParam extends Omit<IUserDTO, "id"> { }

export interface IUserGetRes extends Omit<IUserDTO, "password"> { }

export interface IUserCreateRes extends Omit<IUserDTO, "password"> { }

export interface IUserUpdateRes extends Omit<IUserDTO, "password"> { }

export interface IUserByEmailRes extends IUserDTO { }

export interface IUserUpdateAvatarRes {
  id: string
  avatar?: string
}

export interface IUserUpdateBaseRes {
  id: string
  name: string
  email: string
}
