// @flow
import * as React from 'react';
import {Space} from "antd";

type Props = {
    icon: React.FC,
    text: string
};
export const IconText = ({icon, text}: Props) => {
    return (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
};
