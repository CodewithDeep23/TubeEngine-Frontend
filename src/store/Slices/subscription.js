import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axiosClient';
import {parseError} from '../../helpers/errorParser';
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    isSubscribed: null,
    channelSubscribers: [],
    mySubscriptions: [],
};

export const toggleSubscription = createAsyncThunk(
    "subscription/toggleSubscription",
    async (channelId) => {
        try {
            const response = await axios.post(
                `subscriptions/c/${channelId}`
            );
            return response.data.data.isSubscribed;
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
);

export const getUserChannelSubscribers = createAsyncThunk(
    "subscription/getUserChannelSubscribers",
    async (channelId) => {
        try {
            const response = await axios.get(
                `subscriptions/u/${channelId}`
            );
            console.log("Subscribed channels fetched: ", response.data.data);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
);

export const getSubscribedChannels = createAsyncThunk(
    "subscription/getSubscribedChannels",
    async (subscriberId) => {
        try {
            const response = await axios.get(
                `subscriptions/c/${subscriberId}`
            );
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
);

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // toggle Subscription
        builder.addCase(toggleSubscription.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(toggleSubscription.fulfilled, (state, action) => {
            state.loading = false;
            state.isSubscribed = action.payload;
        });

        // get user channel subscribers
        builder.addCase(getUserChannelSubscribers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
            state.loading = false;
            state.channelSubscribers = action.payload;
        });
        builder.addCase(getSubscribedChannels.rejected, (state) => {
            state.loading = false;
        });

        // get subscribed channels
        builder.addCase(getSubscribedChannels.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.loading = false;
            state.mySubscriptions = action.payload
        });
    },
});

export default subscriptionSlice.reducer;