import { apiSlice } from "../../api/auth/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
})
})

export const {
    useLoginMutation
} = authApiSlice
// destructuring from the api slice