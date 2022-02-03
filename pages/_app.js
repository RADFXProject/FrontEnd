import '@/styles/globals.css'
import {React, useContext} from 'react'
import { InfoProvider } from './globals.js';
import Home from "./index.js";
import { useRouter } from "next/router";
//import { AppState } from "components/app-state"; 

function MyApp({ Component, pageProps }) {
    //const appState = useContext(AppState);
    //const user = appState.user;
    //const role = user.role;
    /*let allowed = true;
    const router = useRouter();
    if (router.pathname.startsWith("/integrator") && role !== "integrator") {
      allowed = false;
    }
    if (router.pathname.startsWith("/tester") && role !== "tester") {
      allowed = false;
    }
    const ComponentToRender = allowed ? Component : Home; 
    return <ComponentToRender {...pageProps} />*/
    return (
      <InfoProvider>
        <Component {...pageProps} />
      </InfoProvider>
      
    ); 
}

export default MyApp
