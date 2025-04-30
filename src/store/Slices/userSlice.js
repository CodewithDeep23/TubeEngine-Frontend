import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseError } from "../../helpers/errorParser";
import axios from "../../helpers/axiosClient";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    status: false,
    userData: null,
};

// register user
export const register = createAsyncThunk("user/register", async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append("avatar", data.avatar[0]);
        if (data.coverImage) {
            formData.append("coverImage", data.coverImage[0]);
        }
        const response = await axios.post("/users/register", formData);
        toast.success("Account Created successfully");
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message || parseError(error.response.data));
        console.log(error);
    }
});

// get channel profile
export const channelProfile = createAsyncThunk("user/channelprofile", async (username) => {
    try {
        const response = await axios.get(`/users/c/${username}`);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        //register user
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(register.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        //get Channel Profile
        builder.addCase(channelProfile.pending, (state) => {
            state.loading = true;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(channelProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(channelProfile.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    },
});

export default userSlice.reducer;