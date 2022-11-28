import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isloadingSlice = createSlice({
		name: 'isloading',
    initialState: false,
    reducers: {
        setisloading: (state, action)=>{
            return action.payload
        }
    }
})

export const { setisloading } = isloadingSlice.actions;

export default isloadingSlice.reducer;