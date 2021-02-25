import '../styles/global.css'
import { ChallengesProvider} from '../context/ChallengesContext'


function MyApp({ Component, pageProps }) {  

  return (
    // Provide torna public os acesso dentre os dados dos componetes /
   <ChallengesProvider>
       <Component {...pageProps} />
   </ChallengesProvider>    
  )
}

export default MyApp
