import styles from  '../../styles/Componente.module.css'

export function ExperienceBar(){
    
    return(
        <header className={styles.experienceBar}>
                <span>0 xp</span>
                <div >
                    <div style={{width: '50%'}}/>
                    <span className={styles.currentexperience} style={{left: '50%'}}>
                         300xp
                    </span>
                </div>
                <span>600 xp</span>
        </header>
    )
}   