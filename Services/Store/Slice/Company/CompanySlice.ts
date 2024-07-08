import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../Index';
import { Company } from '../../../../Model/Company/CompnayModel';



const initialState: [Company] = [{ id: 0 }]


export const CompanySlice = createSlice({
  name: 'Companies',
  initialState,
  reducers: {

    SetCompanyValue: (state, action: PayloadAction<[Company]>) => {

      return state = action.payload
    },

  }




});

export const { SetCompanyValue } = CompanySlice.actions;
export const Companies = (state: RootState) => state.Companies

