import { CategoryTreeSlice } from './Slice/CategoryTree/CategoryTreeSlice';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  storage  from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk'
import { MenuSlice } from "./Slice/Menu/MenuSlice";
import { UserSlice } from "./Slice/User/UserSlice";
import { LanguageSlice } from "./Slice/Language/LanguageSlice";
import { CompanySlice } from "./Slice/Company/CompanySlice";
import { ManufacturerSlice } from './Slice/Manufacturers/ManufacturerSlice';
import { roleSlice } from './Slice/Roles/RolesSlice';
import { CounterSlice } from './Slice/Counter/CounterSlice';




const persistConfig = {
    key: 'root',
    storage: storage
}


const reducers = combineReducers({
Menu:MenuSlice.reducer,
User:UserSlice.reducer,
Language:LanguageSlice.reducer,
Companies:CompanySlice.reducer,
CategoryTree:CategoryTreeSlice.reducer,
Manufacturers:ManufacturerSlice.reducer,
Roles:roleSlice.reducer,
Counter:CounterSlice.reducer

})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({

    reducer:persistedReducer,
    middleware:[thunk]

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch