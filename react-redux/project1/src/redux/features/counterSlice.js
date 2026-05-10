import { createSlice } from "@reduxjs/toolkit";

export const counterSlice=createSlice({
    name:"counter",
    initialState:{
        value:0
    },
    reducers:{
        increment:(state)=>{
            state.value++
        },
        decrement:(state)=>{
            state.value--
        },
        incrementByAmount:(state,actions)=>{
            state.value+=actions.payload
        }
    }
})

export const {increment,decrement,incrementByAmount}=counterSlice.actions;
export default counterSlice.reducer