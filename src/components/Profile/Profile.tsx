import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import styles from '../../styles/Profile.module.css'

export function Profile (){
    const {level} = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src='https://avatars.githubusercontent.com/u/36868134?s=460&u=e58edcc336585b9078ea616f0c5f610ab45a02ff&v=4' alt=""/>
            <div>
                <strong> Pablo Verly</strong>
                <p>
                <img src="icons/level.svg" alt="Level" />
                Level {level}</p>
                
            
            </div>
        </div>
    )
}