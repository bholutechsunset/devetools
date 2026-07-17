import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface StudentInterface {
    id: number,
    fullname: string,
    email: string,
    mobile: number,
    address: string
}

const initialState:StudentInterface[]  = []

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        createStudent: (state, action: PayloadAction<StudentInterface>)=>{
            state.push(action.payload)
        },
        updateStudent: (state, action: PayloadAction<StudentInterface>)=>{
            return state.map((student)=>{
                if(student.id === action.payload.id)
                {
                    return action.payload
                }
                else {
                    return student
                }
            })
        },
        deleteStudent: (state, action: PayloadAction<{id: number}>)=>{
            return state.filter((student)=>student.id !== action.payload.id)
        },
        resetStudents: (state)=>{
            state = []
            return state
        }
    }
})

export const {createStudent, updateStudent, deleteStudent, resetStudents } = studentSlice.actions
export default studentSlice.reducer