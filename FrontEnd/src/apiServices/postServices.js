import * as request from '~/utils/request';

export const postEnrollment = async (options) => {
    try {
        const res = await request.post('Transaction/create', options);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

export const postLesson = async (options) => {
    try {
        const res = await request.post('Material', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postCourse = async (options) => {
    try {
        const res = await request.post('Course/CreateCourse', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const putCourse = async (id, options) => {
    try {
        const res = await request.put(`Course/${id}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCourse = async (id) => {
    try {
        const res = await request.del(`Course/id?id=${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
