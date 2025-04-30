import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../helpers/axiosClient'
import { toast } from "react-toastify";
import { parseError } from "../../helpers/errorParser";

const initialState = {
    loading: false,
    status: false,
};

export const healthCheck = createAsyncThunk("health/healthCheck", 
    async () => {
    try {
        const response = await axios.get(`/healthcheck`);
        return response.data.data;
    } catch (error) {
        toast.error("Oops: surver is not responding");
        console.log(error);
    }
});

const healthSlice = createSlice({
    name: "health",
    initialState,
    extraReducers: (builder) => {
        //Check Health
        builder.addCase(healthCheck.pending, (state) => {
            state.loading = true;
            state.status = false;
        });
        builder.addCase(healthCheck.fulfilled, (state) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(healthCheck.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    },
});

export default healthSlice.reducer;