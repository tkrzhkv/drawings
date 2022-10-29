import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPaintings } from "./asyncActions";
import { PaintingItem, PaintingSliceState, Status } from "./types";

const initialState: PaintingSliceState = {
  items: [],
  status: Status.LOADING, //loading / success / error
};

export type SearchPaintingParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

const paintingSlice = createSlice({
  name: "painting",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PaintingItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPaintings.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPaintings.fulfilled, (state, action: PayloadAction<PaintingItem[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPaintings.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = paintingSlice.actions;

export default paintingSlice.reducer;
