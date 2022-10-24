import { AppProps } from 'next/app'
import NextHead from 'next/head'
import '../styles/index.css'
import React, {useEffect, useState} from "react";
import {supabase} from "../utils/supabase";
import {Session, User} from "@supabase/gotrue-js";
import {eraseCookie, getCookie, setCookie} from "../utils/cookie";
import {useRouter} from "next/router";

export const UserContext = React.createContext<User | null>(null);

export default function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();
    useEffect(() => {
        const token = getCookie('_token')
        debugger
        if (token) {
            supabase.auth.getUser(token).then(({data, error}) => {
                setUser(data.user);
                if (router.route.split('/').includes('admin')) {
                    if (!(data.user && data.user.role === 'authenticated')) {
                        router.push('/admin/login')
                    }
                }
            })
        } else {
            setUser(null)
            if (router.route.split('/').includes('admin')) {
                router.push('/admin/login')
            }
        }
    }, [session])
    useEffect(() => {
      supabase.auth.onAuthStateChange((event, session) => {
          setSession(session);
          debugger;
          if (session) {
              setCookie('_token', session.access_token, session.expires_in);
              // document.cookie = `_token=${session.access_token}; expires=${session.expires_in}; path=/`;
          } else {
              eraseCookie('_token');
              router.push('/login');
          }
      })
    }, [])

  return (
      <>
          <NextHead>
              <meta name='viewport' content='with=device-width, initial-scale=1' />
          </NextHead>
          <UserContext.Provider value={user}>
            <Component {...pageProps} />
          </UserContext.Provider>
      </>
  )
}



