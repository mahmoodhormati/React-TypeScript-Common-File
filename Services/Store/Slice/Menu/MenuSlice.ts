import { MenuItem } from './../../../../Model/Menu/MenuModel';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../Index';
import { MenuItemResponse } from '../../../../Model/Menu/MenuModel';



const initialState: MenuItemResponse = {

    menuItems: undefined
}


export const MenuSlice = createSlice({
    name: 'Menu',
    initialState,
    reducers: {

        SetGlobalMenuValue: (state, action: PayloadAction<[MenuItem]|undefined>) => {

            state.menuItems = action.payload
        },
        SetClientMenuValue: (state, action: PayloadAction<[MenuItem]|undefined>) => {

            state.menuItems = action.payload
        },
        SetAdminMenuValue: (state, action: PayloadAction<[MenuItem]|undefined>) => {

            state.menuItems = action.payload
        },
    }




});

export const { SetGlobalMenuValue,SetClientMenuValue,SetAdminMenuValue } = MenuSlice.actions;
export const Menus = (state: RootState) => state.Menu.menuItems

