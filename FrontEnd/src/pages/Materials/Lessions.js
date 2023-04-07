import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { app } from '~/firebase/firebase.js';
import { useNavigate, useParams } from 'react-router-dom';

import * as request from '~/utils/request';
const { confirm } = Modal;

function Lessions(props) {
    const navigate = useNavigate();
    const storage = getStorage(app);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'materialId',
            key: 'materialId',
            className: 'hide',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 100,
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editLession(record)} />
                        <DeleteOutlined
                            style={{ color: 'red', marginLeft: 25 }}
                            onClick={() => showConfirm('Do you Want to delete these items?', 'Some descriptions', record)}
                        />
                    </>
                );
            },
            key: 'action',   
        },
    ];
    const [dataSource, setDataSource] = useState();
    const [num, setNum] = useState(0);
    const { courseId } = useParams();
    const { chapterId } = useParams();

    const showConfirm = (title, content, record) => {
        confirm({
          title: title,
          icon: <ExclamationCircleFilled />,
          content: content,
          onOk() {
            deleteLession(record)
          }
        });
      };

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter/GetMaterials/' + chapterId);
            setDataSource(loadData);
        };
        res();
    }, [num]);

    const editLession = (record) => {
        navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId + '/EditLession/' + record.materialId);
    };

    const deleteLession = (record) => {
        const res = async () => {
            const delData = await request.del('Material/' + record.materialId);
            // Delete the file from Firebase Storage
            const storageRef = ref(storage, record.content);
            await deleteObject(storageRef);
            setNum(num + 1);
        };
        res();
    };

    return (
        <div>
            <h2>Lession</h2>
            <Button
                onClick={() => {
                    navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId + '/InsertLession');
                }}
            >
                Add new lession
            </Button>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey={'materialId'}></Table>
        </div>
    );
}

export default Lessions;
