import React, {useContext, useState} from 'react';
import {GetServerSidePropsContext} from "next";
import {getAllPosts} from "../lib/api";
import Layout from "../components/layout";
import Head from "next/head";
import Container from "../components/container";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import Post from "../interfaces/post";
import {supabase} from '../utils/supabase';

type Props = {
    allPosts: Post[]
}

function Overview({ allPosts }: Props) {
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)

    return (
        <>
            <Layout>
                <Head>
                    <title>流水账</title>
                </Head>
                <Container>
                    <Intro />
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            picture={heroPost.picture}
                            content={heroPost.created_at}
                            author={heroPost.author}
                            slug={heroPost.id}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </Container>
            </Layout>
        </>
    );
}

export default Overview;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {user} = await supabase.auth.api.getUserByCookie(context.req)

    if (!user) return {props: {}, redirect: {destination: '/login', permanent: false}}

    const allPosts = await getAllPosts([
        'title',
        'created_at',
        'id',
        'author',
        'picture',
        'excerpt',
    ])

    return {
        props: { allPosts }
    }
}
