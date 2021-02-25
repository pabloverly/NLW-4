import {ExperienceBar} from '../components/Bar/experienceBar'
import { CompletedChallengs } from '../components/CompletedChallengs/CompletedChallengs'
import { CountDown } from '../components/CountDown/CountDown'
import { Profile } from '../components/Profile/Profile'

import styles from '../styles/Home.module.css'

import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox'

export default function Home() {
  return (
    <div className={styles.container}>  
    <Head>
      <title>Inicio | move.it</title>
    </Head>
    <ExperienceBar />
    <section>
      <div>
         <Profile />
         <CompletedChallengs />
         <CountDown />
      </div>
      <div>
        <ChallengeBox />
      </div>
    </section>
    </div>
  )
}
