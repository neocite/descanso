import Head from "next/head";
import { GetServerSideProps } from 'next'
import React from "react";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenge } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { CountdownProvider } from "../context/CountdownContext";
import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from "../context/ChallengeContext";


interface UserProps {
    name: string;
    picture: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;

}

export default function Home(props: UserProps) {
    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted} >
            <div className={styles.container}>

                <Head>
                    <title>Início | Descanso</title>
                </Head>

                <ExperienceBar />
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenge />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    let { level, currentExperience, challengesCompleted } = context.req.cookies;

    if (!level) {
        level = '0';
    }

    if (!currentExperience) {
        currentExperience = '0';
    }

    if (!challengesCompleted) {
        challengesCompleted = '0';
    }

    const challengeData = {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted)
    }

    return {
        props: challengeData
    }


}