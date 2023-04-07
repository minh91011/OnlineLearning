import React from "react";
import IndividualComment from "./IndividualComment";
import * as request from "../../../utils/request";
import CreateComment from "./CreateComment";

export default function Comment(props) {
    const [comments, setComments] = React.useState([])
    const [num , setNum] = React.useState(0)
    React.useEffect(() => {
        const response = async () => {
            const loadData = await request.get('Comment/postId?postId=' + props.postId)
            setComments(loadData)
        }
        response()
    }, [num]);
    const allCommentsOfAPost = comments.map(item => {
        return (
            <IndividualComment 
            key={item.commentId}
            userIdLogin = {props.userIdLogin}
             {...item}
            setNum = {value => setNum(value)}
            num = {num}  />
        )
    })

    return (
        <div className="comment--container">
            <CreateComment
             setNum = {value => setNum(value)}
             postId = {props.postId}
             userId = {props.userIdLogin} />
            {allCommentsOfAPost}
        </div>
    )
}
