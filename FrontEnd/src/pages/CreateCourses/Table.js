import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Popconfirm } from 'antd';
import styles from"./Table.module.scss"
function Tables({ courses,deleteInfo,updateInfo }) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
      const confirm = (id) => {
          deleteInfo(id);
          message.success('Click on Yes');
      };
      const cancel = () => {
          message.error('Click on No');
      };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text,
    });
    const columns = [
        {
            title: 'courseName',
            dataIndex: 'courseName',
            key: 'courseName',
            ...getColumnSearchProps('courseName'),
        },
        {
            title: 'img',
            dataIndex: '',
            render: (record) => <img src={record.img} alt="avatar" style={{ width: '100px', height: '100px' }} />,
            key: 'x',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => (
                <div className={styles.actionButton} style={{ display: 'flex' }}>
                    <button className={styles.confirmButton} onClick={() => updateInfo(record)}>
                        {' '}
                        Edit{' '}
                    </button>
                    <Popconfirm
                        className={styles.closeButton}
                        title="Are you sure to delete this info?"
                        placement="topRight"
                        onConfirm={() => confirm(record.courseId)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        Delete
                    </Popconfirm>
                </div>
            ),
            align: 'center',
        },
    ];

    return (
        <div className="info__content">
            <Table rowKey="id" pagination={{ pageSize: 4 }} columns={columns} dataSource={[...courses]} />
        </div>
    );
}

export default Tables;
