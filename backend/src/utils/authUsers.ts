import { User } from '../entities/user.entity'

export class AuthUsers {
  static authUsers: User[] = []

  static setUser(user: User) {
    this.authUsers.push(user)
    return this
  }
  static removeUser(user: User) {
    this.authUsers = this.authUsers.filter((userVal) => user.id !== userVal.id)
    return this
  }
  static checkUserActivity(users: User[]) {
    const filteredAuthUsers = this.authUsers.filter((userVal, i) =>
      users.includes(userVal),
    )
    if (filteredAuthUsers.length === users.length) {
      return true
    }
    return false
  }
}
