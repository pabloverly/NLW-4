import Head from 'next/head'
import {GetServerSideProps} from 'next'

import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox'
import { CountDownProvider } from '../context/CountDownContext'
import {ExperienceBar} from '../components/Bar/experienceBar'
import { CompletedChallengs } from '../components/CompletedChallengs/CompletedChallengs'
import { CountDown } from '../components/CountDown/CountDown'
import { Profile } from '../components/Profile/Profile'
import styles from '../styles/Home.module.css'
import { ChallengesProvider } from '../context/ChallengesContext'


interface HomeProps {
  level: number
  currentExperience:  number 
  challengesCompleted: number
}


export default function Home(props: HomeProps) { 
  
  console.log(props)

  return (
        // Provide torna public os acesso dentre os dados dos componetes /
    
   <ChallengesProvider 
      level={props.level}  
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>  
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />

        <CountDownProvider>
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
      </CountDownProvider>
      </div>
    </ChallengesProvider>

  )
}

/* FORMA NEXT TRATA PARA BUSCAR OS COOKIES - ELE BUSCA ANTES DE CARREGAR A PAGINA (COMPONENTE) ASSIM FICA DISPONIVEL NO BUSCADOR DO GOOGLE
TEM QUE SER ESSA DESCRICAO getServerSideProps E USAR AS PROPS PARA PASSAR A INFORMACAO AO COMPONENTE OU SEJA 
O CONSOLE.LOG NO COMPONENTE INFORMA NO BROWSER E O CONSOLE.LOG NESTA FUNCAO RETORNA NO Node.toString
*/
export const getServerSideProps: GetServerSideProps = async (ctx) =>{

  //recebe os cookies e passa para props
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies; 

  return{
    //convertendo o recebimento de string para number
     props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
     }
  }
}