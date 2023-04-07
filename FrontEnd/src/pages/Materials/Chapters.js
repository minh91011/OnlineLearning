import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import * as request from '~/utils/request';
import { useNavigate, useParams } from 'react-router-dom';

const { confirm } = Modal;

function Chapters() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'chapterId',
            key: 'chapterId',
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
                        <EditOutlined onClick={() => editChapter(record)} />
                        <DeleteOutlined
                            style={{ color: 'red', marginLeft: 25 }}
                            onClick={() =>
                                showConfirm('Do you Want to delete these items?', 'Some descriptions', record)
                            }
                        />
                    </>
                );
            },
            key: 'action',
        },
    ];
    const [dataSource, setDataSource] = useState();
    const [num, setNum] = useState(0);
    const navigate = useNavigate();
    const { courseId } = useParams();
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;
    var userId = user?.userId;
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });

    const showConfirm = (title, content, record) => {
        confirm({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: content,
            onOk() {
                deleteChapter(record);
            },
        });
    };

    useEffect(() => {
        if (role != 'teacher') {
            setError({ status: true, message: '404 not found' });
        } else {
            setLoader(true);
            const res = async () => {
                try {
                    const loadCoure = await request.get('Course/' + courseId);
                    if (loadCoure.userId === userId) {
                        const loadData = await request.get('Course/chapters/' + courseId);
                        setDataSource(loadData.data);
                    } else {
                        setError({ status: true, message: 'This course does not exist' });
                    }
                } catch (error) {
                    setError({ status: true, message: error.message });
                } finally {
                    setLoader(false);
                }
            };
            setTimeout(res, 500);
        }
    }, [num]);

    const addNewChapter = () => {
        var options = {
            title: 'string',
            courseId: courseId,
        };
        const res = async () => {
            const postData = await request.post('Chapter', options);
            setNum(num + 1);
        };
        res();
    };

    const editChapter = (record) => {
        navigate('/Courses/EditCourse/' + record.courseId + '/EditChapter/' + record.chapterId);
    };

    const deleteChapter = (record) => {
        const res = async () => {
            const delData = await request.del('Chapter/' + record.chapterId);
            setNum(num + 1);
        };
        res();
    };

    if (loader) return <h3>Loading...</h3>;
    if (error.status) return <h3>Error: {error.message}</h3>;

    return (
        <div style={{ padding: 30 }}>
            <h2>Chapter List</h2>
            <Button onClick={addNewChapter}>Add new chapter</Button>
            <Table columns={columns} dataSource={dataSource} style={{ height: 500 }} rowKey={'chapterId'}></Table>
            <Button type="primary" size="large" onClick={() => navigate('/createCourses')}>
                Submit
            </Button>
        </div>
    );
}

export default Chapters;
