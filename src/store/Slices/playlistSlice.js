import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axiosClient';
import {parseError} from '../../helpers/errorParser';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    status: false,
    data: null,
};

// create Playlist
export const createPlaylist = createAsyncThunk("playlist/createPlaylist",
    async ({ data }) => {
        try {
            const response = await axios.post(`/playlists`, data);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    });

// get user playlists
export const getUserPlaylists = createAsyncThunk("playlist/getUserPlaylists",
    async (userId) => {
        try {
            const response = await axios.get(`/playlists/user/${userId}`);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    });

// get playlist by id
export const getPlaylistById = createAsyncThunk("playlist/getPlaylistById",
    async (playlistId) => {
        try {
            const response = await axios.get(`/playlists/${playlistId}`);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    });

// add video to playlist
export const addVideoToPlaylist = createAsyncThunk("playlist/addVideoToPlaylist",
    async ({ playlistId, videoId }) => {
        try {
            const response = await axios.patch(`/playlists/add/${videoId}/${playlistId}`);
            console.log("response: ", response);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
);

// remove video from playlist
export const removeVideoFromPlaylist = createAsyncThunk("playlist/removeVideoFromPlaylist",
    async ({ playlistId, videoId }) => {
        try {
            const response = await axios.patch(`/playlists/remove/${videoId}/${playlistId}`);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
);

// delete playlist
export const deletePlaylist = createAsyncThunk("playlist/deletePlaylist", 
    async (playlistId) => {
    try {
        const response = await axios.delete(`/playlists/${playlistId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
    }
});

// update playlist
export const updatePlaylist = createAsyncThunk("playlist/updatePlaylist",
    async ({ playlistId, data }) => {
        try {
            const response = await axios.patch(`/playlists/${playlistId}`, data);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            console.log(error);
            throw error;
        }
    }
);

// get current playlist:
export const getCurrentPlaylists = createAsyncThunk(
    "playlist/getCurrentPlaylists",
    async (videoId) => {
      try {
        const response = await axios.get(`/playlists/user/playlists/${videoId}`);
        return response.data.data;
      } catch (error) {
        toast.error(parseError(error.response.data));
        console.log(error);
        throw error;
      }
    }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    extraReducers: (builder) => {
        // get Playlist By Id
        builder.addCase(getPlaylistById.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.status = false;
        });
        builder.addCase(getPlaylistById.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getPlaylistById.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // get User Playlists
        builder.addCase(getUserPlaylists.pending, (state) => {
            state.loading = true;
            state.data = null;
        });
        builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getUserPlaylists.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // create Playlist
        builder.addCase(createPlaylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(createPlaylist.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // update Playlist
        builder.addCase(updatePlaylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatePlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.data.name = action.payload.name;
            state.data.description = action.payload.description;
            state.status = true;
        });
        builder.addCase(updatePlaylist.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // delete Playlist
        builder.addCase(deletePlaylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(deletePlaylist.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // get Current Playlists
        builder.addCase(getCurrentPlaylists.pending, (state) => {
            state.loading = true;
            state.data = null;
        });
        builder.addCase(getCurrentPlaylists.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
        });
        builder.addCase(getCurrentPlaylists.rejected, (state) => {
            state.loading = false;
            state.status = false;
        }); 
        
        builder.addCase(addVideoToPlaylist.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(addVideoToPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.status = true;
          });
          builder.addCase(addVideoToPlaylist.rejected, (state) => {
            state.loading = false;
            state.status = false;
          });
    },
});

export default playlistSlice.reducer;