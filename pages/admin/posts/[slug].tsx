import {getAllPosts, getPostBySlug, updatePost} from "../../../lib/api";
import * as React from 'react';
import PostType from "../../../interfaces/post";
import {AdminLayout} from "../../../components/admin-layout";
import {PostEditor} from "../../../components/post-editor";
import {message} from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Post (props) {
    const router = useRouter()
    const [post, setPost] = useState<PostType>();
    const { slug } = router.query
    useEffect(() => {
        getPostBySlug(slug as string, [
            'title',
            'created_at',
            'id',
            'excerpt',
            'content',
            'picture',
        ])
            .then(data => {
                setPost(data)
            })
    }, [])

    const submit = async function (post: PostType) {
        const {error} = await updatePost(post)
        if (error) {
            message.error(error.message)
        } else {
            message.success('博客修改成功');
            router.push('/admin')
        }
    }

    return (
        <AdminLayout>
            <PostEditor onSubmit={submit} post={post}></PostEditor>
        </AdminLayout>
    );
};

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: Params) {
    return {
        props: {},
        revalidate: 60,
    }
}


export async function getStaticPaths() {
    const posts = await getAllPosts(['id'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: 'blocking',
    }
}
