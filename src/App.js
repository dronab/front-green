import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Settings from './components/Settings';
import AddContact from './components/contacts/AddContact';
import ChatDialog from './components/chat/Chat';
import Contact from './components/contacts/Contact';

import { MdRoomPreferences, MdAddCall } from "react-icons/md";
import './App.css';

import { settingsTogle } from './reducers/settings';
import { contactAddToggle } from './reducers/contacts';

function App() {
  const dispatch = useDispatch();
  const showSettings = useSelector((state) => state.Settings.showToggleSetting);
  const showAddContact = useSelector((state) => state.Contacts.showToggleContacts);
  const { currentUser } = useSelector((state) => state.Contacts);

  return (
    <div className="App">
      <div className='container-list-contacts'>
        <div className='contact-mnu'>
          <span><b>Чаты</b></span>
          <div>
            <MdAddCall className='icon-chat-mnu' size={32} onClick={() => dispatch(contactAddToggle())} />
            <MdRoomPreferences className='icon-chat-mnu' size={32} onClick={() => dispatch(settingsTogle())} />
          </div>
        </div>
        {showSettings && <Settings />}
        <div>
          {showAddContact && <AddContact />}
          <Contact />
        </div>
      </div>
      {currentUser.phone ? <ChatDialog /> : <div className='empty-dialog'>Добавьте и выберите собеседника из списка</div>
      }
    </div >
  );
}

export default App;
