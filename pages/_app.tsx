import { AppProps } from 'next/app'
import NextHead from 'next/head'
import '../styles/index.css'
import React, {useEffect, useState} from "react";
import {supabase} from "../utils/supabase";
import {useRouter} from "next/router";

export const RoleContext = React.createContext<string | undefined>(undefined);

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
      fetch('/api/user').then(async res => {
        if (res.ok) {
            const user = await res.json()
            setRole(user.role);
        }
      });
    }, [])
    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            debugger;
            setRole(session?.user.role || null);
            await fetch('/api/cookie', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'same-origin',
                body: JSON.stringify({ event, session }),
            });
            if (event === 'SIGNED_IN') {
                return await router.push('/overview');
            }
            await router.push('/login');
        });
        return () => data?.unsubscribe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
    }

  return (
      <>
          <NextHead>
              <meta name='viewport' content='with=device-width, initial-scale=1' />
          </NextHead>
          <RoleContext.Provider value={role}>
            <Component {...pageProps} />
          </RoleContext.Provider>
          {role && <button className="fixed bottom-5 right-5 bg-stone-500 text-accent-1 rounded-md px-3 py-2" onClick={logout}>Leave</button>}

      </>
  )
}



