import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    micValue: 1
  }

  const microphoneSlice = createSlice({
    name: 'microphone',
    initialState,
    reducers: {
      micToggle: (state, action) => {
        state.micValue = action.payload
      }
    }
  })
  
export default microphoneSlice.reducer;
export const updateMic = microphoneSlice.actions;