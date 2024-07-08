import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Customer, UserInfoResponse, UserRoles } from "../../../../Model/Customer/CustomerModel";
import { RootState } from '../../Index';
const initialState: Array<number> = [

]

export const roleSlice = createSlice({

    name: 'userRole',
    initialState,
    reducers: {

        userRoles: (state, action: PayloadAction<[number]>) => {



            return (
                [

                    ...action.payload
                ])


        },
        removeRole: () => {
            return []
        }

    }



})

export const { userRoles,removeRole } = roleSlice.actions;
export const Roles = (state: RootState) => state.Roles

