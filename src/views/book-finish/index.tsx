import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { IcurrentBook, IcurrentBookNotes, IcurrentBookQuote, IcurrentBookUpdateParam, IcurrentGroup, pageParam, StandardRes } from '../../types';
import { Button, Flex, Image, Input, List, Modal, Form, message, Select, Divider, Pagination, PaginationProps } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import FormItem from 'antd/es/form/FormItem';
import { queryGroupDetail } from '../../service/group/group';
import { addNewPost, addNewSubPost, deletePost, deleteSubPost, queryMainPost, querySubPost } from '../../service/comment/comment';

export interface IcurrentPageParam extends pageParam {
    bookId: string | undefined;
}

const BookDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [totalNum, setTotalNum] = useState<number>(0);
    const [groupBaseInfo, setGroupBaseInfo] = useState<IcurrentGroup[]>();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [data, setData] = useState<IcurrentBookNotes[]>([]);
    const [pageNumber, setPageNumber]= useState<number>(1);
    const navigate = useNavigate();
    
    const getMainPost = async() => {
        const res: StandardRes = await querySubPost({pageNum: pageNumber, pageSize: 10, id: id});
        setTotalNum(res?.data?.totalNum);
        setData(res?.data?.subPostList);
        setGroupBaseInfo(res?.data?.mainPost);
    }

    const onShowSizeChange : PaginationProps['onShowSizeChange'] = async (current: number) => {
        const param: any = {
            pageNum: current,
            pageSize: 10,
            id: id,
        }
        setPageNumber(current);
        const bookDatas: StandardRes = await querySubPost(param);
        setData(bookDatas?.data.mainPostList);
        setTotalNum(bookDatas?.data?.totalNum);
      };

    const handleOk = async () => {
        const res = await form.validateFields();
        const addRes: StandardRes = await addNewSubPost({postId: id, description: res?.description});
        message.success(addRes.message);
        setIsShowModal(false);
        getMainPost();
    }



    const handleDelete = async (postId: string) => {
        const res: StandardRes = await deleteSubPost({id: postId});
        message.success(res.message);
        getMainPost();
    }

   
    useEffect(() => {
        getMainPost();
    }, [])
    return (
        <div>
            {/* <Divider orientation="left" style={{fontSize: 30}}>{groupBaseInfo?.description}</Divider> */}
            <div style={{fontSize: 30}}>Post:</div>
            <List
                style={{width: '100%'}}
                dataSource={groupBaseInfo}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    title={<a style={{fontSize: 24}}>{item.description}</a>}
                    description={`created by: ${item.userName}`}
                    />
                    {item.canDelete && <Button onClick={() => handleDelete(item?.id)}>Delete</Button>}
                </List.Item>
                )}
            />
            
            {/* <Flex> */}
            
            {/* <div className={styles.bookInfo}> */}
            <div style={{fontSize: 30}}>Comments:</div>
            <List
                style={{width: '100%'}}
                dataSource={data}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    title={<a>{item.description}</a>}
                    description={`created by: ${item.userName}`}
                    />
                    {item.canDelete && <Button onClick={() => handleDelete(item?.id)}>Delete</Button>}
                </List.Item>
                )}
            />
            <Button type='primary' onClick={() => setIsShowModal(true)}>Add A New Comment</Button>
            {/* </div> */}
            <Pagination
                    style={{position:'fixed', bottom: 15}}
                    // showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={totalNum}
                    onChange={onShowSizeChange}
            />
            {/* </Flex> */}
            <Modal
                title="Add A New Comment"
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