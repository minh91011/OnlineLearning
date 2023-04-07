import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/Course/${data.courseId}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.img} alt={data.courseName} />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span> {data.courseName}</span>
                </p>
            </div>
        </Link>
    );
}

export default AccountItem;
