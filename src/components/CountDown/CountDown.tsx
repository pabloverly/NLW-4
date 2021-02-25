import { useState, useEffect, useContext} from 'react'
import { ChallengesContext } from '../../context/ChallengesContext';
import styles from '../../styles/CountDown.module.css'

//para zerar o time
let countdownTimeout: NodeJS.Timeout;

export function CountDown (){
    const {startNewChallenge} = useContext(ChallengesContext)

    const [time , setTime] =useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const minutes = Math.floor (time / 60) //arrendondar para baixo;
    const segundo = time % 60 //resto da divisao

    //dar um split dividindo em dois caractere o PADSTART verificar se nao tem dois caractere se nao acrescente 0 (zero) a esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [segundoLeft, segundoRiht] = String(segundo).padStart(2, '0').split('');

    function resetCountDown(){
        clearTimeout(countdownTimeout); //zerando o time e depois faz o false do active para nao descer um segundo
        setIsActive(false);
        setTime(25 * 60); // voltando valor inicial de 25seg
    }

    function startCountDown(){
        setIsActive(true);
    }

    //observando o valor do isActive e time
    useEffect(()=>{
        if(isActive && time > 0 ){
            //receber o valor do time para poder zerar
            countdownTimeout =  setTimeout(()=>{
                setTime( time - 1)
            }, 1000)           
        } else if(isActive && time === 0){  // quando zerar 
            setIsFinished(true)
            setIsActive(false);
            startNewChallenge()//funcao vinda do context 
        }
    },[isActive,time])

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