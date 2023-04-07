import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import Course from '~/components/Layout/components/Course';
import styles from './Header.module.scss';

import images from '~/assets/images';
import Image from '~/components/Image';
import routesConfig from '~/config/routes';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search';
import { faSignOut, faUser, faPen, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import Button from '~/components/Button';
import Menu from '../../../Popper/Menu';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Header() {
    const [showMyCourse, setShowMyCourse] = useState(false);
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;
    //  console.log(role);
    const navigate = useNavigate();
    const infoBlockRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showMyCourse &&
                event.target.className !== cx('action-course') &&
                !event.target.closest('.' + cx('action-course-view'))
            )
                setShowMyCourse(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMyCourse]);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                // console.log(menuItem);
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Profile',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faPen} />,
            title: 'Write blog',
            to: '/new-post',
        },
        {
            icon: <FontAwesomeIcon icon={faBookBookmark} />,
            title: 'My posts',
            to: '/my-post',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
            onClick: () => {
                localStorage.clear();
                navigate('/');
            },
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Online Learning" />
                    <span className={cx('logo-span')}> Learning</span>
                </Link>
                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        role !== 'admin' ? (
                            role === 'student' ? (
                                <Course />
                            ) : (
                                <></>
                            )
                        ) : (
                            <>
                                <a href="/admin" className={cx('btnViewAdmin')}>
                                    Admin
                                </a>
                            </>
                        )
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    navigate('/login');
                                }}
                                primary
                            >
                                Log in
                            </Button>

                            <Button
                                onClick={() => {
                                    navigate('/signup');
                                }}
                                primary
                            >
                                Sign up
                            </Button>
                        </>
                    )}

                    <Menu hideOnClick={false} items={userMenu} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://files.fullstack.edu.vn/f8-prod/user_photos/259967/6352acc21d945.jpg"
                                alt="Nguyen Van A"
                                fallback="https://lienquan.garena.vn/files/skin/01636074d1a9826c4db917dae38a7de25d2562df2144b.jpg"
                            />
                        ) : (
                            <></>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
