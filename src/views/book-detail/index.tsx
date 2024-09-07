import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { IcurrentBook, IcurrentBookNotes, IcurrentBookQuote, IcurrentBookUpdateParam, IcurrentGroup, pageParam, StandardRes } from '../../types';
import { Button, Flex, Image, Input, List, Modal, Form, message, Select, Divider, Pagination, PaginationProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import FormItem from 'antd/es/form/FormItem';
import { queryGroupDetail } from '../../service/group/group';
import { addNewPost, deletePost, queryMainPost } from '../../service/comment/comment';

export interface IcurrentPageParam extends pageParam {
    bookId: string | undefined;
}

const BookDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [totalNum, setTotalNum] = useState<number>(0);
    const [groupBaseInfo, setGroupBaseInfo] = useState<IcurrentGroup>();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [data, setData] = useState<IcurrentBookNotes[]>([]);
    const [pageNumber, setPageNumber]= useState<number>(1);
    const navigate = useNavigate();
    
    const getMainPost = async() => {
        const res: StandardRes = await queryMainPost({pageNum: pageNumber, pageSize: 10, groupId: id});
        setTotalNum(res?.data?.totalNum);
        setData(res?.data?.mainPostList);
    }

    const onShowSizeChange : PaginationProps['onShowSizeChange'] = async (current: number) => {
        const param: any = {
            pageNum: current,
            pageSize: 10,
            groupId: id,
        }
        setPageNumber(current);
        const bookDatas: StandardRes = await queryMainPost(param);
        setData(bookDatas?.data.mainPostList);
        setTotalNum(bookDatas?.data?.totalNum);
      };

    const handleOk = async () => {
        const res = await form.validateFields();
        const addRes: StandardRes = await addNewPost({groupId: id, description: res?.description});
        message.success(addRes.message);
        setIsShowModal(false);
        getMainPost();
    }


    const getBaseInfo = async () => {
        const res: StandardRes = await queryGroupDetail({id: id});
        setGroupBaseInfo(res?.data);
    }

    const handleDelete = async (postId: string) => {
        const res: StandardRes = await deletePost({id: postId});
        message.success(res.message);
        getMainPost();
    }

   
    useEffect(() => {
        getBaseInfo();
        getMainPost();
    }, [])
    return (
        <div>
            <Divider orientation="left" style={{fontSize: 30}}>{groupBaseInfo?.groupName}</Divider>
            <Button type='primary' onClick={() => setIsShowModal(true)}>Add A New Post</Button>
            <Flex>
            
            {/* <div className={styles.bookInfo}> */}
            <List
                style={{width: '100%'}}
                dataSource={data}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    title={<a onClick={() => navigate("/personal-center/post-detail/" + item.id)}>{item.description}</a>}
                    description={`created by: ${item.userName}`}
                    />
                    {item.canDelete && <Button onClick={() => handleDelete(item?.id)}>Delete</Button>}
                </List.Item>
                )}
            />
            {/* </div> */}
            <Pagination
                    style={{position:'fixed', bottom: 15}}
                    // showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={totalNum}
                    onChange={onShowSizeChange}
            />
            </Flex>
            <Modal
                title="Add A New Post"
                open={isShowModal}
                onCancel={() => setIsShowModal(false)}
                onOk={() => handleOk()}
                >
                <Form
                    form={form}>
                        <Form.Item
                            name='description'>
                            <TextArea></TextArea>
                        </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default BookDetail;