import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setisloading } from './isloading.slice';

import getConfig from '../../utils/getConfig';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartSlice = createSlice({
		name: 'cart',
    initialState: [],
    reducers: {
        setcart:(state, action)=>{
            return action.payload

        }
    }
})

export const getcartThunk=()=>dispatch => {
    dispatch(setisloading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
    .then(res=> dispatch(setcart(res.data.data.cart.products)))
    .finally(dispatch(setisloading(false)))
}
export const postcartThunk=(productadded)=>dispatch => {
    dispatch(setisloading(true));
    axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', productadded, getConfig())
    .then((res)=>dispatch(getcartThunk()))
    .finally(dispatch(setisloading(false)))
}
export const chekoutcartThunk=()=>dispatch => {
    dispatch(setisloading(true));
    axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
    .then((res)=>dispatch(setcart([])))
    .finally(dispatch(setisloading(false)))
}
export const deletecartThunk=(id)=>dispatch => {
    dispatch(setisloading(true));
    axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then((res)=>dispatch(getcartThunk()))
    .finally(dispatch(setisloading(false)))
}


export const { setcart } = cartSlice.actions;

export default cartSlice.reducer;