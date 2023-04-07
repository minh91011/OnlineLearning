import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import * as request from "../../../utils/request";
export default function PostVote(props) {
    
    const AddNewUpVote = () => {
        
        const response = async () => {
            const voteOption = {
                postVoteId: 0,
                userId: props.userId,
                postId: props.postId,
                vote: true
            }
            const postData = await request.post('PostVote', voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    const AddNewDownVote = () => {
        const response = async () => {
            const voteOption = {
                postVoteId: 0,
                userId: props.userId,
                postId: props.postId,
                vote: false
            }
            const postData = await request.post('PostVote', voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    const deleteVote = () => {
        const response = async () => {
            const deleteData = await request.del('PostVote/id?id=' + props.vote[0].postVoteId)
            props.setNum(prev=> prev +1)
            props.setIsVoted(prev => !prev)
        }
        response()
    }
    const updateUpvote = () => {
        const response = async () => {
            const voteOption={
                postVoteId: props.vote[0].postVoteId,
                userId: props.userId,
                postId: props.postId,
                vote: true
            }
            const putData = await request.put('/PostVote/' + props.vote[0].postVoteId, voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }
    const updateDownvote = () => {
        const response = async () => {
            const voteOption={
                postVoteId: props.vote[0].postVoteId,
                userId: props.userId,
                postId: props.postId,
                vote: false
            }
            const putData = await request.put('/PostVote/' + props.vote[0].postVoteId, voteOption)
            props.setNum(prev => prev + 1)
        }
        response()
    }

    return (
        <div>
            {!props.isVoted &&
                <div className="post--vote">
                    <p className="post--vote number">{props.upvote}</p>
                    <button onClick={AddNewUpVote}>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="post--vote upvote"
                        />

                    </button>
                    <p className="post--vote number">{props.downvote}</p>
                    <button onClick={AddNewDownVote}>
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="post--vote downvote"
                        />

                    </button>
                </div>
            }
            {props.isVoted && props.vote[0].vote &&
                <div className="post--vote">
                    <p className="post--vote number">{props.upvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="post--vote upvote blue"
                            onClick={deleteVote}
                        />

                    </button>
                    <p className="post--vote number">{props.downvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="post--vote downvote"
                            onClick={updateDownvote}
                        />

                    </button>
                </div>
            }
            {props.isVoted && !props.vote[0].vote &&
                <div className="post--vote">
                    <p className="post--vote number">{props.upvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="post--vote upvote"
                            onClick={updateUpvote}
                        />

                    </button>
                    <p className="post--vote number">{props.downvote}</p>
                    <button>
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="post--vote downvote blue"
                            onClick={deleteVote}
                        />

                    </button>
                </div>
            }
        </div>
    )
}