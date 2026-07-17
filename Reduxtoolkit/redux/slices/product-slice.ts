import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductInterface {
    id: string
    title: string
    description: string
    price: string
    image: string
}

interface InitialStateInterface {
    product : ProductInterface | null
}

const initialState: InitialStateInterface = {product: null}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<InitialStateInterface>)=>{
            state.product = action.payload.product
            return state
        },
        removeProduct: (state)=>{
            state.product = null
            return state
        }
    }
})

export const {setProduct, removeProduct} = productSlice.actions
export default productSlice.reducer