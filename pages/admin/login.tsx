// @flow
import * as React from 'react';
import {Button, Form, Input} from "antd";
import {supabase} from "../../utils/supabase";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../_app";
import {useRouter} from "next/router";

type Props = {

};

export default function Login(props: Props) {
    const [error, setError] = useState("");
    const [valid, setValid] = useState(true);
    const [form] = Form.useForm();
    const user = useContext(UserContext);
    const router = useRouter()
    useEffect(() => {
        if (user) {
            router.push("/admin");
        }
    }, [user]);
    const handleSubmit = async () => {
        const {error} = await supabase.auth.signInWithPassword({email: 'zhengruying@nimblex.cn', password: form.getFieldValue('password')})
        if (error) {
            setError(error.message)
            setValid(false)
        }

    }

    const onValueChange = (changedValues, values) => {
        if (form.getFieldError('password').length > 0) {
            setValid(false)
            setError('请输入密码')
        }  else {
            setValid(true)
            setError('')
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex justify-center items-center flex-col" style={{width: '200px'}}>
                <Form
                    form={form}
                    name="login"
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                    onFieldsChange={(changedValues, values) => onValueChange(changedValues, values)}
                >
                    <Form.Item name="password" rules={[{required: true}]} help={error} validateStatus={valid ? '' : 'error'}>

                        <Input.Password placeholder="输入密码"/>
                    </Form.Item>
                    <Form.Item
                        shouldUpdate
                    >
                        {({getFieldError}) => <Button type="primary" onClick={handleSubmit} disabled={!valid}>登陆</Button>}
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
