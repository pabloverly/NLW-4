import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownContexData{
            minutes: number ;
            segundo: number;
            isFinished: boolean;
            isActive : boolean;
            startCountDown: () => void;
            resetCountDown: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}
export const CountDownContext = createContext({} as CountDownContexData)
//para zerar o time
let countdownTimeout: NodeJS.Timeout;

export function CountDownProvider({children}: ChallengesProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext)

    const [time , setTime] =useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const minutes = Math.floor (time / 60) //arrendondar para baixo;
    const segundo = time % 60 //resto da divisao
    
    function resetCountDown(){
        clearTimeout(countdownTimeout); //zerando o time e depois faz o false do active para nao descer um segundo
        setIsActive(false);
        setTime(0.1 * 60); // voltando valor inicial de 25seg
        setIsFinished(false);
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
        <CountDownContext.Provider value={{
            minutes,
            segundo,
            isFinished,
            isActive,
            startCountDown,
            resetCountDown

        }}>
            {children}
        </CountDownContext.Provider>
    )
}