import {createContext, ReactNode, useState} from 'react'
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
    experienceToNextLevel: number
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

    function levelUp(){
      setLevel(level + 1);
    }

    //para inicar um novo desafio
    function startNewChallenge(){
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length) //.gloor para nao trazer numeros quebrados
       const challenge = challenges[randomChallengeIndex]

       setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
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
                experienceToNextLevel
            }}
        >  
             {children}
         </ChallengesContext.Provider>
    )
}