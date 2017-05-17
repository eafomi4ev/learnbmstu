CREATE TABLE answers (
  id          SERIAL NOT NULL,
  answer_text text NOT NULL,
  lectureid   INTEGER NOT NULL,
  PRIMARY KEY (id));
CREATE TABLE groups (
  id     SERIAL NOT NULL,
  name   text NOT NULL UNIQUE,
  roleid INTEGER NOT NULL,
  CONSTRAINT id
    PRIMARY KEY (id));
CREATE TABLE lectures (
  id        SERIAL NOT NULL,
  name      text NOT NULL,
  path      text NOT NULL UNIQUE,
  subjectid INTEGER NOT NULL,
  PRIMARY KEY (id));
CREATE TABLE questions (
  id            SERIAL NOT NULL,
  question_text text NOT NULL,
  PRIMARY KEY (id));
CREATE TABLE roles (
  id   SERIAL NOT NULL,
  name text NOT NULL UNIQUE,
  PRIMARY KEY (id));
COMMENT ON COLUMN roles.name IS 'editor or student';
CREATE TABLE subjects (
  id   SERIAL NOT NULL,
  name text NOT NULL UNIQUE,
  PRIMARY KEY (id));
CREATE TABLE tests (
  id                     SERIAL NOT NULL,
  subjectid              INTEGER NOT NULL,
  name                   text NOT NULL,
  duration               time NOT NULL,
  count_answers_for_pass INTEGER,
  PRIMARY KEY (id));
COMMENT ON TABLE tests IS 'Тест, который дается на тестировании';
COMMENT ON COLUMN tests.count_answers_for_pass IS 'Количество правильных ответов, которые должен дать экзаменуемый, чтобы успешно сдать экзамен';
CREATE TABLE tests_content (
  testid     INTEGER NOT NULL,
  questionid INTEGER NOT NULL,
  answerid   INTEGER NOT NULL,
  is_correct bool DEFAULT 'False' NOT NULL,
  PRIMARY KEY (testid,
  questionid,
  answerid));
CREATE TABLE user_testing_results (
  id                   SERIAL NOT NULL,
  user_testingsid      INTEGER NOT NULL,
  questionid           INTEGER NOT NULL,
  user_answerid        INTEGER NOT NULL,
  correct_answerid     INTEGER NOT NULL,
  time_spent_on_answer timestamp NOT NULL,
  PRIMARY KEY (id));
COMMENT ON TABLE user_testing_results IS 'Информация об ответах пользователя на вопросы при тестировании';
CREATE TABLE user_testings (
  id          SERIAL NOT NULL,
  testid      INTEGER NOT NULL,
  userid      INTEGER NOT NULL,
  date_start  timestamp NOT NULL,
  date_finish timestamp,
  is_passed   bool DEFAULT 'False',
  report_path text,
  PRIMARY KEY (id));
COMMENT ON TABLE user_testings IS 'Хранит событие "тестирование", когда пользователь начинает прохождение теста';
CREATE TABLE users (
  id       SERIAL NOT NULL,
  name     text NOT NULL,
  login    text NOT NULL UNIQUE,
  password text NOT NULL,
  groupid  INTEGER NOT NULL,
  PRIMARY KEY (id));

CREATE INDEX answers_lectureid
  ON answers (lectureid);
CREATE INDEX groups_roleid
  ON groups (roleid);
CREATE INDEX lectures_subjectid
  ON lectures (subjectid);
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

ALTER TABLE tests_content ADD CONSTRAINT FKtests_cont256678 FOREIGN KEY (testid) REFERENCES tests (id);
ALTER TABLE tests_content ADD CONSTRAINT FKtests_cont278356 FOREIGN KEY (questionid) REFERENCES questions (id);
ALTER TABLE tests_content ADD CONSTRAINT FKtests_cont297322 FOREIGN KEY (answerid) REFERENCES answers (id);
ALTER TABLE user_testing_results ADD CONSTRAINT FKuser_testi767563 FOREIGN KEY (questionid) REFERENCES questions (id);
ALTER TABLE user_testing_results ADD CONSTRAINT FKuser_testi299932 FOREIGN KEY (user_answerid) REFERENCES answers (id);
ALTER TABLE user_testing_results ADD CONSTRAINT FKuser_testi369783 FOREIGN KEY (correct_answerid) REFERENCES answers (id);
ALTER TABLE groups ADD CONSTRAINT "группа обладает правами" FOREIGN KEY (roleid) REFERENCES roles (id);
ALTER TABLE user_testing_results ADD CONSTRAINT "Информация о тестировании юзера" FOREIGN KEY (user_testingsid) REFERENCES user_testings (id);
ALTER TABLE lectures ADD CONSTRAINT "Лекция по предмету" FOREIGN KEY (subjectid) REFERENCES subjects (id);
ALTER TABLE answers ADD CONSTRAINT "Ответ содержится в лекции" FOREIGN KEY (lectureid) REFERENCES lectures (id);
ALTER TABLE user_testings ADD CONSTRAINT "Тест выдается на тестировании" FOREIGN KEY (testid) REFERENCES tests (id);
ALTER TABLE tests ADD CONSTRAINT "тест по предмету" FOREIGN KEY (subjectid) REFERENCES subjects (id);
ALTER TABLE users ADD CONSTRAINT "юзер находится в группе" FOREIGN KEY (groupid) REFERENCES groups (id);
ALTER TABLE user_testings ADD CONSTRAINT "юзер проходит тестирование" FOREIGN KEY (userid) REFERENCES users (id);
