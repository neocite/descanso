import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenge() {

    const { challengeCompleted } = useContext(ChallengesContext);


    return (
        <div className={styles.container}>
            <span>Desafios completos</span>
            <span>{challengeCompleted}</span>
        </div>
    );
}