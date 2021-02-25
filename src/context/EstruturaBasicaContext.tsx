

/* 
    MODELO PARA CONTEXT
*/

import { createContext, ReactNode } from "react";

interface CountDownContexData{

}

interface ChallengesProviderProps{
    children: ReactNode;
}
const CountDownContext = createContext({} as CountDownContexData)

export function CountDownProvider({children}: ChallengesProviderProps){
    
    return(
        <CountDownContext.Provider value={{}}>
            {children}
        </CountDownContext.Provider>
    )
}