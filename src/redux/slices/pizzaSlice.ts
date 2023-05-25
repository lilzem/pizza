import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id : number;
  title : string;
  types : number[];
  sizes : number[];
  price : number;
  count : number;
  imageUrl : string
}

export enum STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  REGECTED = 'error'
}

export interface PizzaSliceState {
  items : Pizza[];
  status : STATUS
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, sortBy, order } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63ecd8a131ef61473b2a708c.mockapi.io/items?${search}${category}${sortBy}${order}`
    );
    return data;
  }
);

const initialState : PizzaSliceState = {
  items: [],
  status: STATUS.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
    extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
        state.status = STATUS.LOADING;
        state.items = [];
      }),

      builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.status = STATUS.SUCCESS;
        state.items = action.payload;
      }),

      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = STATUS.REGECTED;
        state.items = [];
      })
    }
});

export const selectPizzaData = (state : RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
