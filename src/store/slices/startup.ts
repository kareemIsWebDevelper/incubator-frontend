import {createSlice} from '@reduxjs/toolkit';

export interface StartupState {
  startup: any | null;
}

const startupState: StartupState = {
  startup: {},
};

const startupSclice = createSlice({
  name: 'startup',
  initialState: startupState,
  reducers: {
    setStartup: (state, action) => {
      state.startup = action.payload;
    },
    removeStartup: (state) => {
      state.startup = null;
    },
  },
});

export const {setStartup, removeStartup} = startupSclice.actions;
export default startupSclice.reducer;
