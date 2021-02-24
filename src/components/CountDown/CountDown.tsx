import { useState, useEffect} from 'react'
import styles from '../../styles/CountDown.module.css'

export function CountDown (){
    const [time , setTime] =useState(25 * 60)

    const [active, setActive] = useState(false)
    const minutes = Math.floor (time / 60) //arrendondar para baixo;
    const segundo = time % 60 //resto da divisao

    //dar um split dividindo em dois caractere o PADSTART verificar se nao tem dois caractere se nao acrescente 0 (zero) a esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [segundoLeft, segundoRiht] = String(segundo).padStart(2, '0').split('');

    function startCountDown(){
        setActive(true);
    }

    useEffect(()=>{
        if(active && time > 0 ){
            setTimeout(()=>{
                setTime( time - 1)
            }, 1000)
           
        }
    },[active,time])

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
        <button 
            type="button" 
            onClick={startCountDown}
            className={styles.CountDonwButton}>Iniciar
            </button>
    </div>
)
}