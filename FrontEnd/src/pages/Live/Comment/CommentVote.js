import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import * as request from "../../../utils/request";
export default function CommentVote(props) {
    const AddNewUpVote = () => {
        const response = async () => {
            const voteOption = {
                commentVoteId: 0,
                userId: props.userId,
                commentId: props.commentId,
                vote: true
            }
            const commentData = await request.post('commentVote', voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    const AddNewDownVote = () => {
        const response = async () => {
            const voteOption = {
                commentVoteId: 0,
                userId: props.userId,
                commentId: props.commentId,
                vote: false
            }
            const commentData = await request.post('commentVote', voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    const deleteVote = () => {
        const response = async () => {
            const deleteData = await request.del('commentVote/id?id=' + props.vote[0].commentVoteId)
            props.setNum(prev => prev+1)
            props.setIsVoted(prev => !prev)
            
        }
        response()
    }
    const updateUpvote = () => {
        const response = async () => {
            const voteOption={
                commentVoteId: props.vote[0].commentVoteId,
                userId: props.userId,
                commentId: props.commentId,
                vote: true
            }
            const putData = await request.put('/commentVote/' + props.vote[0].commentVoteId, voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    const updateDownvote = () => {
        const response = async () => {
            const voteOption={
                commentVoteId: props.vote[0].commentVoteId,
                userId: props.userId,
                commentId: props.commentId,
                vote: false
            }
            const putData = await request.put('/commentVote/' + props.vote[0].commentVoteId, voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }


    return (
        <div className="comment--vote">
            {!props.isVoted &&
                <div className="comment--vote">
                    <p className="comment--vote--number">{props.upvote}</p>
                    <button onClick={AddNewUpVote}>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="comment--vote--upvote"
                        />

                    </button>
                    <p className="comment--vote--number">{props.downvote}</p>
                    <button onClick={AddNewDownVote}>
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="comment--vote--downvote"
                        />

                    </button>
                </div>
            }
            {props.isVoted && props.vote[0].vote &&
                <div className="comment--vote">
                    <p className="comment--vote--number">{props.upvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="comment--vote--upvote blue"
                            onClick={deleteVote}
                        />

                    </button>
                    <p className="comment--vote--number">{props.downvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="comment--vote--downvote"
                            onClick={updateDownvote}
                        />

                    </button>
                </div>
            }
            {props.isVoted && !props.vote[0].vote &&
                <div className="comment--vote">
                    <p className="comment--vote--number">{props.upvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="comment--vote--upvote"
                            onClick={updateUpvote}
                        />

                    </button>
                    <p className="comment--vote--number">{props.downvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="comment--vote--downvote blue"
                            onClick={deleteVote}
                        />

                    </button>
                </div>
            }
        </div>
    )
}