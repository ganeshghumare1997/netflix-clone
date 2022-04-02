import "../styles/globals.css";
import { magic } from "../lib/magic-client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userLoginStatus = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    try{
      userLoginStatus();
    }catch(error){
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    const handleComplete = () =>{
        setIsLoading(false);
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
        router.events.off("routeChangeComplete", handleComplete)
        router.events.off("routeChangeError", handleComplete);
    }
  }, [router])

  return isLoading ? <Loading /> : <Component {...pageProps} /> ;
}

export default MyApp;
