import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye'; //tipo string com somente dois tipos
    description: string;
    amount: number;
}

//Tipando os context
interface ChallengesContexData {
    level: number, 
    currentExperience: number, 
    challengesCompleted: number, 
    levelUp: () => void,  //tipando levelUp como funcao
    startNewChallenge: () => void,
    activeChallenge:  Challenge, //tipo objeto
    resetChallenge: () => void,
    experienceToNextLevel: number,
    completeChalleng: () => void
}

interface ChallengesProviderProps{
    children: ReactNode
}
//as ChallengesContexData esta tipando o context 
export const ChallengesContext = createContext({} as ChallengesContexData);

export function ChallengesProvider({children}: ChallengesProviderProps){ //desestruturar a props e pegar o children
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge,setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2 ) //calculo para dificuldade

    useEffect(() =>{
        Notification.requestPermission();
    },[])

    function levelUp(){
      setLevel(level + 1);
    }

    //para inicar um novo desafio
    function startNewChallenge(){
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length) //.gloor para nao trazer numeros quebrados
       const challenge = challenges[randomChallengeIndex]

       setActiveChallenge(challenge)

    //ATIVAR NOTIFICACAO NO BROWSER       
       new Audio('/notification.mp3').play();  //AUDIO

       
       if(Notification.permission === 'granted'){
        new Notification('Novo desafio ',{
            body: `Valendo ${challenge.amount} XP!`
        })
       }

    }

    function resetChallenge(){
        setActiveChallenge(null)
    }
    function completeChalleng(){
        if(!activeChallenge){
            return;
        }
        const {amount} =  activeChallenge;

        let finalExperience = currentExperience + amount;
        //para subir de nivel
        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted +1);

    }

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted, 
                levelUp,
                startNewChallenge, 
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChalleng
            }}
        >  
             {children}
         </ChallengesContext.Provider>
    )
}