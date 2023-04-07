import React, { useEffect, useState } from 'react';
import Question from './Question';
import { Input, Button, Form } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import * as request from '~/utils/request';

function EditAssignment() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;
    var userId = user?.userId;
    const [assignmentName, setAssignmentName] = useState('');
    const { chapterId } = useParams();
    const { courseId } = useParams();
    const { assignmentId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });

    const handleChangeAssignmentName = (event) => {
        setAssignmentName(event.currentTarget.value);
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
                        const loadData = await request.get('Assignment/' + assignmentId);
                        setAssignmentName(loadData.title);
                        form.setFieldsValue({
                            assignmentName: loadData.title,
                        });
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
            assignmentId: assignmentId,
            title: assignmentName,
            chapterId: chapterId,
        };
        const res = async () => {
            const putData = await request.put('Assignment/' + assignmentId, options);
        };
        res();
        navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId);
    };

    const onCancel = () => {
        navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId);
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
                label="Assignment name"
                name={'assignmentName'}
                rules={[
                    {
                        required: true,
                        message: 'Please enter your assignment name',
                    },
                    { whitespace: true },
                    { min: 5 },
                ]}
            >
                <Input onChange={handleChangeAssignmentName} />
            </Form.Item>
            <Question />
            <Button type="primary" size="large" htmlType="submit">
                Submit
            </Button>
            <Button type="primary" size="large" onClick={onCancel} style={{ backgroundColor: 'red', marginLeft: 30 }}>
                Cancel
            </Button>
        </Form>
    );
}

export default EditAssignment;
