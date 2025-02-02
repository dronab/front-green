import { useDispatch } from 'react-redux';

import { saveContact } from "../../reducers/contacts";
import { useState } from 'react';

function AddContact() {
    const [stateInput, setInput] = useState('');
    const dispatch = useDispatch();
  
    return (
        <>
            <div className='add-new-chat-contact'>
                <input
                    placeholder='Введите номер телефона'
                    value={stateInput}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={() => dispatch(saveContact(stateInput))}>Создать чат</button>
            </div>
        </>
    )
}

export default AddContact;
