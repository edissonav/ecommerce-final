import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './slices/cart.slice'
import isloadingSlice from './slices/isloading.slice'
import  productsSlice  from './slices/products.slice'
import  purchasesSlice  from './slices/purchases.slice'

export default configureStore({
  reducer: {
products: productsSlice,
isloading:isloadingSlice,
purchases: purchasesSlice,
cart: cartSlice
	}
})