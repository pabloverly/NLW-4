import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal/LevelUpModal';

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
    completeChalleng: () => void,
    closeLevelUpModal: () => void,
}

interface ChallengesProviderProps{
    children: ReactNode
    level: number
    currentExperience:  number 
    challengesCompleted: number
}

interface HomeProps {
    level: number
    currentExperience:  number 
    challengesCompleted: number
  }
  
//as ChallengesContexData esta tipando o context 
export const ChallengesContext = createContext({} as ChallengesContexData);

//...rest seguinifica que esta passando tudo que estiver disponivel fora o children pra a propriedade rest que foi o nome dado 
export function ChallengesProvider({children, ...rest }: ChallengesProviderProps){ //desestruturar a props e pegar o children
    
    const [level, setLevel] = useState(rest.level ?? 1 ) //caso nao traca o cookie valor recebe 1
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge,setActiveChallenge] = useState(null)
    const [isLeveUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2 ) //calculo para dificuldade

    useEffect(() =>{
        Notification.requestPermission();
    },[])

    //GUARDAR EM COOKIES
    useEffect(() =>{
        Cookies.set('level', String (level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    },[level, currentExperience, challengesCompleted])

    function levelUp(){
      setLevel(level + 1);
      setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)

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
                completeChalleng,
                closeLevelUpModal,
            }}
        >  
             {children}
            {isLeveUpModalOpen && <LevelUpModal />}
         </ChallengesContext.Provider>
    )
}