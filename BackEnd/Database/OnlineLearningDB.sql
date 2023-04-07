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
    image VARCHAR(500),
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
    date DATETIME NOT NULL,
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
    date DATETIME NOT NULL,
    upvote INT NOT NULL DEFAULT 0,
    downvote INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

CREATE TABLE PostVotes (
	postVote_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    vote BIT NOT NULL,
    CONSTRAINT UC_PostVotes UNIQUE (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

CREATE TABLE CommentVotes (
	commentVote_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    vote BIT NOT NULL,
    CONSTRAINT UC_CommentVotes UNIQUE (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (comment_id) REFERENCES Comments(comment_id)
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
    transaction_id varchar(20),
    date DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    payer_id varchar(20),
    email_payment varchar(50),
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
	description VARCHAR(MAX) NOT NULL,
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
    trueAnswer VARCHAR(100) NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id)
);


-- create the StudentAnswers table
CREATE TABLE StudentAnswers (
    studentAnswer_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    choice_value VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (question_id) REFERENCES Questions(question_id)
);






