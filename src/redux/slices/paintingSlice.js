import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPaintings = createAsyncThunk(
    'painting/fetchPaintingsStatus',
    async (params) => {
        const {sortBy, order, category, search, currentPage} = params;
        const {data} = await axios.get(
            `https://63386d3b937ea77bfdbff520.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading' //loading / success / error
}

const paintingSlice = createSlice({
    name: 'painting',
    initialState,
    reducers: {
        setItems(state, action) {
        state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPaintings.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPaintings.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success'
        },
        [fetchPaintings.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        },
    }
})

export const {setItems} = paintingSlice.actions;

export default paintingSlice.reducer;