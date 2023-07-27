
import { RoleEnumType, User } from '../entities/user.entity'
import redisClient from '../utils/connectRedis'
import { AppDataSource } from '../utils/data-source'
import { signJwt } from '../utils/jwt'

const userRepository = AppDataSource.getRepository(User)

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input))
}

export const findUserByUserName = async ({
  username,
}: {
  username: string
}) => {
  return await userRepository.findOne({ where: { username } })
}

export const findUserById = async (userId: string) => {
  return await userRepository.findOne({ where: { id: userId } })
}
export const deleteUserById = async (userId: string) => {
  return userRepository
    .createQueryBuilder('user')
    .delete()
    .from(User)
    .where('id = :id', { id: userId })
    .execute()
}

export const updateUser = async (user: User, id: string) => {
  return userRepository
    .createQueryBuilder('user')
    .update(User)
    .set({ email: user.email, password: user.password, motto: user.motto })
    .where('id = :id', { id: id })
    .execute()
}
export const updateUserActivity = async (id: string, isActive: boolean) => {
  return userRepository
    .createQueryBuilder('user')
    .update(User)
    .set({ isActive: isActive })
    .where('id = :id', { id: id })
    .execute()
}
export const updateUserLogin = async (id: string, isLogin: boolean) => {
  return userRepository
    .createQueryBuilder('user')
    .update(User)
    .set({ isLogin: isLogin })
    .where('id = :id', { id: id })
    .execute()
}
export const getUsers = async () => {
  return await userRepository
    .createQueryBuilder('user')
    .where('user.role = :role', { role: RoleEnumType.USER })
    .getMany()
}
export const getUsersNoActive = async () => {
  return await userRepository
    .createQueryBuilder('user')
    .where('user.role = :role', { role: RoleEnumType.USER })
    .andWhere('user.isActive = :isActive', { isActive: false })
    .getMany()
}
export const getLoggedUsers = async () => {
  return await userRepository
    .createQueryBuilder('user')
    .where('user.isLogin = :isLogin', { isLogin: true })
    .getMany()
}

export const getActiveUsers = async () => {
  return await userRepository
    .createQueryBuilder('user')
    .where('user.isActive = :isActive', { isActive: true })
    .getMany()
}

export const signTokens = async (user: User) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    //EX: config.get<number>('redisCacheExpiresIn') * 60,
    EX: 365 * 24 * 60 * 60,
  })

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    // expiresIn: `${config.get<number>('accessTokenExpiresIn')}d`,
    expiresIn: 365 * 24 * 60 * 60,
  })

  return { access_token }
}
