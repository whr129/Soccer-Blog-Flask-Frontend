import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Space, Row, Col, Divider, Pagination, Card, PaginationProps, Flex } from 'antd';
import styles from './index.module.scss';
import axios from 'axios';
import { IcurrentBook, IcurrentBookParam, StandardRes } from '../../types';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { queryGroupList } from '../../service/group/group';

const BooksInProgress = () => {
    const [addNewBookModal, setAddNewBookModal] = useState<boolean>(false);
    const [totalNum, setTotalNum] = useState<number>(0);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState<Array<IcurrentBook>>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSizeNum, setPageSizeNum] = useState<number>(10);
    const [onOpenItem, setOnOpenItem] = useState<any>({});
    const handleSearch = async (pageNum: number, pageSize: number) => {
        // const res = await form.validateFields();
        const param: any = {
            pageNum: pageNum,
            pageSize: pageSize,
        }
        const bookDatas: StandardRes = await queryGroupList(param);
        setBookData(bookDatas?.data.groupList);
        setTotalNum(bookDatas?.data?.totalNum);
    }

    const onShowSizeChange : PaginationProps['onShowSizeChange'] = async (current: number) => {
        const param: any = {
            pageNum: current,
            pageSize: 10,
        }
        setPageNumber(current);
        const bookDatas: StandardRes = await queryGroupList(param);
        setBookData(bookDatas?.data.bookList);
        setTotalNum(bookDatas?.data?.total);
      };

    useEffect(() => {
        handleSearch(pageNumber, pageSizeNum);
    }, [])
    return (
        <div>
            <Divider orientation="left" style={{fontSize: 30}}>Groups</Divider>
            <div className={styles.wrap}>
                {/* <div>
                    <Button type='primary' onClick={() => setAddNewBookModal(true)}>Add New Book</Button>
                </div> */}
                <div className={styles.cardList}>
                    {bookData && bookData.map((item: any, index: number) => {
                        if(item.status === 0) {
                            return (
                                <Card
                                    hoverable
                                    style={{width: 190, height: 270, margin: "10px 10px 5px 20px" }} //flex: "1 0 calc(100% / 6)"</div></div>
                                    // style={{ width: 200, height: 100}}
                                    cover={<img width='120' height='140' style={{margin: '0px 0px 0px 0px'}} src={item.picUrl ? item.picUrl : ''} />}
                                    onClick={() => {
                                        navigate('/personal-center/group-detail/' + item.id);
                                    }}                                
                                >
                                <Meta title={item.groupName} description={
                            <div>
                                <div className={styles.author}>{item.description? item.description : 'unknow'}</div>
                            </div>} />
                            </Card>)
                        }
                            
                    })}
                </div>
                
                <Pagination
                    style={{position:'fixed', bottom: 15}}
                    // showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={totalNum}
                    onChange={onShowSizeChange}
            />
            </div>
            {/* <AddNewUnRead isOpen={addNewBookModal} setIsOpen={setAddNewBookModal} onOpenItem={onOpenItem} onSearch={handleSearch(pageNumber, pageSizeNum)}/> */}
        </div>
    )
}

export default BooksInProgress;