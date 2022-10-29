import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPaintingParams } from "./slice";
import { PaintingItem } from "./types";

export const fetchPaintings = createAsyncThunk<PaintingItem[], SearchPaintingParams>(
  "painting/fetchPaintingsStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<PaintingItem[]>(
      `https://63386d3b937ea77bfdbff520.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
