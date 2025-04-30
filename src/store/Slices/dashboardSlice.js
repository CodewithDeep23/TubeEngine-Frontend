import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../helpers/axiosClient'
import { toast } from "react-toastify";
import { parseError } from "../../helpers/errorParser";

const initialState = {
    loading: false,
    status: false,
    data: {},
};

// get Channel Stats
export const getChannelStats = createAsyncThunk("dashboard/getChannelStats", 
    async () => {
    try {
        const response = await axios.get(`/dashboard/states`);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

// get Channel Videos
export const getChannelVideos = createAsyncThunk("dashboard/getChannelVideos", 
    async () => {
    try {
        const response = await axios.get(`/dashboard/videos`);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: (builder) => {
        // get Channel Stats
        builder.addCase(getChannelStats.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChannelStats.fulfilled, (state, action) => {
            state.loading = false;
            state.data.channelStates = action.payload;
            state.status = true;
        });
        builder.addCase(getChannelStats.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // get Channel Videos
        builder.addCase(getChannelVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getChannelVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.data.channelVideos = action.payload;
            state.status = true;
        });
        builder.addCase(getChannelVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    },
});

export default dashboardSlice.reducer;