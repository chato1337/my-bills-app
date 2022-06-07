import { User } from "../models/User"

export class UserService {
    static store = (user: User) => localStorage.setItem('currentUser', JSON.stringify(user))

    static storeToken = (token: string) => localStorage.setItem('token', JSON.stringify(token))

    static removeUser = () => localStorage.removeItem('currentUser')
    
    static removeToken = () => localStorage.removeItem('token')

    static getUser = (): User => {
        const storedUser = localStorage.getItem('currentUser')

        return storedUser ? JSON.parse(storedUser) : null
    }

    static getToken = (): string => {
        const storedToken = localStorage.getItem('token')

        return storedToken ? JSON.parse(storedToken) : null
    }

    
}