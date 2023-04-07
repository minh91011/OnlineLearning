// Layouts
import { HeaderOnly } from '~/components/Layout';
// Pages
import Home from '~/pages/Home';
import Courses from '~/pages/Courses';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Chapters from '~/pages/Materials/Chapters';
import EditLession from '~/pages/Materials/EditLession';
import InsertLession from '~/pages/Materials/InsertLession';
import EditQuestion from '~/pages/Materials/EditQuestion';
import EditChapter from '~/pages/Materials/EditChapter';
import EditAssignment from '~/pages/Materials/EditAssignment';
import ViewAssignment from '~/pages/Materials/ViewAssignment';
import ViewLession from '~/pages/Materials/ViewLession';
import WriteBlog from '~/pages/WriteBlog';
import CourseDetail from '~/pages/CourseDetail';
import Learn from '~/pages/Learn';
import MyCourses from '~/pages/MyCourses';
import Transaction from '~/pages/Transaction';
import Login from '~/pages/Login';
import MyPost from '../pages/MyPost';
import CreateCourses from '../pages/CreateCourses';
import Admin from '../pages/Admin';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '/createCourses', component: CreateCourses },
    { path: '@/:parameter', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/live', component: Live },
    { path: '/Courses/Chapters/:courseId', component: Chapters },
    { path: '/Courses/EditCourse/:courseId/EditChapter/:chapterId', component: EditChapter },
    { path: '/Courses/EditCourse/:courseId/EditChapter/:chapterId/InsertLession', component: InsertLession },
    { path: '/Courses/EditCourse/:courseId/EditChapter/:chapterId/EditLession/:lessionId', component: EditLession },
    { path: '/Courses/Lessions/:lessionId', component: ViewLession, layout: HeaderOnly },
    {
        path: '/Courses/EditCourse/:courseId/EditChapter/:chapterId/EditAssignment/:assignmentId',
        component: EditAssignment,
    },
    { path: '/Courses/Assignments/:assignmentId', component: ViewAssignment, layout: HeaderOnly },
    {
        path: '/Courses/EditCourse/:courseId/EditChapter/:chapterId/EditAssignment/:assignmentId/EditQuestion/:questionId',
        component: EditQuestion,
    },
    { path: '/new-post', component: WriteBlog },
    { path: '/course/:courseId', component: CourseDetail },
    { path: '/learn/:courseId', component: Learn, layout: HeaderOnly },
    { path: '/my-courses', component: MyCourses },
    { path: '/transaction', component: Transaction },
    { path: '/insertLession/:chapterId', component: InsertLession },
    { path: '/login', component: Login },
    { path: '/my-post', component: MyPost },
    { path: '/admin', component: Admin},
    { path: '/signup', component: Signup},
    { path: '/profile', component: Profile},
    { path: '/users', component: Users}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
