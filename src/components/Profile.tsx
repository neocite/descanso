import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

interface UserProps {
    name: string;
    picture: string;
}

export function Profile(props: UserProps) {

    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.container}>
            <img src={props.picture} alt={props.name}></img>
            <div>
                <strong>{props.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"></img>
                    Level {level}</p>
            </div>
        </div>
    )
}
