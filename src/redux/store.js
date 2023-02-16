import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/aurh";
import { postsReducer} from "./slices/posts";



const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
