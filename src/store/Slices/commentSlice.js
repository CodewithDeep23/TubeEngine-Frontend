import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../helpers/axiosClient'
import { toast } from "react-toastify";
import { parseError } from "../../helpers/errorParser";

const initialState = {
    loading: false,
    status: false,
    data: null
}

export const getVideoComments = createAsyncThunk("comment/getVideoComments",
    async (videoId) => {
        try {
            const response = await axios.get(`/comments/get/${videoId}`);
            return response.data.data.docs;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
)

// add comment
export const addComment = createAsyncThunk("comment/addComment",
    async ({ videoId, content }) => {
        try {
            const response = await axios.post(`/comments/add/${videoId}`, { content });
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
)

// update comment
export const updateComment = createAsyncThunk("comment/updateComment",
    async ({ commentId, content }) => {
        try {
            const response = await axios.patch(`/comments/c/${commentId}`, { content });
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
)

// delete comment
export const deleteComment = createAsyncThunk("comment/deleteComment",
    async (commentId) => {
        try {
            const response = await axios.delete(`/comments/c/${commentId}`);
            toast.success(response.data.message)
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
)

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        cleanUpComments: (state) => {
            state.comments = [];
        },
    },
    extraReducers: (builder) => {
        // get Video Comments
        builder.addCase(getVideoComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoComments.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getVideoComments.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // add Comment
        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.loading = false;
            state.data.unshift(action.payload);
            state.status = true;
        });
        builder.addCase(addComment.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // update Comment
        builder.addCase(updateComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateComment.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(updateComment.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // delete Comment
        builder.addCase(deleteComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(deleteComment.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    },
});

export const { cleanUpComments } = commentSlice.actions;
export default commentSlice.reducer;