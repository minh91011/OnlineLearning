import React, { useEffect, useState } from 'react';
import { Input, Button, Form, message } from 'antd';

import Lessions from './Lessions';
import Assignment from './Assignment';
import { useParams, useNavigate } from 'react-router-dom';
import * as request from '~/utils/request';

function Chapters() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;
    var userId = user?.userId;
    const [chapterName, setChapterName] = useState('');
    const handleChangeChapterName = (event) => {
        setChapterName(event.currentTarget.value);
    };
    const { chapterId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });

    useEffect(() => {
        if (role != 'teacher') {
            setError({ status: true, message: 'This url does not exist' });
        } else {
            setLoader(true);
            const res = async () => {
                try {
                    const loadCoure = await request.get('Course/' + courseId);
                    if (loadCoure.userId === userId) {
                        const loadData = await request.get('Chapter/' + chapterId);
                        form.setFieldsValue({
                            chapterName: loadData.title,
                        });
                        setChapterName(loadData.title);
                    }else{
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
    }, []);

    const onSubmit = () => {
        var options = {
            chapterId: chapterId,
            title: chapterName,
            courseId: courseId,
        };
        const res = async () => {
            const putData = await request.put('Chapter/' + chapterId, options);
        };
        res();
        navigate('/Courses/Chapters/' + courseId);
    };

    const onCancel = () => {
        navigate('/Courses/Chapters/' + courseId);
    };

    if (loader) return <h3>Loading...</h3>;
    if (error.status) return <h3>Error: {error.message}</h3>;

    return (
        <Form
            style={{ padding: 30 }}
            onFinish={onSubmit}
            initialValues={{
                remember: true,
            }}
            form={form}
        >
            <Form.Item
                label="Chapter name"
                name={'chapterName'}
                rules={[
                    {
                        required: true,
                        message: 'Please enter your chapter name',
                    },
                    { whitespace: true },
                    { min: 5 },
                ]}
            >
                <Input onChange={handleChangeChapterName} />
            </Form.Item>
            <Lessions/>
            <Assignment/>
            <Button type="primary" size="large" htmlType="submit">
                Submit
            </Button>
            <Button type="primary" size="large" onClick={onCancel} style={{ backgroundColor: 'red', marginLeft: 30 }}>
                Cancel
            </Button>
        </Form>
    );
}

export default Chapters;
