import React from 'react'
import { List, Avatar } from 'antd';
import { RobotFilled, UserOutlined } from '@ant-design/icons';
import './message.less';

function Message(props) {

    const AvatarSrc = props.who === 'bot' ? <RobotFilled /> : <UserOutlined />;
    const role = props.who;

    return (
        role === 'user' ? <List.Item className='user-chat' style={{ padding: '1rem' }}>
            <List.Item.Meta
                avatar={<Avatar icon={AvatarSrc} />}
                title={props.who}
                description={props.text}
            />
        </List.Item> : <List.Item style={{ padding: '1rem' }}>
            <List.Item.Meta
                avatar={<Avatar icon={AvatarSrc} />}
                title={props.who}
                description={props.text}
            />
        </List.Item>
        // role && <div></div>
    )
}

export default Message
