import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import * as request from '~/utils/request';

const { Title } = Typography;
const { TextArea } = Input;

function Quiz() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;
    var userId = user?.userId;
    const [content, setContent] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [trueAnswer, setTrueAnswer] = useState(0);
    const { questionId } = useParams();
    const { chapterId } = useParams();
    const { courseId } = useParams();
    const { assignmentId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });

    const handleChangeContent = (event) => {
        setContent(event.currentTarget.value);
    };

    const handleChangeAnswerA = (event) => {
        setAnswerA(event.currentTarget.value);
    };

    const handleChangeAnswerB = (event) => {
        setAnswerB(event.currentTarget.value);
    };

    const handleChangeAnswerC = (event) => {
        setAnswerC(event.currentTarget.value);
    };

    const handleChangeAnswerD = (event) => {
        setAnswerD(event.currentTarget.value);
    };

    const handleChange = (value) => {
        if (value === 'answerA') {
            setTrueAnswer(answerA);
        } else if (value === 'answerB') {
            setTrueAnswer(answerB);
        } else if (value === 'answerC') {
            setTrueAnswer(answerC);
        } else {
            setTrueAnswer(answerD);
        }
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
                        const loadData = await request.get('Question/' + questionId);
                        setContent(loadData.content);
                        setAnswerA(loadData.answerA);
                        setAnswerB(loadData.answerB);
                        setAnswerC(loadData.answerC);
                        setAnswerD(loadData.answerD);
                        setTrueAnswer(loadData.trueAnswer);
                        form.setFieldsValue({
                            content: loadData.content,
                            answerA: loadData.answerA,
                            answerB: loadData.answerB,
                            answerC: loadData.answerC,
                            answerD: loadData.answerD,
                        });
                    } else{
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
            questionId: questionId,
            assignmentId: assignmentId,
            content: content,
            answerA: answerA,
            answerB: answerB,
            answerC: answerC,
            answerD: answerD,
            trueAnswer: trueAnswer,
        };
        const res = async () => {
            const putData = await request.put('Question/' + questionId, options);
        };
        res();
        navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId + '/EditAssignment/' + assignmentId);
    };

    const onCancel = () => {
        navigate('/Courses/EditCourse/' + courseId + '/EditChapter/' + chapterId + '/EditAssignment/' + assignmentId);
    };

    if (loader) return <h3>Loading...</h3>;
    if (error.status) return <h3>Error: {error.message}</h3>;

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Question</Title>
            </div>
            <Form
                onFinish={onSubmit}
                initialValues={{
                    remember: true,
                }}
                form={form}
                labelCol={{ span: 4 }}
            >
                <Form.Item
                    label="Content"
                    name={'content'}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your content',
                        },
                        { whitespace: true },
                        { min: 5 },
                    ]}
                >
                    <TextArea onChange={handleChangeContent} />
                </Form.Item>
                <Form.Item
                    label="Answer A"
                    name={'answerA'}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your answer A',
                        },
                        { whitespace: true },
                        { min: 1 },
                    ]}
                >
                    <Input onChange={handleChangeAnswerA} />
                </Form.Item>
                <Form.Item
                    label="Answer B"
                    name={'answerB'}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your answer B',
                        },
                        { whitespace: true },
                        { min: 1 },
                    ]}
                >
                    <Input onChange={handleChangeAnswerB} />
                </Form.Item>
                <Form.Item
                    label="Answer C"
                    name={'answerC'}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your answer C',
                        },
                        { whitespace: true },
                        { min: 1 },
                    ]}
                >
                    <Input onChange={handleChangeAnswerC} />
                </Form.Item>
                <Form.Item
                    label="Answer D"
                    name={'answerD'}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your answer D',
                        },
                        { whitespace: true },
                        { min: 1 },
                    ]}
                >
                    <Input onChange={handleChangeAnswerD} />
                </Form.Item>
                <Form.Item
                    label="True answer"
                    name={'trueAnswer'}
                    rules={[
                        {
                            required: true,
                            message: 'You must choose the right answer',
                        },
                    ]}
                >
                    <Select onChange={handleChange} name="True answer" placeholder="Please select true answer">
                        <Select.Option value="answerA">Answer A</Select.Option>
                        <Select.Option value="answerB">Answer B</Select.Option>
                        <Select.Option value="answerC">Answer C</Select.Option>
                        <Select.Option value="answerD">Answer D</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" size="large" htmlType="submit">
                    Submit
                </Button>
                <Button
                    type="primary"
                    size="large"
                    onClick={onCancel}
                    style={{ backgroundColor: 'red', marginLeft: 30 }}
                >
                    Cancel
                </Button>
            </Form>
        </div>
    );
}

export default Quiz;
