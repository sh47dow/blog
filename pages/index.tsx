import Layout from '../components/layout'
import Head from 'next/head'
import {GetServerSidePropsContext} from "next";
import {supabase} from "../utils/supabase";


export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>流水账</title>
        </Head>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const {user} = await supabase.auth.api.getUserByCookie(context.req)
  if (user) {
    return {props: {}, redirect: {destination: '/overview', permanent: false}}
  } else {
    return {props: {}, redirect: {destination: '/login', permanent: false}}
  }
}
