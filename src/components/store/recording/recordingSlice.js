import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isRecording: false,
  recPage: 0,
}

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    recToggle: (state, action) => {
      state.isRecording = action.payload
    },
    updateRecPage: (state, action) => {
      state.recPage = action.payload
    },
  }
})

export default recordingSlice.reducer;
export const updateRec = recordingSlice.actions;