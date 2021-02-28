import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';
import { isMobile } from 'react-device-detect';


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    closeLevelUpModal: () => void;
    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;

}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceFactor = 4;
    const experienceToNextLevel = Math.pow((level + 1) * experienceFactor, 2);


    useEffect(() => {
        if (!isMobile) {
            window.Notification.requestPermission();
        }
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    }, [level, currentExperience, challengeCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
        showNotification(challenge);
        playAudioNotification();
    }

    function showNotification(challenge: any) {
        if (!isMobile) {
            if (Notification.permission === 'granted') {
                new Notification("Novo desafio 🎉 ", {
                    body: `Valendo  ${challenge.amount} xp`
                })
            }
        }
    }

    function playAudioNotification() {
        if (!isMobile) {
            new Audio('/notification.mp3').play();
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience -= experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);

    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    return (
        <ChallengesContext.Provider value={{ level, closeLevelUpModal, completeChallenge, experienceToNextLevel, resetChallenge, activeChallenge, startNewChallenge, levelUp, currentExperience, challengeCompleted }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

