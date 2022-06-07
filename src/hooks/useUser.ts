import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import { Auth } from "../services/Api"


export const useUser = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const { data, isSuccess } = useQuery(["users", token], Auth.getUsers)

    return {
        users: data,
        isSuccess
    }
}