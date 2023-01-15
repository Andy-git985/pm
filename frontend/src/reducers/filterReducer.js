import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: 'All',
  view: 'Note Form',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterNotes(state, action) {
      console.log('STATE ', state);
      console.log('ACTION', action);
      // return (state = action.payload);
      state.notes = action.payload;
    },
    filterView(state, action) {
      console.log('STATE ', state);
      console.log('ACTION', action);
      // return (state = action.payload);
      state.view = action.payload;
    },
  },
});

export const { filterNotes, filterView } = filterSlice.actions;
export default filterSlice.reducer;
