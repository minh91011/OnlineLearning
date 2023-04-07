import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MaterialBar from './MaterialBar';
import * as request from '~/utils/request';
import * as loadService from '~/apiServices/loadServices';
import ViewQuestion from './ViewQuestion';
import ViewAnswer from './ViewAnswer';
import { Button, Modal } from 'antd';
import {ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

function ViewAssignment() {
    const [dataSource, setDataSource] = useState({});
    const [questions, setQuestions] = useState([]);
    const [courseId, setCourseId] = useState(1);
    const [score, setScore] = useState([]);
    const { assignmentId } = useParams();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({ status: false, message: '' });
    const [source, setSource] = useState([]);
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user?.userId;

    useEffect(() => {
        setLoader(true);
        const res = async () => {
            try {
                const loadData = await request.get('Assignment/' + assignmentId);
                const loadChapter = await request.get('Chapter/' + loadData.chapterId);
                const result = await loadService.loadCourseEnroll(userId, loadChapter.courseId);
                if (Object.keys(result).length !== 0) {
                    const loadQuestions = await request.get('Assignment/GetQuestions/' + assignmentId);
                    const loadStudentAnswers = await request.get(
                        'StudentAnswer/getByUserIdAndAssignmentId/' + userId + ';' + assignmentId,
                    );
                    const loadScore = await request.get(
                        'StudentAnswer/getTrueByUserIdAndAssignmentId/' + userId + ';' + assignmentId,
                    );
                    setScore(loadScore);
                    setQuestions(loadQuestions);
                    setSource(loadStudentAnswers);
                    setDataSource(loadData);
                    setCourseId(loadChapter.courseId);
                } else {
                    setError({ status: true, message: 'fail' });
                }
            } catch (error) {
                setError({ status: true, message: error.message });
            } finally {
                setLoader(false);
            }
        };
        setTimeout(res, 500);
    }, [assignmentId]);

    const questionShow = questions.map((question) => {
        return (
            <div key={question.questionId}>
                <ViewQuestion question={question}></ViewQuestion>
            </div>
        );
    });

    const answerShow = questions.map((question) => {
        return (
            <div key={question.questionId}>
                <ViewAnswer question={question}></ViewAnswer>
            </div>
        );
    });

    const onSubmit = () => {
        showConfirm('Do you want to submit this assignment?', 'if you submit you can not fix it');
    };

    const showConfirm = (title, content) => {
        confirm({
          title: title,
          icon: <ExclamationCircleFilled />,
          content: content,
          onOk() {
            var options = {
                userId: userId,
                questionId: questions[0].questionId,
                choiceValue: '',
            };
            const res = async () => {
                const loadStudentAnswers = await request.get(
                    'StudentAnswer/getByUserIdAndAssignmentId/' + userId + ';' + assignmentId,
                );
                if (loadStudentAnswers.length === 0){
                    const loadData = await request.post('StudentAnswer', options);
                }
            };
            res();
            window.location.reload(false);
          }
        });
      };

    if (loader) return <h3>Loading...</h3>;
    if (error.status) return <h3>Error: {error.message}</h3>;

    return (
        <div style={{ display: 'flex' }}>
            <MaterialBar courseId={courseId}></MaterialBar>
            <div style={{margin: '20px'}}>
                <h2>{dataSource.title}</h2>
                <h3 style={{ visibility: source.length !== 0 ? 'visible' : 'hidden', margin: '20px' }}>
                    Total score: {score.length} / {questions.length}
                </h3>
                {source.length === 0 ? questionShow : answerShow}
                <Button
                    onClick={onSubmit}
                    type={'primary'}
                    style={{ visibility: source.length !== 0 ? 'hidden' : 'visible' }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default ViewAssignment;
