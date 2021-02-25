import { useContext, useState } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import styles from  '../../styles/ChallengeBox.module.css'

export function ChallengeBox (){
    const {activeChallenge, resetChallenge} = useContext(ChallengesContext)



    return(
    <div className={styles.challengeBoxContainer}>
       {activeChallenge ? (
           <div className={styles.challengeActive}>
               <header>Game {activeChallenge.amount} xp</header>

               <main>
                   {/* fazer assim ou fazer um if testando o activeChallenge.type e mostrando duas imagens */}
                   <img src={`icons/${activeChallenge.type}.svg`} alt='' /> 
                   <strong>Novo desafio</strong>
                   <p>{activeChallenge.description}</p>
               </main>

               <footer>
                <button 
                    type='button'
                    className={styles.challengeFailedButton}
                    onClick={resetChallenge}
                >
                    Falhei
                </button>
                <button 
                    type='button'
                    className={styles.challengeSucceededButton}
                >
                    Completei
                </button>
               </footer>
           </div>
       ):(
            <div className={styles.challengeNoActive}>
            <strong></strong>
            <p>
                <img src='icons/level-up.svg' alt='Level Up' />
                Avance de level completando desafios
            </p>
        </div>
       )}
    </div>
    )
}