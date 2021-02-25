import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import styles from  '../../styles/Componente.module.css'

export function ExperienceBar(){
    const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext)

    const percentToNewLevel = Math.round(currentExperience * 100) / experienceToNextLevel
    return(
        <header className={styles.experienceBar}>
                <span>0 xp</span>
                <div >
                    <div style={{width: `${percentToNewLevel}0%`}}/>
                    <span className={styles.currentexperience} style={{left: `${percentToNewLevel}%`}}>
                         {currentExperience} xp
                    </span>
                </div>
                <span>{experienceToNextLevel} xp</span>
        </header>
    )
}   