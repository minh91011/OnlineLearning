import * as request from '~/utils/request';
// Course
export const loadCourse = async () => {
    try {
        const res = await request.get('Course');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const loadCourseByUser = async (userId) => {
    try {
        const res = await request.get('Course/user/' + userId);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const searchCourse = async (search) => {
    try {
        const res = await request.get('Course/search', {
            params: {
                searchKey: search,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const loadCourseDetail = async (courseId) => {
    try {
        const res = await request.get(`Course/${courseId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const loadCourseEnroll = async (userId, courseId) => {
    try {
        const res = await request.get('Transaction/filter', {
            params: {
                userId,
                courseId,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const loadStudentEnrollCourse = async (courseId) => {
    try {
        const res = await request.get('Transaction/course/' + courseId);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const loadAllTransaction = async () => {
    try {
        const res = await request.get('Transaction/');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// User

export const loadUserById = async (userId) => {
    try {
        const res = await request.get('User/getUserById', {
            params: {
                id: userId,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const loadMaterialById = async (Id) => {
    try {
        const res = await request.get('Material/' + Id);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const loadChaptersByCourseId = async (Id) => {
    try {
        const res = await request.get('Course/chapters/' + Id);
        return res;
    } catch (error) {
        console.log(error);
    }
};
