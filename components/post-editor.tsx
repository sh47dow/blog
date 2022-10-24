// @flow
import * as React from 'react';
import PostType from "../interfaces/post";
import { v4 as uuidv4 } from 'uuid';
import {Button, Input, Upload, UploadFile, UploadProps} from "antd";
import {LoadingOutlined, PlusOutlined, SendOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const ImgCrop = dynamic(() => import('antd-img-crop'), {ssr: false})
import "easymde/dist/easymde.min.css";
import {supabase} from "../utils/supabase";
import {RcFile} from "antd/es/upload";

type Props = {
    post?: PostType
    onSubmit: (data: PostType) => Promise<void>
};

export function PostEditor(props: Props) {
    const {post, onSubmit} = props;
    const [formData, setFormData] = useState<PostType>({
        id: uuidv4(),
        title: '',
        picture: '',
        excerpt: '',
        content: ''
    })
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const uploadProps: UploadProps = {
        accept: "image/*",
        name: "picture",
        listType: "picture-card",
        maxCount: 1,
        onChange({fileList}) {
            setFileList(fileList)
        },
        async customRequest({file, onError, onSuccess, onProgress}) {
            setLoading(true)
            const {data, error} = await supabase.storage.from('blog')
                .upload(`${(file as RcFile).uid}`, file)
            setLoading(false)
            if (error) {
                setFormData({...formData, picture: null})
                const err = new Error(error.message)
                onError(err)
            }
            if (data) {
                setFormData({...formData, picture: process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/blog/' + (file as RcFile).uid})
                onSuccess(data.path)
            }
        },

        async onPreview(file: UploadFile){
            let src = file.url as string;
            console.log(src)
            if (!src) {
                src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj as RcFile);
                    reader.onload = () => resolve(reader.result as string);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        }
    }
    useEffect(() => {
        if (post) {
            setFormData(post)
            setFileList([
                {
                    uid: post.id,
                    name: post.picture.split('/').pop(),
                    status: 'done',
                    url: post.picture
                }
            ])
        }
    }, [post])

    return (
        <>
            <div className="flex justify-between">
                <Input className="sm:w-full md:w-1/2" bordered={false} name="title" placeholder="请输入标题" size='large' autoFocus={true} value={formData.title} onChange={($event) => setFormData({...formData, title: $event.target.value})}/>
                <Button icon={<SendOutlined />} onClick={() => onSubmit(formData)}>发布</Button>
            </div>
            <Input className="w-full" bordered={false} placeholder="请输入摘要" name="excerpt" value={formData.excerpt} onChange={($event) => setFormData({...formData, excerpt: $event.target.value})}></Input>
            <ImgCrop aspect={1.5/1}>
                <Upload {...uploadProps} fileList={fileList}>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>上传封面</div>
                </Upload>
            </ImgCrop>
            <div className="border border-gray-300 rounded-md">
                <SimpleMDE value={formData.content} onChange={$event => setFormData({...formData, content: $event})}/>
            </div>
        </>
    );
};
