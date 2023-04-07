import React from 'react';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import * as request from '~/utils/request';
const MenuItemGroup = Menu.ItemGroup;

function MenuAssignment(props) {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter/GetAssignments/' + props.chapterId);
            setDataSource(loadData);
        };
        res();
    }, []);

    const assignmentList = dataSource.map((assignment) => 
        <Menu.Item key={"a" + assignment.assignmentId}>{assignment.title}</Menu.Item>
    );
    return (
        <MenuItemGroup key="asignment" title="Assignment">
            {assignmentList}
        </MenuItemGroup>
    );
}

export default MenuAssignment;
