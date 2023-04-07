import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import Dropzone from 'react-dropzone';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '~/firebase/firebase.js';
import * as postService from '~/apiServices/postServices.js';
const { Title } = Typography;
const { TextArea } = Input;

function InsertLession() {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [Description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const storage = getStorage(app);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file === null) {
            setError('Choose file');
            return;
        }
        if (title.trim() === '') {
            setError('Title must not empty');
            return;
        }

        setError('');
        try {
            // Generate a unique file name
            const uniqueId = Math.random().toString(36).substring(2, 9); // Generate a random string of length 9
            const modifiedFileName = `${uniqueId}_${Date.now()}_${file.name}`;

            // Upload the file to Firebase Storage
            const storageRef = ref(storage, modifiedFileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get the upload progress
                    const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //     console.log(`Upload is ${progress}% done`);
                    setProgress(pro);
                },
                (error) => {
                    console.error(error);
                },
                async () => {
                    // Get the download URL of the uploaded video file
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', url);
                    const material = {
                        chapterId,
                        title,
                        content: url,
                        description: Description,
                    };

                    const res = await postService.postLesson(material);
                    navigate(-1);
                },
            );
        } catch (error) {
            console.error(error);
        }
    };

    const onDrop = (acceptedFiles) => {
        // Set the selected file as state
        setFile(acceptedFiles[0]);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.currentTarget.value);
    };
    useEffect(() => {}, [progress, error]);
    const getMessage = () => {
        if (progress < 100) {
            return 'Saving';
        }
        return 'Saved';
    };
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Lession</Title>
            </div>

            <Form>
                <label>Cotent</label>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div
                                style={{
                                    width: '300px',
                                    height: '240px',
                                    border: '1px solid lightgray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {file ? (
                                    <div>
                                        <p>Selected file: {file.name}</p>
                                    </div>
                                ) : (
                                    <PlusOutlined style={{ fontSize: '3rem' }} />
                                )}
                                {/* <PlusOutlined style={{ fontSize: '3rem' }} /> */}
                            </div>
                        )}
                    </Dropzone>
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input onChange={handleChangeTitle} value={title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={handleChangeDescription} value={Description} />
                <br />
                <br />
                {progress ? (
                    <Progress percent={progress.toFixed(2)} format={() => getMessage()}>
                        Processing change
                    </Progress>
                ) : (
                    <></>
                )}

                {error && (
                    <div style={{ color: 'red', marginTop: 10 }}>
                        <CloseCircleOutlined style={{ marginRight: 5 }} />
                        {error}
                    </div>
                )}
                <Button type="primary" size="large" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default InsertLession;
