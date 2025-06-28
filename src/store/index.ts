// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports
import chatReducer from '@/store/slices/chat'
import calendarReducer from '@/store/slices/calendar'
import kanbanReducer from '@/store/slices/kanban'
import emailReducer from '@/store/slices/email'
import startupReducer from '@/store/slices/startup'
import userReducer from '@/store/slices/user'

export const store = configureStore({
  reducer: {
    chatReducer,
    calendarReducer,
    kanbanReducer,
    emailReducer,
    startupReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export * from './hooks'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
