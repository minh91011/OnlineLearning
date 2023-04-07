import { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Course.module.scss';
import Image from '~/components/Image';
import routes from '~/config/routes';
import * as loadService from '~/apiServices/loadServices';

const cx = classNames.bind(styles);

function Course() {
    const [showMyCourse, setShowMyCourse] = useState(false);
    const [courses, setCourses] = useState([]);
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);

    var userId = user?.userId;
    var role = user?.role;
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseByUser(userId);
            if (result) setCourses(result.slice(0, Math.min(result.length, 4)));
        };
        fetchApi();
    }, []);
    const infoBlockRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            //   console.log(typeof cx('action-course'));
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

    // default
    return (
        <div className={cx('my-course')}>
            <button className={cx('action-course')} onClick={() => setShowMyCourse(!showMyCourse)}>
                My courses
            </button>
            {showMyCourse && courses.length > 0 && (
                <div className={cx('action-course-view')}>
                    <div className={cx('course-view-header')}>
                        <h6>My courses</h6>
                        <Link to={routes.myCourses} title="My courses" target="_self">
                            View all
                        </Link>
                    </div>
                    {courses.map((course, index) => {
                        return (
                            <div className={cx('course-view-item')}>
                                <div>
                                    <Image className={cx('course-view-item-img')} src={course.img}></Image>
                                </div>

                                <div className={cx('my-course-info')}>
                                    <h3 className={cx('my-course-title')}>{course.courseName}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {showMyCourse && !courses.length > 0 && (
                <div className={cx('action-course-view')}>
                    <div className={cx('course-view-header')}>
                        <h6>
                            {role == 'student' ? 'You did not enroll any courses' : 'You did not create any course '}
                        </h6>
                        <Link to={routes.allCourses} title="Ok" target="_self" onClick={() => setShowMyCourse(false)}>
                            {role == 'student' ? 'Enroll now' : 'Create now'}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Course;
