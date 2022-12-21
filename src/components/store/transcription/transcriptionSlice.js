import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nameTranscriptionId: '',
    emailTranscriptionId: '',
    companyTranscriptionId: ''
  }

  const transcriptionSlice = createSlice({
    name: 'recording',
    initialState,
    reducers: {
      updateNameId: (state, action) => {
        state.nameTranscriptionId = action.payload
      },
      updateEmailId: (state, action) => {
        state.emailTranscriptionId = action.payload
      },
      updateCompanyId: (state, action) => {
        state.companyTranscriptionId = action.payload
      },
    }
  })
  
export default transcriptionSlice.reducer;
export const transcriptionActions = transcriptionSlice.actions;