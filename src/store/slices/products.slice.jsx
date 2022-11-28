import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setisloading } from './isloading.slice';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const productsSlice = createSlice({
		name: 'products',
    initialState: [],
    reducers: {
        setproducts:(state, action)=>{
            return action.payload

        }
    }
})

export const getProductsThunk=()=>dispatch => {
    dispatch(setisloading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/')
    .then(res=> dispatch(setproducts(res.data.data.products)))
    .finally(dispatch(setisloading(false)))
}
export const filterproductsThunk=(id)=>dispatch => {
    dispatch(setisloading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
    .then(res=> dispatch(setproducts(res.data.data.products)))
    .finally(dispatch(setisloading(false)))
}
export const inputsearchThunk=(inputsearch)=>dispatch => {
    dispatch(setisloading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputsearch}`)
    .then(res=> dispatch(setproducts(res.data.data.products)))
    .finally(dispatch(setisloading(false)))
}


export const { setproducts } = productsSlice.actions;

export default productsSlice.reducer;