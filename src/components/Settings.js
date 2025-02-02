import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { saveSetting, pushChatID } from '../reducers/settings';

function Settings() {
    const Settings = useSelector((state) => state.Settings);
    const { apiUrl, mediaUrl, idInstance, apiTokenInstance, chatID } = Settings;
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(saveSetting({
            ...Settings,
            [name]: value
        }));
    };

    const handleClickGet = async () => {
        const URL = `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
        try {
            const responce = await axios.get(URL);
            if (responce.data) {
                dispatch(pushChatID(responce.data?.wid));
            }
        } catch (error) {

        }
    }

    return (
        <>
            <span>Настройки подключения</span>
            <span>apiUrl</span>
            <input
                name='apiUrl'
                value={apiUrl}
                onChange={handleInputChange}
            />
            <span>mediaUrl</span>
            <input
                name='mediaUrl'
                value={mediaUrl}
                onChange={handleInputChange}
            />
            <span>idInstance</span>
            <input
                name='idInstance'
                value={idInstance}
                onChange={handleInputChange}
            />
            <span>apiTokenInstance</span>
            <input
                name='apiTokenInstance'
                value={apiTokenInstance}
                onChange={handleInputChange}
            />
            <span>chatID</span>
            <button onClick={handleClickGet}>Получить chatID</button>
            <input
                name='chatID'
                value={chatID}
                onChange={handleInputChange}
            />
        </>
    )
}

export default Settings;
