import classNames from 'classnames/bind';
import styles from './MyCourses.module.scss';
import CourseItem from '~/components/CourseItem';
import * as loadService from '~/apiServices/loadServices';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

//const courses = [];
function MyCourses() {
    const [courses, setCourses] = useState([]);
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user.userId;
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseByUser(userId);
            //     console.log(result);
            setCourses(result);
        };
        fetchApi();
    }, []);
    return (
        <div style={{ marginTop: '30px', marginLeft: '100px' }}>
            <div className={cx('heading')}>
                <h1>My courses</h1>
            </div>
            {(!courses || courses.length < 1) && (
                <>
                    <h2>You not enroll any courses</h2>
                </>
            )}
            <session className={cx('wrapper')}>
                {courses &&
                    courses.length > 0 &&
                    courses.map((course, index) => {
                        return (
                            <>
                                <CourseItem key={index} course={course} />
                                {/* <h2>{course.title}</h2> */}
                            </>
                        );
                    })}
                <>
                    <CourseItem addNew></CourseItem>
                </>
            </session>
        </div>
    );
}

export default MyCourses;
