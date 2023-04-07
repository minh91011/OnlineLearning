import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as loadService from '~/apiServices/loadServices';
import * as postService from '~/apiServices/postServices';
import * as request from '~/utils/request';
import { useEffect, useState } from 'react';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './CourseDetail.module.scss';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
//

function CourseDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId } = useParams();
    const [checkout, setCheckout] = useState(false);
    const [enrolled, setEnrolled] = useState(null);
    //  console.log(courseId);
    const [course, setCourse] = useState([]);
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user?.userId;
    var role = user?.role;
    const [firstLession, setFirstLession] = useState(0);

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Material/firstLesson/' + courseId);
            // console.log(course.courseId);
            // const loadLession = await request.get('Chapter/GetMaterials/' + loadData[0].chapterId);
            setFirstLession(loadData?.materialId);
            console.log(loadData);
        };
        res();
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseEnroll(userId, courseId);
            setEnrolled(result);
            if (result) {
                navigate(`/Courses/Lessions/${firstLession}`, {
                    state: { from: location },
                });
            }
        };
        fetchApi();
    }, [courseId]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseDetail(courseId);
            setCourse(result);
        };
        fetchApi();
    }, [courseId]);

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Material/firstLesson/' + courseId);
            // console.log(course.courseId);
            // const loadLession = await request.get('Chapter/GetMaterials/' + loadData[0].chapterId);
            setFirstLession(loadData?.materialId);
            console.log(loadData);
        };
        res();
    }, []);
    const handleEnrollCourse = async () => {
        if (!userId) {
            navigate('/login');
            return;
        }

        if (course.price > 0) {
            setCheckout(true);
        } else {
            const fetchApi = async () => {
                const result = await postService.postEnrollment({
                    userId,
                    courseId: course.courseId,
                    date: new Date(Date.now()).toISOString(),
                    status: 'Is Learning',
                });
            };
            fetchApi();
            navigate(`/Courses/Lessions/${firstLession}`, { state: { from: location } });
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <h2>{course.courseName}</h2>
                <Image
                    className={cx('course-img')}
                    src={course.img}
                    alt="Nguyen Van A"
                    fallback="https://lienquan.garena.vn/files/skin/01636074d1a9826c4db917dae38a7de25d2562df2144b.jpg"
                />
                <p className={cx('course-information')}>
                    <h4>Introduction: {course.description}</h4>
                    <span> {course.price > 0 ? `Cost: ${course.price} $` : 'Free'} </span>
                </p>
                {role === 'student' || role == null ? (
                    <Button className={cx('btn-enroll')} primary onClick={handleEnrollCourse}>
                        Enroll course
                    </Button>
                ) : (
                    <></>
                )}

                {checkout && (
                    <div className={cx('checkout')}>
                        <PayPalScriptProvider
                            options={{
                                'client-id':
                                    'AUWhI4daXRzzzPuCLHcmnB7VhWvUd_RSJ0FQXeoOgAC7TQwGClUvVkVTIh4O868Uje6Ql2_uSbWkTxNE',
                            }}
                        >
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        description: 'Enroll course in In Learning',

                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: `${course.price}`,
                                                },
                                            },
                                        ],
                                        application_context: {
                                            shipping_preference: 'NO_SHIPPING',
                                        },
                                    });
                                }}
                                onApprove={(data, action) => {
                                    // This function captures the funds from the transaction.
                                    return action.order.capture().then((details) => {
                                        // This function shows a transaction success message to your buyer.
                                        const fetchApi = async () => {
                                            const result = await postService.postEnrollment({
                                                userId,
                                                courseId: course.courseId,
                                                date: details.create_time,
                                                transactionId: details.id,
                                                payerId: details.payer.payer_id,
                                                emailPayment: details.payer.email_address,
                                                status: 'Is Learning',
                                            });
                                            navigate(`/Courses/Lessions/${firstLession}`, {
                                                state: { from: location },
                                            });
                                        };
                                        //   console.log(details.payer);
                                        fetchApi();
                                    });
                                }}
                                onError={(error) => {
                                    console.error('An error occurred:', error);
                                    alert('An error occurred, please try again later.');
                                }}
                            ></PayPalButtons>
                        </PayPalScriptProvider>
                    </div>
                )}
            </div>
        </>
    );
}

export default CourseDetail;
