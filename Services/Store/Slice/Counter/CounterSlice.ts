import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../Index";

const initialState = {
    value: 0
}
export const CounterSlice = createSlice({
    name: 'Counter',
    initialState,
    reducers: {

        Increase: (state) => {

            state.value += 1
        },

    }




});

export const { Increase } = CounterSlice.actions;
export const Counter = (state: RootState) => state.Counter