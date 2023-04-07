import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'antd';
import * as request from '~/utils/request';
import MenuAssignment from './MenuAssignment'
import MenuLession from './MenuLession'
const SubMenu = Menu.SubMenu;

function MaterialBar(props) {
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    const handleClick = (e) => {
        let char = e.key.substring(0, 1);
        let id = e.key.substring(1, 2);
        if (char === 'm'){
            navigate('/Courses/Lessions/' + id)
        }
        if (char === 'a'){
            navigate('/Courses/Assignments/' + id)
        }
    };
   
    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Course/chapters/' + props.courseId);
            setDataSource(loadData.data);
        };
        res();
    },[])

    const chapterList = dataSource.map((chapter) => 
        <SubMenu key={"c" + chapter.chapterId} title={<span>{chapter.title}</span>}>
            <MenuLession chapterId = {chapter.chapterId}></MenuLession>
            <MenuAssignment chapterId = {chapter.chapterId}></MenuAssignment>
        </SubMenu>
    )

    return (
        <div>
            <Menu onClick={handleClick} style={{ width: 240 }} mode="inline">
                {chapterList}
            </Menu>
        </div>
    );
}

export default MaterialBar;
