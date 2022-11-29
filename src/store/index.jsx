import { configureStore } from '@reduxjs/toolkit'
import isloadingSlice from './slices/isloading.slice'
import  productsSlice  from './slices/products.slice'
import  purchasesSlice  from './slices/purchases.slice'

export default configureStore({
  reducer: {
products: productsSlice,
isloading:isloadingSlice,
purchases: purchasesSlice
	}
})