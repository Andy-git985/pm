import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterBy: null,
  notes: 'All',
  view: 'Note Form',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterNotes(state, action) {
      state.notes = action.payload;
    },
    filterView(state, action) {
      state.view = action.payload;
    },
    setFilterBy(state, action) {
      state.filterBy = action.payload;
    },
  },
});

export const { filterNotes, filterView, setFilterBy } = filterSlice.actions;
export default filterSlice.reducer;
