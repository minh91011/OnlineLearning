import React, { useEffect, useState } from 'react';
import * as request from '~/utils/request';

function ViewAnswer(props) {
    const [studentAnswerSource, setStudentAnswerSource] = useState({});
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user?.userId;

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('StudentAnswer/' + userId + ';' + props.question.questionId);
            setStudentAnswerSource(loadData);
        };
        res();
    }, []);

    return (
        <div style={{margin: '20px', width: '400px', border: '1px solid', padding: '10px', borderRadius: '25px'}}>
            <p style={{ color: studentAnswerSource.choiceValue === props.question.trueAnswer ? 'green' : 'red', fontSize: '20px' }}>
                {props.question.content}
            </p>
            <div style={{margin: '15px'}}>
                <p
                    style={{
                        background:
                            studentAnswerSource.choiceValue === props.question.trueAnswer
                                ? props.question.answerA === studentAnswerSource.choiceValue
                                    ? '#66ff99'
                                    : ''
                                : props.question.answerA === props.question.trueAnswer
                                ? '#66ff99'
                                : props.question.answerA === studentAnswerSource.choiceValue
                                ? '#ff8080'
                                : '',
                    }}
                >
                    A. {props.question.answerA}
                </p>
                <p
                    style={{
                        background:
                            studentAnswerSource.choiceValue === props.question.trueAnswer
                                ? props.question.answerB === studentAnswerSource.choiceValue
                                    ? '#66ff99'
                                    : ''
                                : props.question.answerB === props.question.trueAnswer
                                ? '#66ff99'
                                : props.question.answerB === studentAnswerSource.choiceValue
                                ? '#ff8080'
                                : '',
                    }}
                >
                    B. {props.question.answerB}
                </p>
                <p
                    style={{
                        background:
                            studentAnswerSource.choiceValue === props.question.trueAnswer
                                ? props.question.answerC === studentAnswerSource.choiceValue
                                    ? '#66ff99'
                                    : ''
                                : props.question.answerC === props.question.trueAnswer
                                ? '#66ff99'
                                : props.question.answerC === studentAnswerSource.choiceValue
                                ? '#ff8080'
                                : '',
                    }}
                >
                    C. {props.question.answerC}
                </p>
                <p
                    style={{
                        background:
                            studentAnswerSource.choiceValue === props.question.trueAnswer
                                ? props.question.answerD === studentAnswerSource.choiceValue
                                    ? '#66ff99'
                                    : ''
                                : props.question.answerD === props.question.trueAnswer
                                ? '#66ff99'
                                : props.question.answerD === studentAnswerSource.choiceValue
                                ? '#ff8080'
                                : '',
                    }}
                >
                    D. {props.question.answerD}
                </p>
            </div>
        </div>
    );
}

export default ViewAnswer;
