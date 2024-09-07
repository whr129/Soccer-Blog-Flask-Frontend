import React, { useEffect, useState } from 'react';
import { Divider, List, Typography, Form, Input, DatePicker, Space, Table, Tag, Select, Button, message, Modal } from 'antd';
import styles from './index.module.scss';
import type { DatePickerProps, TableProps } from 'antd';
import moment from 'moment';
import ButtonGroup from 'antd/es/button/button-group';
import { changeUserStatus, editUserRoles, getRoleList, getUserList } from '../../service/user/user';
import { IcurrentRole, IcurrentSchedule, IcurrentUser} from '../../types';
import dayjs, { Dayjs } from 'dayjs';


const ToDoListPage = () => {
    const onChangeStatus = async (status: number, userId: string) => {
        await changeUserStatus({status: status === 1 ? 0 : 1, userId: userId});
        getToDoListData();
    }
    
    const [userList, setUserList] = useState<Array<IcurrentUser>>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalNum, setTotalNum] = useState<number>(0);
    const [options, setOptions] = useState<Array<IcurrentRole>>()
    const [form] = Form.useForm();
    const [modalform] = Form.useForm();
    const { TextArea } = Input;
    const [isEditModal, setIsEditModal] = useState<boolean>(false);

    const onChange = (e) => {
        console.log(e);
        setPageNumber(e.current);
    };

    const getToDoListData = async () => {
        const toDoData = await getUserList({pageNum: pageNumber, pageSize: 10});
        setTotalNum(toDoData.data?.totalNum);
        setUserList(toDoData.data?.userList);
    }

    const getRoleListData = async () => {
        const roleListData = await getRoleList();
        setOptions(roleListData?.data);
    }

    const handleOk = async () => {
      const res = await form.validateFields();
      console.log(res.userId);
      const updateRes = await editUserRoles({
          userId: res.userId,
          roles: res.roles,
      });
      message.success(updateRes.message);
      setIsEditModal(false);
      getToDoListData();
    }

      const columns: TableProps<IcurrentUser>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'userName',
          key: 'userName',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          render: (id) => <div>{id}</div>
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <>
                    {status === 0 ? "acitve" : "disabled" }
                </>
            )
          },
        {
          title: 'Role',
          key: 'roles',
          dataIndex: 'roles',
          render: (_, { roles }) => (
            <>
              {roles.map((role: string) => {
                return (
                  <Tag>
                    {role.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() => {
                setIsEditModal(true);
                const role: Array<string> | undefined = options?.filter(item => record.roles.includes(item.code)).map(item => {
                    return item.id;
                });
                form.setFieldValue("userId", record.id);
                form.setFieldValue("roles", role);
                }}>Role management</a>
              <a onClick={() => {
                onChangeStatus(record.status, record.id);
              }}>{record.status === 0 ? "Disable" : "Enable"}</a>
            </Space>
          ),
        },
      ];
      
      useEffect(() => {
        getToDoListData();
        getRoleListData();
      }, [pageNumber])
    return (
        <div > 
            <Divider orientation="left" style={{fontSize: 30}}>User ManageMent</Divider>
            <Table 
                dataSource={userList} 
                columns={columns}
                virtual
                pagination={{
                    current: pageNumber,
                    total: totalNum
                }}
                onChange={onChange}
                scroll={{ x: 1000}}></Table>
                <Modal
                    open={isEditModal}
                    onOk={handleOk}
                    onCancel={() => setIsEditModal(false)}>
                        <Form
                            form={form}>
                            <Form.Item name="userId" hidden>
                            </Form.Item>
                            <Form.Item
                                name="roles">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    // defaultValue={[]}
                                    // onChange={handleChange}
                                    options={options}
                                    />
                            </Form.Item>
                        </Form>
                        
                </Modal>
        </div>
        
    )
}

export default ToDoListPage;