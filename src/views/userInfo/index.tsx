import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Space, Row, Col, Divider } from 'antd';
import styles from './index.module.scss';
import axios from 'axios';
import { getUserInfo } from '../../service/comment';
import { IcurrentUser } from '../../types';
import SignIn from './components/sign-in';
import { logout, queryUserInfo } from '../../service/user/user';
import moment from 'moment';
import ToDoList from './components/to-do-list';
import { removeCookie } from 'typescript-cookie';
import { removeRoles, removeToken } from '../../utils/token';
import { Navigate, useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<IcurrentUser|null>();
    const [signInText, setSignInText] = useState<string>(' Sign In ');
    const getUserProfile = async () => {
            const UserInfo = await queryUserInfo();
            setUserInfo(UserInfo.data);
    }
    const getSignInData = async (month: string) => {
        // const res = await getSignIn({monthSelected: month});
        // if(res.data.length > 0) {
        //     setSignInText(' Already Signed In');
        // }
    }
    useEffect(() => {
        getUserProfile();
        getSignInData(moment().format('YYYY-MM-DD'));
    }, [])
    const handleSignIn = async () => {
        if(signInText !== ' Sign In ') {
            return ;
        }
        // const signInRes = await signIn();
        getSignInData(moment().format('YYYY-MM-DD'))
        // message.success(signInRes.data);
    }
    return (
        <div className={styles.logIn}>
            <Divider orientation="left" style={{fontSize: 30}}>User Info</Divider>
           <div>
                <Row>
                    <Col span={6}>
                        User Name: {userInfo?.username}
                    </Col>
                    <Col span={6}>
                        Email: {userInfo?.email}
                    </Col>
                    <Col span={6}>
                        Roles: {userInfo?.roles.join(' ')}
                    </Col>
                    <Col span={6}>
                        <Button>Edit</Button>
                    </Col>
                    <Col span={6}>
                        <Button onClick={async () => {
                            await logout();
                            removeToken();
                            removeRoles();
                            navigate("/loginIn")
                        }}>log out</Button>
                    </Col>
                </Row>
           </div>
        </div>
    )
}

export default UserInfo;