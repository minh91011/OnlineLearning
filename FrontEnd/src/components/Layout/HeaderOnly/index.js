import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Header from '~/components/Layout/components/HeaderLearnPage';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const { courseId } = useParams();

    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header-wrapper')}>
                <div className={cx('header')}>{courseId}</div>
            </Header>

            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
