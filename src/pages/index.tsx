import {ExperienceBar} from '../components/Bar/experienceBar'
import { CompletedChallengs } from '../components/CompletedChallengs/CompletedChallengs'
import { CountDown } from '../components/CountDown/CountDown'
import { Profile } from '../components/Profile/Profile'

import styles from '../styles/Home.module.css'

import Head from 'next/head'

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

      </div>
    </section>
    </div>
  )
}
