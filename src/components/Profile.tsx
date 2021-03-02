import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/Profile.module.css';
import axios from 'axios';
interface UserProps {
    name: string;
    picture: string;
}

export function Profile() {

    const { level } = useContext(ChallengesContext);
    const [user, setUser] = useState(null);
    const [hasLoaded, sethasLoaded] = useState(false);

    const fetchData = async () => {
        await axios.get('/api/user').then(resp => {
            setUser(resp.data);
            sethasLoaded(true);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>{
            hasLoaded && (
                <div className={styles.container} >
                    <img src={user.picture} alt={user.name}></img>
                    <div>
                        <strong>{user.name}</strong>
                        <p>
                            <img src="icons/level.svg" alt="Level"></img>
                    Level {level}</p>
                    </div>
                </div>
            )
        }
        </>
    )
}
