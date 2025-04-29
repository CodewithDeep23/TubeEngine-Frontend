import { confgureStore, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slices/authSlice';
import { userSlice } from './Slices/userSlice';
import { darkModeSlice } from './Slices/themeSlice';
import { videoSlice } from './Slices/videoSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        darkMode: darkModeSlice,
        video: videoSlice
    }
})