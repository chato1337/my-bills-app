export interface User {
    _id: string,
    username: string,
    role: string,
    email: string,
    country: string,
    password: string
}

export interface LoginUser {
    username: string,
    password: string
}

export interface GetUserResponse {
    data: {
        user: User,
        token: string
    }
}