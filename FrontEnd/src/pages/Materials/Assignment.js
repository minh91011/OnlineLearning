import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import * as request from '~/utils/request';
import { useNavigate, useParams } from 'react-router-dom';
import routesConfig from '~/config/routes';
import './index.css';
const { confirm } = Modal;

function Assignment() {
    const navigate = useNavigate();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'assignmentId',
            key: 'assignmentId',
            className: 'hide',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editAssignment(record)} />
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
    const { chapterId } = useParams();
    const { courseId } = useParams();

    const showConfirm = (title, content, record) => {
        confirm({
          title: title,
          icon: <ExclamationCircleFilled />,
          content: content,
          onOk() {
            deleteAssignment(record)
          }
        });
      };

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter/GetAssignments/' + chapterId);
            setDataSource(loadData);
        };
        res();
    }, [num]);

    const addNewAssignment = () => {
        var options = {
            title: 'string',
            chapterId: chapterId,
        };
        const res = async () => {
            const postData = await request.post('Assignment', options);
            setNum(num + 1);
        };
        res();
    };

    const editAssignment = (record) => {
        navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId + '/EditAssignment/' + record.assignmentId);
    };

    const deleteAssignment = (record) => {
        const res = async () => {
            const delData = await request.del('Assignment/' + record.assignmentId);
            setNum(num + 1);
        };
        res();
    };


    return (
        <div>
            <h2>Assignment</h2>
            <Button onClick={addNewAssignment}>Add new Assignment</Button>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 3 }}
                rowKey={'assignmentId'}
            ></Table>
        </div>
    );
}

export default Assignment;
