import React from 'react';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import * as request from '~/utils/request';
const MenuItemGroup = Menu.ItemGroup;

function MenuLession(props) {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter/GetMaterials/' + props.chapterId);
            setDataSource(loadData);
        };
        res();
    }, []);

    const lessionList = dataSource.map((material) => 
        <Menu.Item key={"m" + material.materialId} >{material.title}</Menu.Item>
    );
    return (
        <MenuItemGroup key="lesson" title="Lession">
            {lessionList}
        </MenuItemGroup>
    );
}

export default MenuLession;
