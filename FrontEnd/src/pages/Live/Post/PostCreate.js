import React, { useEffect } from 'react';
import * as request from '../../../utils/request';

export default function PostCreate(props) {
    let dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 7);
    const [postCreate, setPostCreate] = React.useState({
        userId: props.userId,
        title: '',
        content: '',
    });
    const requestOptions = {
        postId: 0,
        userId: postCreate.userId,
        title: postCreate.title,
        content: postCreate.content,
        date: dateNow,
        upvote: 0,
        downvote: 0,
    };
    function handleChange(event) {
        const { name, value } = event.target;
        return setPostCreate((prevPostCreate) => ({
            ...prevPostCreate,
            [name]: value,
        }));
    }

    const AddNewPost = () => {
        const response = async () => {
            const postData = await request.post('Post', requestOptions);
            setPostCreate((prev) => ({
                ...prev,
                title: '',
                content: '',
            }));
            alert('Created successfully');
        };
        response();
    };

    return (
        <div className="post--create">
            {props.userId !== 0 &&  
            <div className="post--create--form">
                <h2>Create new post</h2>

                <textarea
                    className="post--create--textArea title"
                    placeholder="Your post title ..."
                    name="title"
                    onChange={handleChange}
                    value={postCreate.title}
                />
                <textarea
                    className="post--create--textArea content"
                    placeholder="Your post content ..."
                    name="content"
                    onChange={handleChange}
                    value={postCreate.content}
                />
                {postCreate.content !== '' && postCreate.title !== '' && (
                    <button className="post--create--button" onClick={AddNewPost}>
                        <span>Create new post</span>
                    </button>
                )}
            </div>
            }
            {props.userId === 0 &&
                <div className="post--create--form" style={{color: 'red'}}>
                    You must login to create blog
                </div>
            }
        </div>
    );
}
