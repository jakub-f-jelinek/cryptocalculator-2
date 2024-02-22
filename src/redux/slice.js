import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload)
        },
        deleteItem: (state, action) => {
            const { id } = action.payload
            const existingItem = state.find(item => item.id === id)
            if (existingItem) {
                return state.filter(item => item.id !== id)
            }
        }
    }
})

export const { addItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;