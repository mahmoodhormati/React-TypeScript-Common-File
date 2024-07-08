import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Index';

const initialState   = 'ir'


export const LanguageSlice = createSlice({
    name: 'Language',
    initialState,
    reducers: {

        SetLanguage: (state, action: PayloadAction<string>) => {

            return state = action.payload
        },
       
    }




});

export const { SetLanguage } = LanguageSlice.actions;
export const Language = (state: RootState) => state.Language

