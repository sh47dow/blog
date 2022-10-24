// @flow
import * as React from 'react';
import {message} from "antd";
import {supabase} from "../../../utils/supabase";
import PostType from "../../../interfaces/post";
import {useRouter} from "next/router";
import {AdminLayout} from "../../../components/admin-layout";
import {PostEditor} from "../../../components/post-editor";
import {createPost} from "../../../lib/api";
type Props = {

};


export default function CreatePost(props: Props) {
    const router = useRouter();

    const submit = async function (post: PostType) {
        const {data, error} = await createPost(post)
        if (error) {
            message.error(error.message)
        } else {
            message.success('博客发布成功');
            router.push('/admin')
        }
    }

    return (
        <AdminLayout>
            <PostEditor onSubmit={submit}></PostEditor>
        </AdminLayout>
    );
};
