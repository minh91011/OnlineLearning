import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '~/firebase/firebase.js';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router-dom';
import * as request from '~/utils/request';

const { Title } = Typography;
const { TextArea } = Input;

function Lession() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [Description, setDescription] = useState('');
    const [ChapterId, setChapterId] = useState(0);
    const [content, setContent] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const { lessionId } = useParams();
    const storage = getStorage(app);
    const onDrop = (acceptedFiles) => {
        // Set the selected file as state
        setFile(acceptedFiles[0]);
    };
    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    };

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value);
    };
    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Material/' + lessionId);
            setTitle(loadData.title);
            setChapterId(loadData.chapterId);
            setDescription(loadData.description);
            setContent(loadData.content);
        };
        res();
    }, [lessionId]);

    useEffect(() => {}, [progress, error]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title.trim() === '') {
            setError('Title must not be null');
        }
        setError('');
        try {
            // Generate a unique file name
            const uniqueId = Math.random().toString(36).substring(2, 9); // Generate a random string of length 9
            const modifiedFileName =    `${uniqueId}_${Date.now()}_${file.name}`;
            // Upload the file to Firebase Storage
            const storageRef = ref(storage, modifiedFileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get the upload progress
                    const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log(Upload is ${progress}% done);
                    setProgress(pro);
                },
                (error) => {
                    console.error(error);
                },
                async () => {
                    // Get the download URL of the uploaded video file
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    if (content !== '') {
                        const oldFileRef = ref(storage, content);
                        try {
                            await deleteObject(oldFileRef);
                            console.log('Old file deleted successfully.');
                        } catch (error) {
                            console.error('Error deleting old file:', error);
                        }
                    }
                    var options = {
                        materialId: lessionId,
                        title: title,
                        chapterId: ChapterId,
                        content: url,
                        description: Description,
                    };
                    const res = async () => {
                        const putData = await request.put('Material/' + lessionId, options);
                    };
                    setContent(url);

                    res();
                },
            );
        } catch (error) {
            console.error(error);
        }
    };

    const getMessage = () => {
        if (progress < 100) {
            return 'Saving';
        }
        return 'Saved';
    };
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Edit Lession</Title>
            </div>

            <Form onSubmit={() => {}}>
                <label>Content</label>
                <ReactPlayer url={content} width="100%" controls />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
                                    <div style={{ width: '100%', overflowWrap: 'break-word' }}>{content}</div>
                                )}
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
                <TextArea onChange={handleChangeDecsription} value={Description} />
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

export default Lession;