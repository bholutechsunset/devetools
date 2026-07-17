import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import localStorage from "redux-persist/lib/storage"
import { studentSlice } from "./slices/student-slice"
import { productSlice } from "./slices/product-slice"

const config = {
    key: 'root',
    storage: localStorage,
    blacklist: ['productSlice']
}

const root = combineReducers({
    studentSlice: studentSlice.reducer,
    productSlice: productSlice.reducer
})

const reducer = persistReducer(config, root)

export const store = configureStore({
    reducer,
    middleware: (defaultMiddleware)=>(
        defaultMiddleware({
            serializableCheck: false
        })
    )
})

export const persistor = persistStore(store)
export type SelectorType = ReturnType<typeof store.getState>