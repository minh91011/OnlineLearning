import Post from "./Post/Post"
import React from "react";
import ReactPaginate from "react-paginate";
import * as request from "../../utils/request";
import PostCreate from "./Post/PostCreate";
import Filter from "./Filter";
import "./Live.css"



function Live() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = 0// user login id
    if(user !== null){
        userId = user.userId
    }
    const [content , setContent] = React.useState("") // content to search
    const [orderby, setOrderby] = React.useState("") // order of listing post
    const [currentPage, setCurrentPage] = React.useState(0) // store information about current pagination page
    const [posts, setPosts] = React.useState([]) // store posts ... duh
    const [num, setNum] = React.useState(0) // set num to refresh api when there're change
    const PER_PAGE = 5 // post per page
    React.useEffect(() => {
        const response = async () => {
            const loadData = await request.get('Post/content && orderby?content='+content+'&orderby='+orderby)
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

    return (
        <div className="post--container">
            <Filter 
            orderby = {orderby}
            content = {content}
            setContent = {value => setContent(value)}
            setOrderby = {value => setOrderby(value)}
            setNum = {value => setNum(value)}
            />
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
    );
}

export default Live;
