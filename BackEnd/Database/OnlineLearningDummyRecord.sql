-- Users table
INSERT INTO Users (username, password, role, image, email, fullname, dob)
VALUES
('freefire', '123', 'student', 'https://play-lh.googleusercontent.com/FIldEX6IcJEju0BeWPhXZ3duzgxm9_fTtwPiIesBT9ddwFpeFw0FAjEpYU9vmqccpe7h', 'johndoe@example.com', 'John Doe', '1990-05-20'),
('aov', '123', 'student', 'https://play-lh.googleusercontent.com/S3GPwY1-mc5876ZnMk65-VrG3Xlh1R8zgK-Q_LlnbjZ7llyyv0ZGWIlNnBM7LckMMzYy', 'janedoe@example.com', 'Jane Doe', '1995-02-10'),
('mcill', '123', 'teacher', 'https://i.ytimg.com/vi/lf8ncqFCP3E/hqdefault.jpg', 'bobsmith@example.com', 'Bob Smith', '1988-09-30'),
('satan', '123', 'student', 'https://sohanews.sohacdn.com/k:2015/img20150918114358921/quy-satan-va-nhung-bi-an-khien-ban-rung-minh.jpg', 'alicejones@example.com', 'Alice Jones', '1992-11-15'),
('yugi', '123', 'student', 'https://uploads3.yugioh.com/character/3/detail/detail/yamiyugi-l.png?1371744397', 'mikebrown@example.com', 'Mike Brown', '1985-07-25'),
('admin', '123', 'admin', 'https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png', 'sarahlee@example.com', 'Sarah Lee', '1998-04-05'),
('teacher', '123', 'teacher', 'https://cdn-icons-png.flaticon.com/512/2941/2941658.png', 'davidkim@example.com', 'David Kim', '1993-01-01'),
('jennynguyen', '123', 'teacher', 'https://cdn-icons-png.flaticon.com/512/4165/4165012.png', 'jennynguyen@example.com', 'Jenny Nguyen', '1994-06-12'),
('jameslee', '123', 'student', 'https://media.vov.vn/sites/default/files/styles/large/public/2021-01/bts_jungkook_pics.jpg', 'jameslee@example.com', 'James Lee', '1996-09-18'),
('elizabethchen', '123', 'admin', 'https://daihocdaivietsaigon.edu.vn/wp-content/uploads/Co-vo-quoc-dan-Eimi-Fukada-khoe-nhan-cuoi-khien.jpg', 'elizabethchen@example.com', 'Elizabeth Chen', '1991-12-22');


-- Posts table
INSERT INTO Posts (user_id, title, content, date, upvote, downvote)
VALUES
(1, 'My First Post', 'This is my first post on this website. I''m excited to start sharing my thoughts and ideas with everyone!', '2022-01-05 10:30:00', 10, 2),
(1, 'New Year''s Resolutions', 'It''s that time of year again! What are your New Year''s resolutions?', '2022-01-10 14:45:00', 25, 8),
(2, 'Favorite Books of 2021', 'Here are my favorite books that I read in 2021. What were your favorites?', '2022-01-15 16:20:00', 8, 1),
(3, 'Tips for Studying', 'As a student, I''ve found these tips helpful for studying effectively. Do you have any additional tips?', '2022-01-20 08:00:00', 15, 4),
(4, 'Travel Recommendations', 'I''ve been to some amazing places over the past year. Here are my recommendations for where to travel!', '2022-01-25 12:00:00', 6, 0),
(5, 'My Favorite Recipes', 'I love cooking and experimenting with new recipes. Here are some of my favorite dishes!', '2022-02-01 17:30:00', 20, 3),
(6, 'Dealing with Anxiety', 'Anxiety can be tough to deal with. Here are some strategies that have helped me manage my anxiety.', '2022-02-05 09:15:00', 11, 2),
(7, 'Movie Recommendations', 'Here are some of my favorite movies that I''ve watched recently. What are some of yours?', '2022-02-10 14:00:00', 16, 6),
(8, 'Career Advice', 'As someone who has been working in the industry for a few years, here is my advice for those just starting out in their careers.', '2022-02-15 11:30:00', 9, 1),
(9, 'Fitness Journey', 'I''ve been on a fitness journey over the past year and wanted to share some of my progress and tips for staying motivated.', '2022-02-20 16:45:00', 7, 0);


-- Comments table
INSERT INTO Comments (user_id, post_id, content, date, upvote, downvote)
VALUES
(1, 1, 'Great post! Looking forward to reading more from you.', '2022-01-05 11:00:00', 5, 0),
(2, 1, 'I''m also excited to start sharing my ideas. Thanks for the inspiration!', '2022-01-05 12:30:00', 3, 0),
(3, 2, 'I loved reading these resolutions. I might have to steal a few for myself!', '2022-01-11 08:00:00', 10, 2),
(4, 2, 'These are great ideas. I''m definitely going to try to read more this year!', '2022-01-11 10:00:00', 7, 1),
(5, 3, 'Thanks for sharing these recommendations. I''m always looking for new books to read!', '2022-01-16 13:45:00', 2, 0),
(6, 4, 'These are some great tips. I''ve struggled with studying in the past, so I''m excited to try these out!', '2022-01-21 09:15:00', 8, 1),
(7, 5, 'These recipes look amazing. I can''t wait to try them out!', '2022-02-02 09:00:00', 3, 0),
(8, 6, 'Thank you for sharing these strategies. I struggle with anxiety myself and will definitely try some of these out.', '2022-02-06 15:00:00', 6, 0),
(9, 7, 'I love all of these movies! Have you seen any other good ones lately?', '2022-02-12 11:30:00', 9, 2),
(10, 9, 'Thanks for sharing your fitness journey. It''s inspiring to see someone make progress and stay motivated!', '2022-02-21 10:00:00', 4, 0);


---- PostVotes table
--INSERT INTO PostVotes (user_id, post_id, vote)
--VALUES
--    (1, 1, 1),
--    (2, 1, 0),
--    (3, 1, 1),
--    (1, 2, 1),
--    (3, 2, 1),
--    (1, 3, 0),
--    (2, 3, 1),
--    (3, 3, 1);

---- CommentVotes table
--INSERT INTO CommentVotes (user_id, comment_id, vote)
--VALUES
--    (1, 1, 1),
--    (2, 1, 1),
--    (3, 1, 0),
--    (1, 2, 1),
--    (2, 2, 0),
--    (3, 2, 1),
--    (1, 3, 0),
--    (2, 3, 0),
--    (3, 3, 1);

-- Courses table
insert into courses values (2, 'Introductory Knowledge of IT' , 12.5 , 'https://files.fullstack.edu.vn/f8-prod/courses/7.png' , 'To have an overview of the IT industry - Web programming, you should watch the videos in this course first'),
             (2, 'Basic JavaScript Programming' , 0 , 'https://files.fullstack.edu.vn/f8-prod/courses/1.png' , 'Learning basic Javascript is suitable for people who have never learned programming. With more than 100 lessons and practice exercises after each lesson')

insert into courses values (2, 'HTML CSS from Zero to Hero' , 12.5 , 'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png' , 'In this course, we will together build the interface of 2 websites, The Band & Shopee')
insert into courses values (2, 'Working with Terminal & Ubuntu' , 9.3 , 'https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png' , 'Owning a modern, powerful Terminal in customization and learning how to work with Ubuntu is an important step on the road to becoming a Web Developer')
---- Enrollment table
--INSERT INTO Enrollment (user_id, course_id, date, status)
--VALUES
--    (1, 1, '2022-01-01 12:00:00', 'enrolled'),
--    (2, 1, '2022-01-02 10:00:00', 'enrolled')

-- Chapters table
INSERT INTO Chapters (course_id, title)
VALUES
(1, 'Introduction to Chapter 1'),
(1, 'Chapter 1: Overview'),
(1, 'Chapter 1: Key Concepts'),
(2, 'Introduction to Chapter 2'),
(2, 'Chapter 2: Overview'),
(2, 'Chapter 2: Key Concepts'),
(3, 'Introduction to Chapter 3'),
(3, 'Chapter 3: Overview'),
(3, 'Chapter 3: Key Concepts'),
(4, 'Introduction to Chapter 4');


-- Material table
INSERT INTO Material (chapter_id, title, content, description)
VALUES
(1, 'Chapter 1: Introduction', 'This is the introduction to chapter 1.', 'Introduction to Chapter 1 material'),
(1, 'Chapter 1: Lesson 1', 'This is lesson 1 of chapter 1.', 'Lesson 1 material for Chapter 1'),
(1, 'Chapter 1: Lesson 2', 'This is lesson 2 of chapter 1.', 'Lesson 2 material for Chapter 1'),
(2, 'Chapter 2: Introduction', 'This is the introduction to chapter 2.', 'Introduction to Chapter 2 material'),
(2, 'Chapter 2: Lesson 1', 'This is lesson 1 of chapter 2.', 'Lesson 1 material for Chapter 2'),
(2, 'Chapter 2: Lesson 2', 'This is lesson 2 of chapter 2.', 'Lesson 2 material for Chapter 2'),
(3, 'Chapter 3: Introduction', 'This is the introduction to chapter 3.', 'Introduction to Chapter 3 material'),
(3, 'Chapter 3: Lesson 1', 'This is lesson 1 of chapter 3.', 'Lesson 1 material for Chapter 3'),
(3, 'Chapter 3: Lesson 2', 'This is lesson 2 of chapter 3.', 'Lesson 2 material for Chapter 3'),
(4, 'Chapter 4: Introduction', 'This is the introduction to chapter 4.', 'Introduction to Chapter 4 material');


-- Assignments table
INSERT INTO Assignments (title, chapter_id)
VALUES
('Assignment 1', 1),
('Assignment 2', 1),
('Assignment 3', 2),
('Assignment 4', 2),
('Assignment 5', 3),
('Assignment 6', 3),
('Assignment 7', 4),
('Assignment 8', 4),
('Assignment 9', 5),
('Assignment 10', 5);


-- Questions table
INSERT INTO Questions (assignment_id, content, answerA, answerB, answerC, answerD, trueAnswer)
VALUES
(1, 'What is the capital of France?', 'Paris', 'Madrid', 'Berlin', 'Rome', 'Paris'),
(1, 'What is the largest country in the world?', 'Russia', 'Canada', 'China', 'USA', 'Russia'),
(1, 'What is the smallest country in the world?', 'Vatican City', 'Monaco', 'Liechtenstein', 'San Marino', 'Vatican City'),
(2, 'What is the currency of Japan?', 'Yen', 'Dollar', 'Euro', 'Pound', 'Yen'),
(2, 'What is the highest mountain in the world?', 'Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse', 'Mount Everest'),
(3, 'What is the largest ocean in the world?', 'Pacific', 'Atlantic', 'Indian', 'Arctic', 'Pacific'),
(3, 'What is the capital of Spain?', 'Madrid', 'Barcelona', 'Valencia', 'Seville', 'Madrid'),
(4, 'What is the largest desert in the world?', 'Sahara', 'Arabian', 'Gobi', 'Kalahari', 'Sahara'),
(4, 'What is the largest river in the world?', 'Amazon', 'Nile', 'Yangtze', 'Mississippi', 'Amazon'),
(5, 'What is the capital of Italy?', 'Rome', 'Milan', 'Naples', 'Turin', 'Rome');
