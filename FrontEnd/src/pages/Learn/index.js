import poster from '~/assets/images/no-image.png';
import classNames from 'classnames/bind';
import styles from './Learn.module.scss';
import { useRef } from 'react';

import ReactPlayer from 'react-player';
const cx = classNames.bind(styles);

function Learn() {
    return (
        <div className={cx('wrapper')}>
            <h2>This is learn page</h2>
        </div>
    );
}

export default Learn;
