import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SortBy = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
}

type Order = {
  name: string;
  order: 'desc' | 'asc'
}

export interface FilterSliceState {
  categoryId: number;
  searchValue : string;
  sortProperty : SortBy;
  sortOrder : Order;
}

const initialState : FilterSliceState = {
  categoryId: 0,

  searchValue: "",

  sortProperty: {
    name: 'популярности',
    sortProperty: "rating",
  },

  sortOrder: {
    name: "за спаданням",
    order: "desc",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setSortType(state, action: PayloadAction<SortBy>) {
      state.sortProperty = action.payload;
    },

    setSortOrder(state, action: PayloadAction<Order>) {
      state.sortOrder = action.payload;
    },

    setFilter(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortProperty = action.payload.sortProperty;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const selectSearch = (state: RootState) => state.filter.searchValue;

export const {
  setCategoryId,
  setSortType,
  setSortOrder,
  setFilter,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
