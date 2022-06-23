import axios from "axios";
import {IUser} from "../models/user";

export class UserService {
    static async getAllUsers() {
        const {data: users} = await axios.get<Array<IUser>>('/users')
        return users
    }

    static async registration(username: string, password: string) {
        const {data} = await axios.post('/users', {username, password})
        return data
    }
}