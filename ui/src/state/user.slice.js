import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {}
    },
    reducers: {
        addUser: (state, action) => {
            state.value = action.payload
        },
        clearUser: state => {state.value = {}}
    }
})

export default userSlice.reducer

export const {addUser, clearUser} = userSlice.actions