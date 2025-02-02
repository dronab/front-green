import { createSlice } from '@reduxjs/toolkit';

export const Contacts = createSlice({
    name: 'contacts',
    initialState: {
        users: [],
        messages: [],
        currentUser: {
            phone: '',
            chatId: ''
        },
        currentChatID: '',
        showToggleContacts: false
    },
    reducers: {
        contactAddToggle: (state) => {
            state.showToggleContacts = !state.showToggleContacts;
        },
        saveContact: (state, action) => {
            if (!action.payload) { return; }
            const clearOther = action.payload.replace(/\W|_/g, '');
            const prepareData = {
                phone: action.payload,
                chatId: `${clearOther}@c.us`
            }
            state.users.push(prepareData);
            state.showToggleContacts = false;
        },
        setCurrentUser: (state, action) => {
            const result = state.users.filter((item) => action.payload.phone === item.phone);
            const prepareData = {
                phone: result[0].phone,
                chatId: result[0].chatId
            }
            state.currentUser = prepareData;
        },
        addMessage: (state, action) => {
            const { phone, original } = action.payload;
            const prepareMsg = {
                phone,
                original,
                receiptId: original?.receiptId,
                messageData: original?.body?.messageData,
                chatId: original?.body?.senderData?.chatId,
                type: original?.body?.messageData?.typeMessage,
                
            }
            state.messages.push(prepareMsg);
            state.messages = [...new Set(state.messages)];
        },
    },
})

export const { contactAddToggle, saveContact, setCurrentUser, addMessage } = Contacts.actions;
export default Contacts.reducer;
