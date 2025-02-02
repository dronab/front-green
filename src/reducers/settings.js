import { createSlice } from '@reduxjs/toolkit';

export const Settings = createSlice({
    name: 'settings-chat',
    initialState: {
        showToggleSetting: false,
        apiUrl: '',
        chatID: '',
        mediaUrl: '',
        idInstance: '',
        apiTokenInstance: ''
    },
    reducers: {
        settingsTogle: (state) => {
            state.showToggleSetting = !state.showToggleSetting
        },
        saveSetting: (state, action) => {
            state.apiUrl = action.payload?.apiUrl;
            state.chatID = action.payload?.chatID;
            state.mediaUrl = action.payload?.mediaUrl;
            state.idInstance = action.payload?.idInstance;
            state.apiTokenInstance = action.payload?.apiTokenInstance;
        },
        pushChatID: (state, action) => {
            state.chatID = action.payload;
        },
    },
})

export const { settingsTogle, saveSetting, pushChatID } = Settings.actions;
export default Settings.reducer;
