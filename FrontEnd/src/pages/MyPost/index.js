import React from "react"
import * as request from "../../utils/request";
import Post from "../Live/Post/Post";
import ReactPaginate from "react-paginate";

export default function MyPost(){
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    const userId = user.userId// user login id
    const [currentPage, setCurrentPage] = React.useState(0)
    const [posts, setPosts] = React.useState([]) 
    const [num, setNum] = React.useState(0) 
    const PER_PAGE = 5 // post per page
    React.useEffect(() => {
        const response = async () => {
            const loadData = await request.get('Post/userId?userId='+userId)
            setPosts(loadData)
        }
        response()
    }, [num]);
    function HandlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE

    const currentPostData = posts.slice(offset, offset + PER_PAGE)
        .map(item => {
            return (
                <div>
                    <Post
                        key={item.postId}
                        userIdLogin={userId}
                        setNum={value => setNum(value)}
                        num={num}
                        {...item} />

                </div>
            )
        })

    const pageCount = Math.ceil(posts.length / PER_PAGE)
    return(
        <div className="post--container">
            {currentPostData}
            <ReactPaginate
                previousLabel={"< Previous"}
                nextLabel={" Next >"}
                pageCount={pageCount}
                onPageChange={HandlePageClick}
                containerClassName={"pagination"}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}