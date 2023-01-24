import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../pages/utils/axiosClient";

export const getMyInfo = createAsyncThunk("/user/getMyInfo", async (body) => {
  try {
    const response = await axiosClient.get("/user/getMyInfo");
    // console.log(response.result.user);
    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateMyProfile = createAsyncThunk(
  "/user/updateMyProfile",
  async (body) => {
    try {
      const response = await axiosClient.put("/user/updateMyProfile", body);
      console.log("updateprofileresponse", response);
      console.log("In thunk", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export default appConfigSlice.reducer;
export const { setLoading, showToast } = appConfigSlice.actions;
