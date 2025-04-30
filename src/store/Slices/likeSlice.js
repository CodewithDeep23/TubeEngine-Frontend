import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axiosClient';
import {parseError} from '../../helpers/errorParser';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    status: false,
    data: null
};

// toggle like
export const toggleLike = createAsyncThunk("like/toggleLike",
    async ({ qs, toggleLike }) => {
        try {
            const response = await axios.patch(`likes?toggleLike=${toggleLike}&${qs}`);
            return response.data.data
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
        }
    }
)

// toggle video likes
export const toggleVideoLike = createAsyncThunk("like/toggleVideoLike",
    async (videoId) => {
        try {
            const response = await axios.patch(`likes/video/${videoId}`);
            return response.data.data
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    })

// toggle comment likes
export const toggleCommentLike = createAsyncThunk("like/toggleCommentLike",
    async ({ commentId, toggleLike }) => {
        try {
            const response = await axios.patch(`likes/comment/${commentId}?toggleLike=${toggleLike}`);

            return response.data.data
        } catch (error) {
            toast.error(parseError(error.response.data))
            throw error;
        }
    })

// toggle tweet likes
export const toggleTweetLike = createAsyncThunk("like/toggleTweetLike",
    async ({ tweetId, toggleLike }) => {
        try {
            const response = await axios.patch(`likes/tweet/${tweetId}?toggleLike=${toggleLike}`)
            return { tweetId, ...response.data.data };
        } catch (error) {
            toast.error(parseError(error.response.data))
            console.log(error);
        }
    })

// get all liked videos
export const getLikedVideos = createAsyncThunk("like/getLikedVideos",
    async () => {
        try {
            const response = await axios.get("likes/videos");
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data))
            console.log(error);
        }
    })

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // toggleVideoLike
        builder.addCase(toggleVideoLike.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(toggleVideoLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        })
        builder.addCase(toggleVideoLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
        })

        // toggleCommentLike
        builder.addCase(toggleCommentLike.pending, (state) => {
            state.loading = true;
            state.data = null;
        })
        builder.addCase(toggleCommentLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        })
        builder.addCase(toggleCommentLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
        })

        // toggleTweetLike
        builder.addCase(toggleTweetLike.pending, (state) => {
            state.loading = true;
            state.data = null;
        })
        builder.addCase(toggleTweetLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        })
        builder.addCase(toggleTweetLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
        })

        // toggleLike
        builder.addCase(toggleLike.pending, (state) => {
            state.loading = true;
            state.data = null;
        });
        builder.addCase(toggleLike.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(toggleLike.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // get liked videos
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
            state.data = null;
        })
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVideos = action.payload;
        })
        builder.addCase(getLikedVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
        })

    }
})

export default likeSlice.reducer;