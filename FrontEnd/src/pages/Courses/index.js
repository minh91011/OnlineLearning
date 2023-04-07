import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import CourseItem from '~/components/CourseItem';
import { useEffect, useState } from 'react';
import * as loadService from '~/apiServices/loadServices';
const cx = classNames.bind(styles);

function Courses() {
    const [courses, setCourses] = useState([]);
    const [freeCourses, setFreeCourses] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourse();
            //     console.log(result);
            setCourses(result.filter((course) => course.price > 0));
            setFreeCourses(result.filter((course) => course.price === 0));
        };
        fetchApi();
    }, []);
    //console.log(courses);
    return (
        <div className={cx('wrapper')}>
            <div>
                <h1 style={{ marginLeft: '12px' }}>Courses</h1>
            </div>

            <div>
                <h3 style={{ marginLeft: '12px' }}>
                    The course words are designed to suit newbies, many free course words, quality, easy to understand
                    content.
                </h3>
            </div>

            <div className={cx('courses')}>
                <h1 style={{ marginLeft: '12px' }}>Pro Course</h1>

                <section className={cx('wrap')}>
                    {courses &&
                        courses.map((course, index) => {
                            return (
                                <>
                                    <CourseItem key={index} course={course} />
                                    {/* <h2>{course.title}</h2> */}
                                </>
                            );
                        })}
                </section>
            </div>

            <div className={cx('courses')}>
                <h1 style={{ marginLeft: '12px' }}>Free Course</h1>

                <section className={cx('wrap')}>
                    {freeCourses.map((course, index) => {
                        return (
                            <>
                                <CourseItem key={index} course={course} />
                                {/* <h2>{course.title}</h2> */}
                            </>
                        );
                    })}
                </section>
            </div>
        </div>
    );
}

export default Courses;
