import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { login ,logout} from '../redux/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl : 'https://task-manager-eight-olive.vercel.app/api',
    credentials: "include",
    prepareHeaders: (headers, {getState} ) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
})