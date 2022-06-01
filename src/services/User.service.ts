import { User } from "../models/User"

export class UserService {
    static store = (user: User) => localStorage.setItem('currentUser', JSON.stringify(user))

    static removeUser = () => localStorage.removeItem('currentUser')

    static getUser = (): User => {
        const storedUser = localStorage.getItem('currentUser')

        return storedUser ? JSON.parse(storedUser) : null
    }
}