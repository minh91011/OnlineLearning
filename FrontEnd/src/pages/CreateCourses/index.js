import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, message, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as postService from '~/apiServices/postServices.js';
import Tables from './Table';
import * as loadService from '~/apiServices/loadServices';
import { storeImageToFireBase } from '../../utils/storeImageToFirebase';
import { useNavigate } from 'react-router-dom';

function CreateCourses() {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourse();
            if (result) setCourses(result);
        };
        fetchApi();
    }, []);
    const [inputInfo, setInputInfo] = useState({
        courseName: '',
        price: '',
        description: '',
        status: 'save',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imageFront, setImageFront] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [form] = Form.useForm();
    const handleChange = (event) => {
        const { value, name } = event.target;
        setInputInfo({
            ...inputInfo,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    useEffect(
        () => {
            const uploadImage = async () => {
                setIsLoading(true);
                if (!selectedFile) {
                    setIsLoading(false);
                    return;
                }
                const { isSuccess, imageUrl, message } = await storeImageToFireBase(selectedFile);
                if (isSuccess) {
                    setImageFront(imageUrl);
                    setIsLoading(false);
                    return imageUrl;
                } else {
                    console.log(message);
                }
                setIsLoading(false);
            };
            uploadImage();
        },
        // eslint-disable-next-line
        [selectedFile],
    );
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };
    const deleteInfo = async (id) => {
        await postService.deleteCourse(id);
        setCourses(courses.filter((info) => info.courseId !== id));
    };
    const updateInfo = (info) => {
        setInputInfo({
            courseId: info.courseId,
            userId: info.userId,
            courseName: info.courseName,
            price: info.price,
            description: info.description,
            img: info.img,
            status: 'update',
        });
    };
    const submitForm = async () => {
        const validationResults = [];
        if (validationResults.includes(false)) {
            message.error('Please fill in all required fields!');
        } else if (validationResults.includes('email')) {
            message.error('Please recheck Email field!');
        } else if (validationResults.includes('price')) {
            message.error('Please recheck price field!');
        } else {
            message.success('Created new Ticket');
            if (inputInfo.status === 'save') {
                const course = {
                    courseId: 0,
                    userId,
                    courseName: inputInfo.courseName,
                    price: inputInfo.price,
                    img: '',
                    description: inputInfo.description,
                };
                const res = await postService.postCourse(course);
                setCourses([...[res], ...courses]);
            } else {
                const course = {
                    courseId: inputInfo.courseId,
                    userId: inputInfo.userId,
                    courseName: inputInfo.courseName,
                    price: inputInfo.price,
                    description: inputInfo.description,
                    img: imageFront !== '' ? '' : inputInfo.img,
                };
                await postService.putCourse(inputInfo.courseId, course);
                let indexUpdate = '';
                indexUpdate = courses.findIndex((info) => info.courseId === inputInfo.courseId);
                courses[indexUpdate] = course;
                setCourses(courses);
            }
            form.resetFields();
            setImageFront('');
            setInputInfo({
                courseName: '',
                price: '',
                description: '',
                status: 'save',
            });
        }
    };
    const customerInfo = () => {
        return (
            <div className="create-ticket-form-group">
                <Row gutter={[20, 0]}>
                    <Col span={12}>
                        <Form.Item label="courseName" required>
                            <Input
                                name="courseName"
                                value={inputInfo.courseName}
                                onChange={handleChange}
                                placeholder="courseName"
                            />
                        </Form.Item>
                        <Form.Item label="description" required>
                            <Input
                                name="description"
                                value={inputInfo.description}
                                onChange={handleChange}
                                placeholder="description"
                            />
                        </Form.Item>
                        <Form.Item label="price" required>
                            <Input name="price" value={inputInfo.price} onChange={handleChange} placeholder="price" />
                        </Form.Item>
                        <Button onClick={() => navigate('/Courses/Chapters/' + inputInfo.courseId)} type="primary" style={{ width: '25%', height: '40px', visibility: inputInfo.status === 'save' ? 'hidden' : 'visible' }}>
                            Add chapter
                        </Button>
                    </Col>
                    <Col span={12}>{rightLayout()}</Col>
                </Row>

                <div style={{ textAlign: '-webkit-right' }}>
                    <Button onClick={() => submitForm()} type="primary" style={{ width: '15%', height: '40px'} }>
                        {inputInfo.status === 'save' ? 'Create info' : 'Update info'}
                    </Button>
                </div>
            </div>
        );
    };
    const rightLayout = () => {
        return (
            <div className="create-info__right">
                <div className="create-right__info" style={{ textAlign: 'end' }}>
                    <Row gutter={[20, 0]}>
                        <Col span={12}>
                            {imageFront ? (
                                <img className="profile_card" src={imageFront} alt="" style={{ width: '200px' }} />
                            ) : (
                                <img
                                    className="profile_card"
                                    src="https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
                                    alt=""
                                    style={{ width: '200px' }}
                                />
                            )}
                            {isLoading ? (
                                <button
                                    type="button"
                                    disabled
                                    style={{
                                        opacity: '.4',
                                        width: '70%',
                                    }}
                                    className="chooseFileButton btn btn-primary btn--m"
                                >
                                    loading..
                                </button>
                            ) : (
                                <div>
                                    <button
                                        type="button"
                                        className="chooseFileButton btn btn-primary btn--m"
                                        style={{ width: '70%' }}
                                    >
                                        Chọn hình
                                    </button>
                                    <input
                                        type="file"
                                        name="profileImageUrl"
                                        accept="image/*"
                                        onChange={onSelectFile}
                                        id="upload"
                                        className="btn"
                                        style={{
                                            opacity: 0,
                                            zIndex: 1,
                                            left: 0,
                                            bottom: 0,
                                            width: '100%',
                                            position: 'absolute',
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    };
    return (
        <div className="create-info-container" style={{ marginLeft: '100px', marginTop: '50px' }}>
            <Card
                style={{
                    marginTop: 16,
                }}
                type="inner"
                title="CREATE COURSE"
            >
                <Form form={form} labelCol={{ span: 6, offset: 0 }} labelAlign="left" id="myForm">
                    <div className="info__content">
                        <div className="create-info__left">
                            <div className="create-left__first-info">
                                {' '}
                                {/* {rightLayout()} */}
                                {customerInfo()}
                            </div>
                        </div>
                    </div>
                </Form>
            </Card>
            <Card
                style={{
                    marginTop: 16,
                }}
                type="inner"
                title="TABLE COURSE"
            >
                <Tables courses={courses} deleteInfo={deleteInfo} updateInfo={updateInfo} />
            </Card>
        </div>
    );
}

export default CreateCourses;
