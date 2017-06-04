CREATE TABLE answers (
  id          SERIAL NOT NULL,
  answer_text text NOT NULL UNIQUE,
  lectureid   int4,
  PRIMARY KEY (id));
CREATE TABLE groups (
  id     SERIAL NOT NULL,
  name   text NOT NULL UNIQUE,
  roleid int4 NOT NULL,
  CONSTRAINT id
    PRIMARY KEY (id));
CREATE TABLE lectures (
  id        SERIAL NOT NULL,
  name      text NOT NULL,
  path      text NOT NULL UNIQUE,
  subjectid int4 NOT NULL,
  PRIMARY KEY (id));
CREATE TABLE questions (
  id            SERIAL NOT NULL,
  question_text text NOT NULL UNIQUE,
  PRIMARY KEY (id));
CREATE TABLE roles (
  id   SERIAL NOT NULL,
  name text NOT NULL UNIQUE,
  PRIMARY KEY (id));
COMMENT ON COLUMN roles.name IS 'editor
student';
CREATE TABLE subjects (
  id   SERIAL NOT NULL,
  name text NOT NULL UNIQUE,
  PRIMARY KEY (id));
CREATE TABLE tests (
  id                     SERIAL NOT NULL,
  subjectid              int4 NOT NULL,
  name                   text NOT NULL,
  module                 int4,
  duration               time NOT NULL,
  count_answers_for_pass int4,
  PRIMARY KEY (id));
COMMENT ON TABLE tests IS 'Тест, который дается на тестировании';
COMMENT ON COLUMN tests.count_answers_for_pass IS 'Количество правильных ответов, которые должен дать экзаменуемый, чтобы успешно сдать экзамен';
CREATE TABLE tests_content (
  testid     int4 NOT NULL,
  questionid int4 NOT NULL,
  answerid   int4 NOT NULL,
  is_correct bool DEFAULT 'False' NOT NULL,
  PRIMARY KEY (testid,
  questionid,
  answerid));
CREATE TABLE user_testing_results (
  id                   SERIAL NOT NULL,
  user_testingsid      int4 NOT NULL,
  questionid           int4 NOT NULL,
  user_answerid        int4 NOT NULL,
  correct_answerid     int4 NOT NULL,
  time_spent_on_answer timestamp NOT NULL,
  PRIMARY KEY (id));
COMMENT ON TABLE user_testing_results IS 'Информация об ответах пользователя на вопросы при тестировании';
CREATE TABLE user_testings (
  id          SERIAL NOT NULL,
  testid      int4 NOT NULL,
  userid      int4 NOT NULL,
  date_start  timestamp NOT NULL,
  date_finish timestamp,
  is_passed   bool DEFAULT 'False',
  report_path text UNIQUE,
  PRIMARY KEY (id));
COMMENT ON TABLE user_testings IS 'Хранит событие "тестирование", когда пользователь начинает прохождение теста';
CREATE TABLE users (
  id       SERIAL NOT NULL,
  name     text NOT NULL,
  login    text NOT NULL UNIQUE,
  password text NOT NULL,
  groupid  int4 NOT NULL,
  PRIMARY KEY (id));
CREATE VIEW subjects_and_lectures AS
SELECT
	subjects.id,
	subjects.name,
	lectures.id AS lecture_id,
	lectures.name AS lecture_name,
	lectures.path
FROM
	subjects INNER JOIN
	lectures ON subjects.id = lectures.subjectid;
CREATE VIEW test_content AS
SELECT
	tests.id AS testid,
	tests.name AS test_name,
	tests.duration,
	tests.subjectid,
	subjects.name AS subject_name,
	questions.id AS questionid,
	questions.question_text,
	answers.id AS answerid,
	answers.answer_text,
	tests_content.is_correct
FROM
	tests INNER JOIN
	tests_content ON tests.id = tests_content.testid INNER JOIN
	subjects ON tests.subjectid = subjects.id INNER JOIN
	questions ON tests_content.questionid = questions.id INNER JOIN
	answers ON tests_content.answerid = answers.id;
CREATE VIEW userinfo AS
SELECT
	users.id,
	users.name,
	users.login,
	users.password,
	roles.id AS roleid,
	roles.name AS rolename,
	groups.id AS groupid,
	groups.name AS groupname
FROM
	users INNER JOIN
	groups ON users.groupid = groups.id INNER JOIN
	roles ON groups.roleid = roles.id
ORDER BY
	users.name ASC;
CREATE INDEX answers_lectureid
  ON answers (lectureid);
CREATE INDEX groups_roleid
  ON groups (roleid);
CREATE INDEX lectures_subjectid
  ON lectures (subjectid);
CREATE UNIQUE INDEX tests
  ON tests (subjectid, name);
CREATE INDEX tests_subjectid
  ON tests (subjectid);
CREATE INDEX user_testing_results_user_testingsid
  ON user_testing_results (user_testingsid);
CREATE INDEX user_testing_results_questionid
  ON user_testing_results (questionid);
CREATE INDEX user_testing_results_user_answerid
  ON user_testing_results (user_answerid);
CREATE INDEX user_testing_results_correct_answerid
  ON user_testing_results (correct_answerid);
CREATE INDEX user_testings_testid
  ON user_testings (testid);
CREATE INDEX user_testings_userid
  ON user_testings (userid);
CREATE INDEX users_groupid
  ON users (groupid);
ALTER TABLE user_testing_results ADD CONSTRAINT FKuser_testi767563 FOREIGN KEY (questionid) REFERENCES questions (id);
ALTER TABLE user_testing_results ADD CONSTRAINT FKuser_testi299932 FOREIGN KEY (user_answerid) REFERENCES answers (id);
ALTER TABLE user_testing_results ADD CONSTRAINT FKuser_testi369783 FOREIGN KEY (correct_answerid) REFERENCES answers (id);
ALTER TABLE tests_content ADD CONSTRAINT FKtests_cont256678 FOREIGN KEY (testid) REFERENCES tests (id);
ALTER TABLE tests_content ADD CONSTRAINT FKtests_cont278356 FOREIGN KEY (questionid) REFERENCES questions (id);
ALTER TABLE tests_content ADD CONSTRAINT FKtests_cont297322 FOREIGN KEY (answerid) REFERENCES answers (id);
ALTER TABLE groups ADD CONSTRAINT "группа обладает правами" FOREIGN KEY (roleid) REFERENCES roles (id);
ALTER TABLE user_testing_results ADD CONSTRAINT "Информация о тестировании юзера" FOREIGN KEY (user_testingsid) REFERENCES user_testings (id);
ALTER TABLE lectures ADD CONSTRAINT "Лекция по предмету" FOREIGN KEY (subjectid) REFERENCES subjects (id);
ALTER TABLE answers ADD CONSTRAINT "Ответ содержится в лекции" FOREIGN KEY (lectureid) REFERENCES lectures (id);
ALTER TABLE user_testings ADD CONSTRAINT "Тест выдается на тестировании" FOREIGN KEY (testid) REFERENCES tests (id);
ALTER TABLE tests ADD CONSTRAINT "тест по предмету" FOREIGN KEY (subjectid) REFERENCES subjects (id);
ALTER TABLE users ADD CONSTRAINT "юзер находится в группе" FOREIGN KEY (groupid) REFERENCES groups (id);
ALTER TABLE user_testings ADD CONSTRAINT "юзер проходит тестирование" FOREIGN KEY (userid) REFERENCES users (id);
