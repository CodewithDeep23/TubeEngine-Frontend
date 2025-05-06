import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axiosClient';
import {parseError} from '../../helpers/errorParser';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../conf/conf';

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        pagingInfo: {
            hasNextPage: false
        }
    },
    video: null,           // for single video details
    publishToggled: false,  // if toggling publish status
    status: false
};


// helper function to build the url with query params
const buildVideoQueryParams = ({ userId, sortBy, sortType, query, page, limit }) => {
    const url = new URL(`${BASE_URL}/videos`);

    if (userId) url.searchParams.set("userId", userId);
    if (query) url.searchParams.set("query", query);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);
    if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
    }
    return url;
};

// get all videos
export const getAllVideos = createAsyncThunk(
    "video/getAllVideos",
    async ({ userId, sortBy, sortType, query, page, limit }) => {
        try {
            const url = buildVideoQueryParams({ userId, sortBy, sortType, query, page, limit });

            const response = await axios.get(url.toString());
            // console.log(response.data.data);
            return response.data.data;  // Assumes { videos, pagingInfo }
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Failed to fetch videos";
            toast.error(errMsg);
            throw error;
        }
    }
);

// publish video
export const publishVideo = createAsyncThunk(
    "video/publishVideo",
    async ({ data }, { signal }) => {
        const formData = new FormData();
        for (const key in data) formData.append(key, data[key]);
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("videoFile", data.videoFile[0]);

        const controller = new AbortController();
        signal.addEventListener("abort", () => {
            controller.abort();
        });

        try {
            const response = await axios.post(`/videos`, formData, {
                signal: controller.signal,
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                toast.error("Video Upload canceled");
            } else {
                toast.error(parseError(error.response.data));
                console.log(error);
            }
            throw error;
        }
    }
);

// get video by ID
export const getVideoById = createAsyncThunk(
    "video/getVideoById",
    async ({ videoId }) => {
        try {
            const response = await axios.get(`/videos/${videoId}`);
            console.log("response:", response)
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
)

// update video
export const updateVideo = createAsyncThunk(
    "video/updateVideo",
    async ({ videoId, data }) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail[0]);
        }
        try {
            const response = await axios.patch(`/videos/${videoId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            toast.success(response.data.message);
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
)

// delete video
export const deleteVideo = createAsyncThunk(
    "video/deleteVideo",
    async ({ videoId }) => {
        try {
            const response = await axios.delete(`/videos/${videoId}`);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
)

// toggle publish status
export const togglePublishStatus = createAsyncThunk(
    "video/togglePublishStatus",
    async (videoId) => {
        try {
            const response = await axios.patch(`/videos/toggle/publish/${videoId}`);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(parseError(error.response.data));
            throw error;
        }
    }
)

// update View
export const updateView = createAsyncThunk("video/updateView", async (videoId) => {
    try {
      const response = await axios.patch(`/videos/view/${videoId}`);
    } catch (error) {
      toast.error(parseError(error.response.data));
      console.log(error);
      throw error;
    }
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        emptyVideoState: (state, action) => {
            console.log("state", state.video)
            state.video = null;
            console.log("state", state.video)
        },
    },
    extraReducers: (builder) => {
        // get all videos
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.docs = [...state.videos.docs, ...action.payload.videos];
            state.videos.pagingInfo.hasNextPage = action.payload.pagingInfo.hasNextPage;
            state.status = true;
        });
        builder.addCase(getAllVideos.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // publish video
        builder.addCase(publishVideo.pending, (state) => {
            state.uploading = true;
        })
        builder.addCase(publishVideo.fulfilled, (state, action) => {
            state.uploading = false;
            state.uploaded = true;
            state.videos.docs.unshift(action.payload);
            state.status = true;
        })
        builder.addCase(publishVideo.rejected, (state) => {
            state.uploading = false;
            state.uploaded = false;
            state.status = false;
        });

        // get video by Id
        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });
        builder.addCase(getVideoById.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // update video
        builder.addCase(updateVideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(updateVideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(updateVideo.rejected, (state) => {
            state.uploading = false;
            state.status = false;
        });

        // delete video
        builder.addCase(deleteVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(deleteVideo.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });

        // toggle publish status
        builder.addCase(togglePublishStatus.fulfilled, (state, action) => {
            state.publishToggled = !state.publishToggled;
        })

        // update view
        builder.addCase(updateView.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateView.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
        });
        builder.addCase(updateView.rejected, (state) => {
            state.loading = false;
            state.status = false;
        });
    }
})

export const { emptyVideoState } = videoSlice.actions;
export default videoSlice.reducer;