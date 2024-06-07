import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterfaceNotification } from "../../constant/interface";



const initialState: InterfaceNotification = {
    newNotificationReceived : false
  };

  const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNewNotificationReceived: (state, action: PayloadAction<boolean>) => {
        state.newNotificationReceived = action.payload;
      },
    },
    extraReducers: () => {
      // Các reducer thêm vào ở đây nếu có
      // phần dưới này là xử lý api nếu cos
    },
  });
  
  export const {setNewNotificationReceived} = notificationSlice.actions;
  
  export default notificationSlice.reducer;