import React from "react";
import ReadMoreLess from "../ReadMoreLess";
import "./Post.css"
import Comment from "../Comment/Comment";
import PostVote from "./PostVote"
import * as request from "../../../utils/request";

import { Dropdown, Space } from "antd";
import { UpOutlined } from "@ant-design/icons";
export default function Post(props) {
    // Get user info
    const [user, setUser] = React.useState({})
    React.useEffect(() => {
        const response = async () => {
            const loadData = await request.get('User/getUserById?id='+props.userId)
            setUser(loadData)
        }
        response()
    }, [])
    // hover setting
    const items = [
        {
            key: '1',
            label: (
                <button className="post--setting--button" onClick={() => deletePost(props)}> 🗑️ </button>
            ),
        },
        {
            key: '2',
            label: (
                <button className="post--setting--button" onClick={toggleUpdate} > 🖊️ </button>

            ),
        },
    ];

    // show proper date format
    const dateProps = props.date.split("T")

    // show comment
    const [isCommentShown, setIsCommentShown] = React.useState(false)
    function toggleComment() {
        setIsCommentShown(prev => !prev)
    }

    // delete api
    const deletePost = (props) => {
        const response = async () => {
            const deleteData = await request.del('Post/id?id=' + props.postId)
            props.setNum(prev => prev + 1)
        }
        response()
    }

    // update
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [requestOption, setRequestOption] = React.useState({
        postId: props.postId,
        userId: props.userId,
        title: props.title,
        content: props.content,
        date: props.date,
        upvote: props.upvote,
        downvote: props.downvote
    })
    // console.log(requestOption)
    const updatePost = (props) => {
        const response = async () => {
            const putData = await request.put('/Post/' + props.postId, requestOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    function handleChange(event) {
        const { name, value } = event.target
        return setRequestOption(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function toggleUpdate() {
        setIsUpdating(prev => !prev)
    }

    // voting system
    const [isVoted, setIsVoted] = React.useState(false)
    const [vote, setVote] = React.useState([])
    React.useEffect(() => {
        const response = async () => {
            const loadData = await request.get('PostVote/userId && postId?userId=' + props.userIdLogin + '&postId=' + props.postId)
            if (loadData.length !== 0) {
                setVote(loadData)
                setIsVoted(true)
            }
        }
        response()
    },[props.num]); 
    return (
        <div>
            <div className="post">
                <div className="post--header">
                    <div className="post--header--right">
                        <img src={user.image} className="post--user--image" alt="User" />
                        <div>
                            {isUpdating ?
                                <input
                                    type="text"
                                    className="post--title update--title"
                                    name="title"
                                    onChange={handleChange}
                                    value={requestOption.title}
                                /> :
                                <h2 className="post--title">{props.title}</h2>
                            }
                            <p className="post--date">created by {user.username} on {dateProps[0]} {dateProps[1]} </p>

                        </div>

                    </div>
                    {props.userId === props.userIdLogin &&
                        <Dropdown
                            className="post--setting"
                            menu={{ items }}
                            placement="topRight"
                            arrow={{ pointAtCenter: true }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space><button>⚙️</button><UpOutlined /> </Space>
                            </a>
                        </Dropdown>

                    }

                </div>
                <div className="post--body">
                    <div>
                        {isUpdating ?
                            <textarea
                                className="post--content update--content"
                                name="content"
                                onChange={handleChange}
                                value={requestOption.content}
                            /> :
                            <ReadMoreLess
                                text={props.content}
                                limit={150}
                            />}
                    </div>
                </div>
                <div className="post--footer">
                        <PostVote
                        userId = {props.userIdLogin}
                        postId = {props.postId}
                        upvote = {props.upvote}
                        downvote ={props.downvote}
                        isVoted = {isVoted}
                        vote = {vote}
                        setNum = {value => props.setNum(value)}
                        setIsVoted = {value => setIsVoted(value)}
                        />

                    {isUpdating &&
                        <button onClick={() => {
                            updatePost(props)
                            toggleUpdate()
                        }}>
                            Commit change</button>}
                    <div>
                        <button className="post--showComment" onClick={toggleComment}>
                            {isCommentShown ? "↑" : "↓"}
                        </button>
                    </div>
                </div>
            </div>
            <div className={isCommentShown ? "show" : "hide"}>
                <Comment postId={props.postId} userIdLogin={props.userIdLogin} />
                <button className="post--toggle--comment" onClick={toggleComment}> Hide comment </button>
            </div>
        </div>



    );
}