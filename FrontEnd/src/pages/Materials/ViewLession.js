import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MaterialBar from './MaterialBar';
import * as request from '~/utils/request';
import * as loadService from '~/apiServices/loadServices';
import MaterialDetails from '~/components/MaterialDetails';
function ViewLession() {
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState(1);
    const { lessionId } = useParams();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user?.userId;

    useEffect(() => {
        setLoader(true);
        const res = async () => {
            try {
                const loadData = await request.get('Material/' + lessionId);
                const loadChapter = await request.get('Chapter/' + loadData.chapterId);
                setCourseId(loadChapter.courseId);
                const result = await loadService.loadCourseEnroll(userId, loadChapter.courseId);
                if (!result) navigate('/');
            } catch (error) {
                setError({ status: true, message: error.message });
            } finally {
                setLoader(false);
            }
        };
        setTimeout(res, 500);
    }, [lessionId]);

    if (loader) return <h3>Loading...</h3>;
    if (error.status) return <h3>Error: {error.message}</h3>;

    return (
        <div style={{ display: 'flex' }}>
            <MaterialBar courseId={courseId}></MaterialBar>
            <MaterialDetails materialId={lessionId}></MaterialDetails>
        </div>
    );
}

export default ViewLession;
