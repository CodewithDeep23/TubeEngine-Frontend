import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../helpers/axiosClient'
import { toast } from "react-toastify";
import { parseError } from "../../helpers/errorParser";

const initialState = {
    loading: false,
    status: false,
    data: [],
};

// create tweet
export const createTweet = createAsyncThunk("tweet/createTweet", 
    async (data) => {
    try {
        const response = await axios.post(`/tweets`, data);
        console.log(response)
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

// get user tweets
export const getUserTweet = createAsyncThunk("tweet/getUserTweet", async (userId) => {
    try {
        const response = await axios.get(`/tweets/user/${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

// update tweet
export const updateTweet = createAsyncThunk("tweet/updateTweet", 
    async ({ tweetId, data }) => {
    try {
        const response = await axios.patch(`/tweets/${tweetId}`, data);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

export const deleteTweet = createAsyncThunk("tweet/deleteTweet", async ({ tweetId }) => {
    try {
        const response = await axios.delete(`/tweets/${tweetId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

// get all tweets
export const getAllTweets = createAsyncThunk("tweet/getAllTweets", async () => {
    try {
        const response = await axios.get(`/tweets`);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    extraReducers: (builder) => {
        // create tweet
        builder.addCase(createTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTweet.fulfilled, (state, action) => {
            state.loading = false;
            state.data.unshift(action.payload);
            state.status = true;
        });
        builder.addCase(createTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // get User tweet
        builder.addCase(getUserTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserTweet.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getUserTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // Update tweet
        builder.addCase(updateTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTweet.fulfilled, (state, action) => {
            state.loading = false;
            // state.data = action.payload;
            state.status = true;
        });
        builder.addCase(updateTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // delete tweet
        builder.addCase(deleteTweet.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTweet.fulfilled, (state, action) => {
            state.loading = false;
            let filteredTweets = state.data.filter((tweet) => tweet._id !== action.payload._id);
            state.data = filteredTweets;
            state.status = true;
        });
        builder.addCase(deleteTweet.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // get all tweets
        builder.addCase(getAllTweets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllTweets.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getAllTweets.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    },
});

export default tweetSlice.reducer;