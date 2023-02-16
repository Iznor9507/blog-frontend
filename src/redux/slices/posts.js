import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";
// import instance from "axios";

const initialState = {
  posts: [],
  status: false,
  tags: [],

  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const { data } = await instance.get("/posts");
  return data;
});
export const fetchTags = createAsyncThunk("tags/fetch", async () => {
  const { data } = await instance.get("/tags");
  return data;
});
export const fetchRemovePost = createAsyncThunk("tags/fetchRemovePost", async (id) => 
 await instance.delete(`/posts/${id}`) 
 );

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    // Получение статей
      .addCase(fetchPosts.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts = [];
        state.error = "error";
        state.status = false;
      })
       // Получение тегов
      .addCase(fetchTags.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = false;
        state.error = "error";
      })
       // Удаление статьи
      .addCase(fetchRemovePost.fulfilled, (state, action) => {
        // state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
        state.posts = state.posts.filter((posts) => {
        return posts._id !== action.payload
        })
      })
      
  },
});

export const postsReducer = postsSlice.reducer;
