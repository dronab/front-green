import { useSelector, useDispatch } from 'react-redux';

import { setCurrentUser } from '../../reducers/contacts';

import './Contact.css';

function Contact() {
    const { users } = useSelector((state) => state.Contacts);
    const dispatch = useDispatch();

    return (
        <div className='list-contacts-items'>
            {users.map((item, index) => {
                return <div
                    key={index}
                    className='contacts-item'
                    onClick={() => dispatch(setCurrentUser({phone: item.phone, chatId: item.chatId}))}>
                    {item.phone}
                </div>
            })}
        </div>
    )
}

export default Contact;
