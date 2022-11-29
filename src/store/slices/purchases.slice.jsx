import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setisloading } from './isloading.slice';

import getConfig from '../../utils/getConfig';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const purchasesSlice = createSlice({
		name: 'purchases',
    initialState: [],
    reducers: {
        setpurchases:(state, action)=>{
            return action.payload

        }
    }
})

export const getpurchasesThunk=()=>dispatch => {
    dispatch(setisloading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
    .then(res=> dispatch(setpurchases(res.data.data.purchases)))
    .finally(dispatch(setisloading(false)))
}


export const { setpurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;