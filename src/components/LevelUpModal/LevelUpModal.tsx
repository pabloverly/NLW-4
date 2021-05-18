import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import styles from '../../styles/LevelUpModal.module.css'

export function LevelUpModal (){
    const { level, closeLevelUpModal}= useContext(ChallengesContext)
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>  {level}  </header>

                <strong>Parabens</strong>
                <p>Você alconçou novo level</p>

                <button type="button" onClick={closeLevelUpModal}> 
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>

            </div>
        </div>
    )
}