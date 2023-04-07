import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import CourseItem from '~/components/CourseItem';
import { useEffect, useState } from 'react';
import * as loadService from '~/apiServices/loadServices';
const cx = classNames.bind(styles);

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourse();
            //     console.log(result);
            setCourses(result);
        };
        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('heading')}>
                <h2>All courses</h2>
            </div>
            <session className={cx('wrapper')}>
                {courses &&
                    courses.map((course, index) => {
                        return (
                            <>
                                <CourseItem key={index} course={course} />
                                {/* <h2>{course.title}</h2> */}
                            </>
                        );
                    })}
            </session>
        </div>
    );
}

export default Courses;
