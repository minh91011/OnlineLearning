import React, { useState } from 'react';
import { Radio, Space } from 'antd';
import * as request from '~/utils/request';
import { useEffect } from 'react';

function ViewQuestion(props) {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user?.userId;
    const [value, setValue] = useState('');
    const [studentAnswerSource, setStudentAnswerSource] = useState({});
    const [num, setNum] = useState(0)

    const CreateStudentAnswer = (val) => {
        var options = {
            userId: userId,
            questionId: props.question.questionId,
            choiceValue: val,
        };
        const res = async () => {
            const loadData = await request.post('StudentAnswer', options);
        };
        res();
    };
    
    useEffect(() => {
        const res = async() =>{
            const loadData = await request.get('StudentAnswer/'+ userId + ";" + props.question.questionId);
            setStudentAnswerSource(loadData);
        } 
        res();
    },[num])

    const onChange = (e) => {
        setValue(e.target.value);
        if (Object.keys(studentAnswerSource).length === 0) {
            CreateStudentAnswer(e.target.value)
            setNum(num + 1);
        } else {
            UpdateStudentAnswer(e.target.value);
        }
    };

    const UpdateStudentAnswer = (val)=>{
        const id = studentAnswerSource.studentAnswerId;
        var options = {
            studentAnswerId: id,
            userId: userId,
            questionId: props.question.questionId,
            choiceValue: val,
        }
        const res = async () => {
            const putData = await request.put('StudentAnswer/' + id, options);
        }
        res();
    }

    return (
        <div style={{margin: '20px', width: '400px', border: '1px solid', padding: '15px', borderRadius: '25px'}}>
            <p style={{fontSize: '20px'}}>{props.question.content}</p>
            <Radio.Group onChange={onChange} value={value} style={{margin: '10px'}}>
                <Space direction="vertical">
                    <Radio value={props.question.answerA}>{props.question.answerA}</Radio>
                    <Radio value={props.question.answerB}>{props.question.answerB}</Radio>
                    <Radio value={props.question.answerC}>{props.question.answerC}</Radio>
                    <Radio value={props.question.answerD}>{props.question.answerD}</Radio>
                </Space>
            </Radio.Group>
        </div>
    );
}

export default ViewQuestion;
