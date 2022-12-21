import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  company: '',
  completed: false
}

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload
    },
    updateEmail: (state, action) => {
      state.email = action.payload
    },
    updateCompany: (state, action) => {
      state.company = action.payload
    },
    setCompleted: (state, action) => {
      state.completed = action.payload
    }
  }
})

export default resultSlice.reducer;
export const resultActions = resultSlice.actions;