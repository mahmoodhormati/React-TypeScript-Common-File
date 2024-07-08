
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../Index';
import { ManufactureModel } from '../../../../Model/Manufacture/ManufactureModel';




const initialState: {manufacturers?:Array<ManufactureModel>} = {

    manufacturers:undefined
}




export const ManufacturerSlice = createSlice({
    name: 'GetManufacturers',
    initialState,
    reducers: {

        SetManufacturers: (state, action: PayloadAction<ManufactureModel[]|undefined>) => {
   
          state.manufacturers = action.payload
        },
      
    }




});




export const { SetManufacturers } = ManufacturerSlice.actions;
export const GetManufacturers = (state: RootState) => state.Manufacturers.manufacturers

