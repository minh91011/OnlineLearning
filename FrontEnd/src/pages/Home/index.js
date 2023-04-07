import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';
import Courses from '~/components/Courses';
const cx = classNames.bind(styles);
function Home() {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var role = user?.role;

    return (
        <div className={cx('wrapper')}>
            <section className={cx('inner')}>
                <div className={cx('banner')}>
                    <div className={cx('banner-text')}>
                        <h1 className={cx('banner-header')}>Keep learning in the moments that matter</h1>
                        <h2>
                            Expert-led courses across a variety of online class topics for every step of your career.
                            The instructors are the ones who write this website.
                        </h2>
                    </div>

                    <img className={cx('home-img')} src={images.home_logo} alt="ok con de"></img>
                </div>
            </section>

            {role === 'student' || !user ? (
                <section className={cx('courses')}>
                    <Courses />
                </section>
            ) : null}
        </div>
    );
}

export default Home;
