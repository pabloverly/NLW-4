import {  useContext} from 'react'
import styles from '../../styles/CountDown.module.css'
import { CountDownContext } from '../../context/CountDownContext';

export function CountDown (){
    const {minutes,segundo, isFinished, startCountDown, isActive, resetCountDown} = useContext(CountDownContext)

    //dar um split dividindo em dois caractere o PADSTART verificar se nao tem dois caractere se nao acrescente 0 (zero) a esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [segundoLeft, segundoRiht] = String(segundo).padStart(2, '0').split('');

   

return(
    <div>
        <div className={styles.countDownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{segundoLeft}</span>
                <span>{segundoRiht}</span>
            </div>
        </div>

        {/*
        Primeira forma de fazer o if ternario com retorno nulo
        {isActive ? (
            <p>Terminou....</p>
        ) : null} */}

        {/* Segunda forma 
        {isActive && (
            <button  
                disabled           
                onClick={startCountDown}
                className={styles.CountDonwButton}
         >
            Encerrado
        </button>
        )}
        */}

         
        {isFinished ? (
            <button  
                disabled           
                onClick={startCountDown}
                className={styles.CountDonwButton}
         >
            Encerrado
        </button>
        ) : (
            <>
                {/* Se ativo  ()  : senao () */}
                { isActive ? (
                    <button 
                        type="button" 
                        onClick={resetCountDown}
                        className={`${styles.CountDonwButton} ${styles.CountDonwButtonActive}`}  //usando interpolacao para carregar duas classes
                    >           
                        Abortar
                    </button>
                    
                ):(  
                    <button 
                        type="button" 
                        onClick={startCountDown}
                        className={styles.CountDonwButton}
                    >
                    Iniciar
                    </button>
                )}
            </>
        )}

      

    </div>
)
}