import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdSend } from "react-icons/md";

import ChatItems from './ChatItems';
import { addMessage } from '../../reducers/contacts';

import useInterval from '../../utils/useInterval';

import './Chat.css';

function ChatDialog() {
  const { currentUser, messages } = useSelector((state) => state.Contacts);
  const Settings = useSelector((state) => state.Settings);
  const { apiUrl, idInstance, apiTokenInstance } = Settings;
  const [stateInput, setInput] = useState('');

  const dispatch = useDispatch();
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages, currentUser]);

  const sendMessage = async () => {
    if (!apiUrl || !idInstance || !apiTokenInstance) {
      return;
    }
    const URL = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const response = await axios.post(URL, { chatId: currentUser.chatId, message: stateInput });
    if (response.data) {
      setInput('');
    }
  }

  const addTestMsg = async () => {
    const URL = `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`;
    try {
      const responce = await axios.get(URL);
      if (responce.data) {
        dispatch(addMessage({ original: responce.data, phone: currentUser.phone }));
        const URL2 = `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${responce.data?.receiptId}`;
        axios.delete(URL2);
      }
    } catch (error) {

    }
  }

  useInterval(() => {
    if (!apiUrl || !idInstance || !apiTokenInstance) {
      return;
    }
    addTestMsg();
  }, 8000);

  return (
    <div className='container-list-msg'>
      <div className='chat-user'>
        <span>Собеседник: {currentUser.phone}</span>
      </div>
      <div
        ref={messagesRef}
        className='chat-msg-container'>
        <ChatItems />
      </div>
      <div className='chat-mnu'>
        <input
          className='text-input-send'
          placeholder='Введите текст'
          value={stateInput}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className='icon-send' onClick={sendMessage}>
          <MdSend size={32} />
        </div>
      </div>
    </div>
  )
}

export default ChatDialog;
