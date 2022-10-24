// @flow
import * as React from 'react';
import {Button, List, message} from "antd";
import Post from "../../interfaces/post";
import {getAllPosts, removePost} from "../../lib/api";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import DateFormatter from "../../components/date-formatter";
import {AdminLayout} from "../../components/admin-layout";
import PostType from "../../interfaces/post";
import {useRouter} from "next/router";
import Link from "next/link";

type Props = {
    posts: Post[]
};

export default function AdminIndex(props: Props) {
    const {posts} = props;
    const router = useRouter()

    const deletePost = async (post: PostType) => {
        const {error} = await removePost(post.id)
        if (error) {
            message.error(error.message)
        } else {
            router.reload()
        }
    }

    const modifyPost = (item) => {
        router.push(`/admin/posts/${item.id}`)
    }

    return (
        <AdminLayout>
            <List
                itemLayout="vertical"
                pagination={{
                    pageSize: 5
                }}
                dataSource={posts}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button type="link" icon={<DeleteOutlined/>} onClick={() => deletePost(item)}></Button>,
                            <Button type="link" icon={<EditOutlined/>} onClick={() => modifyPost(item)}></Button>
                        ]}
                        extra={
                            <img width={272} height={150} alt="coverImage" src={item.picture}/>
                        }
                    >
                        <List.Item.Meta
                            title={
                                <a href={'/posts/' + item.id} target='_blank'>{item.title}</a>
                            }
                            description={<DateFormatter dateString={item.created_at} />}
                        />
                        {item.excerpt}
                    </List.Item>
                )}
                header={
                    <Link href="/admin/posts/create-post">
                        <a
                            className="w-full h-24 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100"

                        >
                            <PlusOutlined style={{fontSize: '24px'}}/>
                        </a>
                    </Link>
                }
            ></List>
        </AdminLayout>
        );
};

export async function getServerSideProps() {
    const posts = await getAllPosts([
        'title',
        'created_at',
        'id',
        // 'author',
        'picture',
        'excerpt',
    ])
    return {
        props: {
            posts,
        },
    }
}
