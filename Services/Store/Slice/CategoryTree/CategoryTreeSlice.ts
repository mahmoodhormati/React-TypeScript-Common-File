
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../Index';
import { CategoryTreesResponse, CategorytreeModel } from '../../../../Model/Category/CategoryModel';




const initialState: CategoryTreesResponse = {

    categories:undefined
}




export const CategoryTreeSlice = createSlice({
    name: 'CategoryTree',
    initialState,
    reducers: {

        SetCategory: (state, action: PayloadAction<CategorytreeModel[]|undefined>) => {

          state.categories = action.payload
        },
      
    }




});




export const { SetCategory } = CategoryTreeSlice.actions;
export const CategoryTree = (state: RootState) => state.CategoryTree

