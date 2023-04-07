
import "./Comment.css"
import * as request from "../../../utils/request";
import ReadMoreLess from "../ReadMoreLess";
import React from "react";
import CommentVote from "./CommentVote";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function IndividualComment(props) {
    // get user info
    const [user, setUser] = React.useState({})
    React.useEffect(() => {
        const response = async () => {
            const loadData = await request.get('User/getUserById?id='+props.userId)
            setUser(loadData)
        }
        response()
    }, [])

    //Hover item setting
    const items = [
        {
            key: '1',
            label: (
                <button className="comment--setting--button" onClick={() => deleteComment(props)}>🗑️</button>
            ),
        },
        {
            key: '2',
            label: (
                <button className="comment--setting--button" onClick={toggleUpdate}>🖊️</button>

            ),
        },
    ];
    //delete comment
    const deleteComment = (props) => {
        const response = async () => {
            const deleteData = await request.del('Comment/id?id=' + props.commentId)
            props.setNum(prev => prev + 1)
        }
        response()
    }

    //update comment
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [requestOption, setRequestOption] = React.useState({
        commentId: props.commentId,
        userId: props.userId,
        postId: props.postId,
        content: props.content,
        date: props.date,
        upvote: props.upvote,
        downvote: props.downvote
    })
    const updateComment = (props) => {
        const response = async () => {
            const putData = await request.put('/Comment/' + props.commentId, requestOption)
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
        const [vote, setVote] = React.useState(null)
        React.useEffect(() => {
            const response = async () => {
                const loadData = await request.get('CommentVote/userId && commentId?userId=' + props.userIdLogin + '&commentId=' + props.commentId)
                if (loadData.length !== 0) {
                    setVote(loadData)
                    setIsVoted(true)
                }
            }
            response()
        },[props.num]);  
    // formatting date
    const date = props.date.split("T")
    return (
        <div>
            <p className="comment--date"> created by {user.username} on {date[0]} {date[1]}</p>
            <div className="comment--body">
                <img src={user.image} className="comment--image" alt="User" />
                <div className="comment--content">

                    {isUpdating ?
                        <textarea
                            className="update--content" // style at post.css
                            name="content"
                            onChange={handleChange}
                            value={requestOption.content}
                        /> :
                        <ReadMoreLess
                            text={props.content}
                            limit={200}
                        />}

                    <div className="comment--vote">
                        <CommentVote
                        userId = {props.userIdLogin}
                        commentId = {props.commentId}
                        upvote = {props.upvote}
                        downvote = {props.downvote}
                        isVoted = {isVoted}
                        vote = {vote}
                        setNum = {value => props.setNum(value)}
                        setIsVoted = {value => setIsVoted(value)}
                        />
                        
                        {isUpdating &&
                            <button
                                onClick={() => {
                                    updateComment(props)
                                    toggleUpdate()
                                }}>
                                Commit change</button>}
                    </div>
                </div>
                {props.userId === props.userIdLogin &&
                
                    <Dropdown
                        className="comment--setting"
                        menu={{ items }}
                        placement="bottomRight"
                        arrow={{ pointAtCenter: true }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>⚙️<DownOutlined /> </Space>
                        </a>
                    </Dropdown>
                }

                
            </div>
        </div>
    )
}