import Footer from './footer'
import Meta from './meta'
import React, {useContext, useEffect} from "react";
import {UserContext} from "../pages/_app";
import {supabase} from "../utils/supabase";

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
    const user = useContext(UserContext)

    const logout = async () => {
        await supabase.auth.signOut();
    }

    return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
          {user && <button className="fixed bottom-5 right-5 bg-stone-500 text-accent-1 rounded-md px-3 py-2" onClick={logout}>Leave</button>}
      </div>
      <Footer />
    </>
  )
}

export default Layout
