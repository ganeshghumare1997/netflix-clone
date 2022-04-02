import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import { useEffect } from "react";

const Login = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      if (email === "ganeshghumare1997@gmail.com") {
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            router.push("/");
          }
          console.log(didToken);
        } catch (error) {
          setIsLoading(false);
          // Handle errors if required!
          console.error("Something went wrong logging in", error);
        }
      } else {
        setIsLoading(false);
        setUserMsg("Something went wrong logging in");
      }
    } else {
        setIsLoading(false);
      setUserMsg("Enter a Valid Email Address");
    }
  };

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix Logo"
                  height="34px"
                  width="128px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email Address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>

          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
