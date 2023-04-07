import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { HomeIcon1, LearnIcon, BlogIcon, PlusIcon, EditIcon } from '~/components/Icons';
import config from '~/config/routes';
const cx = classNames.bind(styles);

function Sidebar() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;

    return (
        <div>
            <aside className={cx('wrapper')}>
                <Menu>
                    <MenuItem title="" to={config.newPost} isPlus icon={<PlusIcon />} />
                    <MenuItem title="Home" to={config.home} icon={<HomeIcon1 />} />
                    {role === 'student' || role == null ? (
                        <MenuItem title="Learn" to={config.allCourses} icon={<LearnIcon />} />
                    ) : (
                        <></>
                    )}
                    <MenuItem title="Blog" to={config.live} icon={<BlogIcon />} />
                    {role === 'teacher' && <MenuItem title="Create" to={config.createCourses} icon={<EditIcon />} />}
                </Menu>

                {/* <SuggestedAccounts label="Suggested accounts" />
            <SuggestedAccounts label="Following accounts" /> */}
            </aside>
        </div>
    );
}

export default Sidebar;
