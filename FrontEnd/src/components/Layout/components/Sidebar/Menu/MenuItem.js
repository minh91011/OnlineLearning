import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, isPlus }) {
    return (
        <div>
            {!isPlus ? (
                <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
                    <div className={cx('icon')}>{icon}</div>
                    <span className={cx('title')}>{title}</span>
                </NavLink>
            ) : (
                <NavLink className={cx('menu-item')} to={to}>
                    <div className={cx('icon-plus')}>{icon}</div>
                </NavLink>
            )}
        </div>
    );
}

// MenuItem.propTypes = {
//     title: PropTypes.string.isRequired,
//     to: PropTypes.string.isRequired,
//     icon: PropTypes.node.isRequired,
//     activeIcon: PropTypes.node.isRequired,
// };

export default MenuItem;
