import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axiosClient';
import parseError from '../../helpers/errorParser';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    likedVideos: [],
    likedComments: [],
    likedTweets: [],
    videoLikeStatus: {},
    commentLikeStatus: {},
    tweetLikeStatus: {}
};

// toggle video likes
export const toggleVideoLike = createAsyncThunk("like/toggleVideoLike",
    async (videoId) => {
        try {
            const response = await axios.patch(`likes/video/${videoId}`);
            return {videoId, ...response.data.data}
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

            return { commentId, ...response.data.data };
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
            const { videoId, ...likeStatus } = action.payload;
            state.videoLikeStatus[videoId] = likeStatus;
        })
        builder.addCase(toggleVideoLike.rejected, (state) => {
            state.loading = false;
        })

        // toggleCommentLike
        builder.addCase(toggleCommentLike.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(toggleCommentLike.fulfilled, (state, action) => {
            state.loading = false;
            const { commentId, ...likeStatus } = action.payload;
            state.commentLikeStatus[commentId] = likeStatus;
        })
        builder.addCase(toggleCommentLike.rejected, (state) => {
            state.loading = false;
        })

        // toggleTweetLike
        builder.addCase(toggleTweetLike.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(toggleTweetLike.fulfilled, (state, action) => {
            state.loading = false;
            const { tweetId, ...likeStatus } = action.payload;
            state.tweetLikeStatus[tweetId] = likeStatus;
        })
        builder.addCase(toggleTweetLike.rejected, (state) => {
            state.loading = false;
        })

        // get liked videos
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVideos = action.payload;
        })
        builder.addCase(getLikedVideos.rejected, (state) => {
            state.loading = false;
        })

    }
})

export default likeSlice.reducer;