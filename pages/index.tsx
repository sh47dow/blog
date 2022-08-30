import Layout from '../components/layout'
import Head from 'next/head'
import Container from "../components/container";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MoreStories from "../components/more-stories";
import React from "react";
import Post from "../interfaces/post";
import {getAllPosts} from "../lib/api";
import {GetStaticPropsContext} from "next";

type Props = {
  allPosts: Post[]
}
export default function Index({ allPosts }: Props) {
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const allPosts = await getAllPosts([
    'title',
    'created_at',
    'id',
    'author',
    'picture',
    'excerpt',
  ])
  return {
    props: {
      allPosts,
    },
  }
}
