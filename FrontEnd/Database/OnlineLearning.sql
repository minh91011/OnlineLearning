-- create the OnlineLearning database
CREATE DATABASE OnlineLearning;

-- switch to the OnlineLearning database
USE OnlineLearning;

-- create the Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL,
    image VARCHAR(100),
	email VARCHAR(100) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	dob Date NOT NULL
);

-- create the Posts table
CREATE TABLE Posts (
    post_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(MAX) NOT NULL,
    datetime DATE NOT NULL,
    upvote INT NOT NULL DEFAULT 0,
    downvote INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- create the Comments table
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content VARCHAR(MAX) NOT NULL,
    datetime DATE NOT NULL,
    upvote INT NOT NULL DEFAULT 0,
    downvote INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- create the Courses table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
	CourseName nvarchar(100) not null,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
	[img] varchar(100),
	[description] nvarchar(max)
);

-- create the Enrollment table
CREATE TABLE Enrollment (
    enrollment_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    datetime DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- create the Chapters table
CREATE TABLE Chapters (
    chapter_id INT PRIMARY KEY IDENTITY(1,1),
    course_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
	
);

-- create the Material table
CREATE TABLE Material (
    material_id INT PRIMARY KEY IDENTITY(1,1),
    chapter_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(MAX) NOT NULL,
    contentType VARCHAR(20) NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id)
);

-- create the Assignments table
CREATE TABLE Assignments (
    assignment_id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(100) NOT NULL,
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id)
);

-- create the Questions table
CREATE TABLE Questions (
    question_id INT PRIMARY KEY IDENTITY(1,1),
    assignment_id INT NOT NULL,
    content VARCHAR(MAX) NOT NULL,
    answerA VARCHAR(100) NOT NULL,
    answerB VARCHAR(100) NOT NULL,
    answerC VARCHAR(100) NOT NULL,
    answerD VARCHAR(100) NOT NULL,
    trueAnswer VARCHAR(1) NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id)
);

-- create the StudentAnswers table
CREATE TABLE StudentAnswers (
    studentAnswer_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    choice_number VARCHAR(1) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (question_id) REFERENCES Questions(question_id)
);


-- insert into Users values('admin', '123', 0, 'aaa') , ('teacher', '123' ,1 ,'bbb') , ('student','123' , 2 , 'ccc')
-- delete from users where 1 = 1
-- insert into Courses values(4, N'Kiến thức nhập môn IT', 2000, 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',N'Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé') ,
--           (4, N'Lập trình C++ cơ bản, nâng cao', 2000, 'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png', N'Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên'),
-- 		  (4, N'HTML CSS từ Zero đến Hero', 2000, 'https://files.fullstack.edu.vn/f8-prod/courses/2.png', N'Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee'),
-- 		  (4, N'Lập Trình JavaScript Cơ Bản', 2000, 'https://files.fullstack.edu.vn/f8-prod/courses/1.png', N'Học Javascript cơ bản phù hợp cho người chưa từng học lập trình'),
-- 		  (4, N'Lập Trình JavaScript Nâng Cao', 2000, 'https://files.fullstack.edu.vn/f8-prod/courses/12.png', N'Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ...')


--select * from Courses


-- select * from Users

