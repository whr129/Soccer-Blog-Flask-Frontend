import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import FormItem from 'antd/es/form/FormItem';
import Meta from 'antd/es/card/Meta';
import { Divider, List, Typography, Form, Input, DatePicker, Space, Table, Tag, Select, Button, message, Modal } from 'antd';
import type { PaginationProps, TableProps } from 'antd';
// import { addNewBook, queryBookData } from '../../service/book/book';
import { IcurrentGroup, IcurrentUser, StandardRes } from '../../types';
import { addGroup, addGroupAdmin, disableGroup, disableGroupAdmin, editGroup, queryGroupDetail, queryGroupList, updateGroupOwner } from '../../service/group/group';
import { getRoles } from "../../utils/token";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { getUserList } from '../../service/user/user';

const AddNew = () => {
    const [ roleList, setRoleList ] = useState<Array<string>>()
    const [groupList, setGroupList] = useState<Array<IcurrentGroup>>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowModalRole, setIsShowModalRole] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [roleForm] = Form.useForm();
    const [adminsForm] = Form.useForm();
    const [groupForm] = Form.useForm();
    const [totalNum, setTotalNum] = useState<number>(0);
    const [isOwner, setIsOwner ]= useState<boolean | undefined>(false);
    const [groupDetail, setGroupDetail] = useState<IcurrentGroup>();
    const [options, setOptions] = useState<Array<IcurrentUser>>();
    const [isAddModal, setIsAddModal] = useState<boolean>(false);
    const [isAddGroup, setIsAddGroup] = useState<boolean>(false);

    const getOptions = async () => {
        const toDoData = await getUserList({});
        setOptions(toDoData.data?.userList.map((item: IcurrentUser) => {
            return {
                value: item.id,
                label: item.userName,
            }
        }));
    }

    const { TextArea } = Input;

    const columns: TableProps<IcurrentGroup>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'groupName',
          key: 'groupName',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          render: (id) => <div>{id}</div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description) => <div>{description}</div>
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (code) => <div>{code}</div>
          },
          {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            render: (owner) => (
                <>
                    {owner && owner.length > 0 ? owner[0].userName : ""}
                </>
            )
        },
        {
            title: 'Admins',
            dataIndex: 'admin',
            key: 'admin',
            render: (admin, record) => (
                <>
                    {admin.map((item: IcurrentUser, index: number) => {
                        return <div>
                            {item.userName} <a onClick={async () => {
                                deleteGroupAdmin(item.userId, record.code);
                                getGroupData();
                                }}><CloseOutlined /></a>
                        </div>
                    })}
                    <a onClick={() => {
                        getGroupDetail(record.id);
                        setIsAddModal(true);
                    }}><PlusOutlined/></a>
                </>
            )
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
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              {roleList?.includes('ALL-ADMIN') && <a onClick={() => {
                onChangeStatus(record.status, record.id);
              }}>{record.status === 0 ? "Disable" : "Enable"}</a>}
              <a onClick={() => {
                getGroupDetail(record.id);
                setIsShowModal(true);
              }}>Edit</a>
              {roleList?.includes('ALL-ADMIN') && <a onClick={() => {
                getGroupDetail(record.id);
                setIsShowModalRole(true);
              }}>Update Owner</a>}
            </Space>
          ),
        },
      ];

    const getGroupData = async () => {
        const toDoData = await queryGroupList({pageNum: pageNumber, pageSize: 10});
        setTotalNum(toDoData.data?.totalNum);
        if(roleList?.includes('ALL-ADMIN')) {
            setGroupList(toDoData.data?.groupList);
        } else {
            const groupsFiltered: IcurrentGroup[] = toDoData.data?.groupList.filter((item: IcurrentGroup, index: number) => roleList?.includes(`${item.code}-A`));
            setGroupList(groupsFiltered);
        }
    }

    const getGroupDetail = async (id: string) => {
        const groupDetailData: StandardRes = await queryGroupDetail({id: id});
        setGroupDetail(groupDetailData.data);
        form.setFieldValue('groupName', groupDetailData.data?.groupName);
        form.setFieldValue('description', groupDetailData.data?.description);
        roleForm.setFieldValue('owner', groupDetailData.data?.owner[0].userId);
    }

    const onChange = (e) => {
        setPageNumber(e.current);
    };

    const onChangeStatus = async (status: number, groupId: string) => {
        await disableGroup({status: status === 1 ? 0 : 1, id: groupId});
        getGroupData();
    }

    const handleSubmit = async (id: string | undefined) => {
        const editData: any = await form.validateFields();
        await editGroup({id: id, name: editData?.groupName, description: editData?.description});
        setIsShowModal(false);
        getGroupData();
    }
    
    const handleUpdateOwner = async () => {
        const userId: any = await roleForm.validateFields();
        await updateGroupOwner({groupId: groupDetail?.id, userId: userId?.owner, code: groupDetail?.code});
        setIsShowModalRole(false);
        getGroupData();
    }

    const deleteGroupAdmin = async (userId: string, code: string) => {
        await disableGroupAdmin({userId: userId, code: code});
    }

    const handleAddAdmin = async () => {
        const userId: any = await adminsForm.validateFields();
        console.log(userId);
        await addGroupAdmin({userId: userId?.admin, groupId: groupDetail?.id, code: groupDetail?.code});
        setIsAddModal(false);
        getGroupData();
    }

    const handleAddGroup = async () => {
        const groupData = await groupForm.validateFields();
        const res: StandardRes = await addGroup(groupData);
        message.success(res.message);
        setIsAddGroup(false);
        getGroupData();
    }
    
    useEffect(() => {
        getGroupData();
        const roles: string | undefined = getRoles();
        setRoleList(roles?.split(','));
        const owner: boolean | undefined = roles?.split(',').some(element => element.includes('-A'));
        setIsOwner(owner);
        getOptions();
    }, [pageNumber])
        
    
    return (
        <div className={styles.wrap}>
            <Divider orientation="left" style={{fontSize: 30}}>Group Management</Divider>
            <Button type='primary' style={{marginBottom: 10}} onClick={() => setIsAddGroup(true)}>Add New Group</Button>
            <Table 
            dataSource={groupList} 
            columns={columns}
            virtual
            pagination={{
                current: pageNumber,
                total: totalNum
            }}
            onChange={onChange}
            scroll={{ x: 1100}}></Table>
            <Modal
                title="Edit Group"
                onCancel={() => setIsShowModal(false)}
                open={isShowModal}
                onOk={() => handleSubmit(groupDetail?.id)}>
                    <Form
                        form={form}>
                        <Form.Item
                            name="groupName" label="group name">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="description" label="description">
                            <TextArea></TextArea>
                        </Form.Item>
                    </Form>
            </Modal>
            <Modal
                title="Update Owner"
                onCancel={() => setIsShowModalRole(false)}
                open={isShowModalRole}
                onOk={() => handleUpdateOwner()}>
                    <Form
                        form={roleForm}>
                        <Form.Item
                            name="owner" label="owner name">
                            <Select options={options}></Select>
                        </Form.Item>
                    </Form>
            </Modal>
            <Modal
                title="Add admin"
                onCancel={() => setIsAddModal(false)}
                open={isAddModal}
                onOk={() => handleAddAdmin()}>
                    <Form
                        form={adminsForm}>
                        <Form.Item
                            name="admin" label="admin name">
                            <Select options={options}></Select>
                        </Form.Item>
                    </Form>
            </Modal>
            <Modal
                title="Add Group"
                onCancel={() => setIsAddGroup(false)}
                open={isAddGroup}
                onOk={() => handleAddGroup()}>
                    <Form
                        form={groupForm}>
                        <Form.Item
                            name="name" label="Group Name">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="description" label="Description">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name="code" label="Code">
                            <Input></Input>
                        </Form.Item>
                        {/* <Form.Item
                            name="picUrl" label="Pic Url">
                            <Select options={options}></Select>
                        </Form.Item> */}
                    </Form>
            </Modal>
        </div>
    )
}

export default AddNew;