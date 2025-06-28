import { UserType } from "@/types/UserTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: UserType | null;
}

const userState: UserState = {
  user: {
    id: 0,
    name: "Kareem Khaled",
    firstname: "kareem",
    lastname: "khaled",
    email: "kareem@gmail.com",
    phone: "01098765897",
    gender: "Male",
    role: "Admin",
    hasCompany: true,
    image: null,
    created_at: "2023-10-01T12:00:00Z",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
