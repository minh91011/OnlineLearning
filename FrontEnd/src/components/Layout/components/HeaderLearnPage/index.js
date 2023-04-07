import classNames from 'classnames/bind';
import styles from './HeaderLearnPage.module.scss';
import { ChevronLeft } from '~/components/Icons';
import images from '~/assets/images';
import * as loadService from '~/apiServices/loadServices';
import * as request from '~/utils/request';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const { courseId } = useParams();
    const { lessionId } = useParams();
    const location1 = useLocation();
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            const loadData = await request.get('Material/' + lessionId);
            const chapterId = loadData.chapterId;
            const loadChapter = await request.get('Chapter/' + chapterId);
            const result = await loadService.loadCourseDetail(loadChapter.courseId);
            if (result) setCourse(result);
        };
        fetchApi();
    }, []);
    const handleClick = () => {
        if (location1.state) navigate(-2);
        else navigate(-1);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('icon-left')} onClick={handleClick}>
                    <ChevronLeft width="2.2rem" height="2.2rem" />
                </div>

                <a className={cx('logo')} href="/">
                    <img src={images.logo} alt="Okk"></img>
                </a>

                <div className={cx('title')}>{course.courseName}</div>
            </div>
        </header>
    );
}

export default Header;
