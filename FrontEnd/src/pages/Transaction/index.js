import classNames from 'classnames/bind';
import styles from './Transaction.module.scss';
import * as loadService from '~/apiServices/loadServices';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment/moment';
const cx = classNames.bind(styles);
const columns = [
    {
        title: 'User',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'Enrolled course',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Transaction ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'Payer ID',
        dataIndex: 'payerId',
        key: 'payerId',
    },
    {
        title: 'Email Payment',
        dataIndex: 'emailPayment',
        key: 'emailPayment',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        //   defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => {
            const da = new Date(a.date);
            const db = new Date(b.date);
            return da - db;
        },
        filters: [
            {
                text: 'This month',
                value: 'this_month',
            },
            {
                text: 'Last month',
                value: 'last_month',
            },
            {
                text: 'Last 6 months',
                value: 'last_6_months',
            },
            {
                text: 'This year',
                value: 'this_year',
            },
            {
                text: 'Last year',
                value: 'last_year',
            },
        ],
        onFilter: (value, record) => {
            const date = moment(record.date);
            if (value === 'this_month') {
                return date.isSame(moment(), 'month');
            } else if (value === 'last_month') {
                return date.isSame(moment().subtract(1, 'month'), 'month');
            } else if (value === 'this_year') {
                return date.isSame(moment(), 'year');
            } else if (value === 'last_year') {
                return date.isSame(moment().subtract(1, 'year'), 'year');
            } else if (value === 'last_6_months') {
                const sixMonthsAgo = moment().subtract(6, 'months');
                return date.isBetween(sixMonthsAgo, moment());
            }
            return true;
        },
    },
];
function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const r = await loadService.loadAllTransaction();
            const result = r.filter((enrollment) => enrollment.transactionId !== null);
            //  console.log(result);
            const combine = result.map(async (enrollment) => {
                const course = await loadService.loadCourseDetail(enrollment.courseId);
                const user = await loadService.loadUserById(enrollment.userId);

                //  console.log(user);
                return {
                    ...enrollment,
                    userName: user.username,
                    amount: course.price,
                    description: course.courseName,
                };
            });
            const combinedData = await Promise.all(combine);
            //   console.log(combine);

            setTransactions(combinedData);
        };
        fetchApi();
    }, []);

    return <Table dataSource={transactions} columns={columns}></Table>;
}

export default Transaction;
