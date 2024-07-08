import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Customer, UserInfoResponse } from "../../../../Model/Customer/CustomerModel";
import { RootState } from '../../Index';

const initialState: UserInfoResponse = {

    customer: {}
}


export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {

        SetUserInfo: (state, action: PayloadAction<Customer>) => {

            state.customer = action.payload
        }
    }




});

export const { SetUserInfo } = UserSlice.actions;
export const UserInfo = (state: RootState) => state.User.customer

