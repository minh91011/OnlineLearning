import Button from '~/components/Button';
import * as postServices from '~/apiServices/postServices';
import PostCreate from '../Live/Post/PostCreate';
function WriteBlog() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = 0; // user login id
    if (user !== null) {
        userId = user.userId;
    }

    return (
        <div style={{ margin: '0 auto' }}>
            <PostCreate userId={userId} />
        </div>
    );
}
export default WriteBlog;
