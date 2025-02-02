import { configureStore } from '@reduxjs/toolkit';

import Settings from './reducers/settings';
import Contacts from './reducers/contacts';

export default configureStore({
  reducer: {
    Settings,
    Contacts
  },
});
