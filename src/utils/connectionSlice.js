import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        userConnections: []
    },
    reducers: {
        addConnection: (state, action) => {

            state.userConnections = action.payload
        }
    }
})
export const { addConnection } = connectionSlice.actions
export default connectionSlice.reducer