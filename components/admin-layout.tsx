// @flow
import * as React from 'react';
import {Layout} from "antd";
import {useRouter} from "next/router";
const { Header, Footer, Content } = Layout;
type Props = {
    children: React.ReactNode
};
export const AdminLayout = (props: Props) => {
    const router = useRouter()
    return (
        <Layout>
            <Header>
                <h1 className="text-white cursor-pointer" onClick={() => router.push('/admin')}>
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </h1>
            </Header>
            <Content style={{padding: '0 50px'}} className="sm:mx-auto md:mx-60 bg-gray-50 min-h-screen">
                {props.children}
            </Content>
        </Layout>
    );
};
