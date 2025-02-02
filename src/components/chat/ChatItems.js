
import { useSelector } from 'react-redux';

function ChatItems() {
  const { currentUser, messages } = useSelector((state) => state.Contacts);

  function Item({ type, msg }) {
    switch (type) {
      case 'quotedMessage':
        return <div className='chat-item'>
          Собеседник:
          <div className='chat-item-quotedMessage'>
            <span>Цитата:</span>
            <div>{msg.quotedMessage.textMessage}</div>
          </div>
          <div>{msg.extendedTextMessageData.text}</div>
        </div>;
      case 'extendedTextMessage':
        return <div className='chat-item'>Я: {msg.extendedTextMessageData.text}</div>;
      case 'textMessage':
        return <div className='chat-item-sending'>Собеседник: {msg.textMessageData.textMessage}</div>;
      default:
        return <></>;
    }
  }

  return (
    <>
      {messages.filter(item => item.chatId === currentUser.chatId).map((item, index) => {
        return <Item key={index} type={item.type} msg={item.messageData} />
      })
      }
    </>
  )
}

export default ChatItems;
