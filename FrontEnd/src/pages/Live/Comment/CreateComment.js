import React from "react";
import * as request from "../../../utils/request";

export default function CreateComment(props) {

    let dateNow = new Date()
    dateNow.setHours(dateNow.getHours()+7)
    const [commentCreate, setCommentCreate] = React.useState({
        userId: props.userId,
        content: ""
    })
    const requestOptions = {
        commentId: 0,
        userId: commentCreate.userId,
        PostId: props.postId,
        content: commentCreate.content,
        date: dateNow,
        upvote: 0,
        downvote: 0
    }
    function handleChange(event) {
        const { name, value } = event.target
        return setCommentCreate(prevCommentCreate => ({
            ...prevCommentCreate,
            [name]: value
        }))
    }

    const AddNewComment = () => {
        const response = async () => {
            const CommentData = await request.post('Comment', requestOptions)
            props.setNum(prev => prev + 1)
            setCommentCreate(prev => ({
                ...prev,
                content: ""
            }))
        }
        response()
    }

    return (
        <div className="comment--create--form">
            <textarea
                className="comment--create--textArea"
                placeholder="Your comment ...."
                name="content"
                onChange={handleChange}
                value={commentCreate.content}
            />
            {commentCreate.content !== "" &&
                <button className="comment--create--button" onClick={AddNewComment}>
                    💬
                </button>

            }
        </div>
    )
}