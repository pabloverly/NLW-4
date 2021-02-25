import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import styles from '../../styles/CompletedChallengs.module.css'

export function CompletedChallengs(){
    const {challengesCompleted} = useContext(ChallengesContext)
    
    return(
        <div className={styles.completedChallengsContainer}> 
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}