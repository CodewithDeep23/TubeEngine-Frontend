import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import userSlice from './Slices/userSlice';
import darkModeSlice from './Slices/themeSlice';
import videoSlice from './Slices/videoSlice';
import subscriptionSlice from './Slices/subscription';
import likeSlice from './Slices/likeSlice';
import commentSlice from './Slices/commentSlice';
import playlistSlice from './Slices/playlistSlice';
import tweetSlice from './Slices/tweetSlice';
import dashboardSlice from './Slices/dashboardSlice';
import healthCheckSlice from './Slices/healthcheckSlice';
import paginationSlice from './Slices/paginationSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        darkMode: darkModeSlice,
        video: videoSlice,
        subscription: subscriptionSlice,
        like: likeSlice,
        comment: commentSlice,
        playlist: playlistSlice,
        tweet: tweetSlice,
        dashboard: dashboardSlice,
        healthCheck: healthCheckSlice,
        pagingVideos: paginationSlice
    }
})