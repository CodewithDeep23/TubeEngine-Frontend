import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../helpers/axiosClient'
import { toast } from "react-toastify";
import { parseError } from "../../helpers/errorParser";

const initialState = {
    loading: false,
    status: false,
    userData: {}
}

export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        const response = await axios.post("/users/login", data);
        toast.success(response.data.message)
        return response.data.data.user;
    } catch (error) {
        toast.error(error.response.data.message || parseError(error.response.data));
        console.log(error);
        throw error;
    }
})

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        const response = await axios.post("/users/logout");
        toast.success(response.data.message)
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
})

// get refresh token
export const getRefreshToken = createAsyncThunk("auth/getRefreshToken", async (data) => {
    try {
        const response = await axios.get("/users/refresh-token", data);
        return response.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
})

// change password
export const changePassword = createAsyncThunk("auth/changePassword", async (data) => {
    try {
        const response = await axios.post("/users/change-password", data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        toast.success(response.data.message)
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
})

// get current user
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async () => {
    try {
        const response = await axios.get("/users/current-user");
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log("error", error);
        throw error;
    }
})

// update user account
export const updateAccount = createAsyncThunk("auth/updateUser", async (data) => {
    try {
        const response = await axios.patch("/users/update-account", data, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        toast.success(response.data.message)
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        throw error;
    }
})

// update avatar
export const updateAvatar = createAsyncThunk("auth/updateAvatar", async ({ data }) => {
    try {
        const response = await axios.patch("/users/avatar", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        toast.success(response.data.message)
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        throw error;
    }
})

// update cover image
export const updateCoverImage = createAsyncThunk("auth/updateCoverImage", async ({ data }) => {
    try {
        const response = await axios.patch("/users/cover-image", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        toast.success(response.data.message)
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        throw error;
    }
})

// get watch history
export const getWatchHistory = createAsyncThunk("auth/getWatchHistory", async () => {
    try {
        const response = await axios.get("/users/history");
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log("error", error);
        throw error;
    }
})

// Clear Watch History
export const clearWatchHistory = createAsyncThunk("user/clearWatchHistory", async () => {
    try {
      const response = await axios.delete(`/users/history`);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(parseError(error.response.data));
      console.log(error);
      throw error;
    }
});

// user playlist
export const getUserPlaylist = createAsyncThunk("auth/getUserPlaylist", async () => {
    try {
        const response = await axios.get(`/playlists/user/${userId}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        // console.log("error", error);
        throw error;
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });

        // logout
        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(logout.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });

        // change password
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changePassword.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changePassword.rejected, (state) => {
            state.loading = false;
        });

        // get current user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.status = true;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.userData = null;
            state.status = false;
        });

        // update account
        builder.addCase(updateAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateAccount.rejected, (state) => {
            state.loading = false;
        });

        // update avatar
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        });

        // update cover image
        builder.addCase(updateCoverImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImage.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(updateCoverImage.rejected, (state) => {
            state.loading = false;
        });

        // get watch history
        builder.addCase(getWatchHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.userData.watchHistory = action.payload;
        });
        builder.addCase(getWatchHistory.rejected, (state) => {
            state.loading = false;
        });

        // clear WatchHistory
        builder.addCase(clearWatchHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(clearWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.userData.watchHistory = [];
        });
        builder.addCase(clearWatchHistory.rejected, (state) => {
            state.loading = false;
        });

        // get user playlist
        builder.addCase(getUserPlaylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.userData.userPlaylists = action.payload;
        });
        builder.addCase(getUserPlaylist.rejected, (state) => {
            state.loading = false;
        });
    }

})

export default authSlice.reducer;