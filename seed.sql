-- Create a table
CREATE TABLE "users"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "first_name" VARCHAR(255)          NOT NULL,
    "last_name"  VARCHAR(255)          NOT NULL,
    "role"       VARCHAR(255)          NOT NULL,
    "address"    VARCHAR(255)          NOT NULL,
    "phone"      VARCHAR(255)          NOT NULL,
    "email"      VARCHAR(255)          NOT NULL,
    "password"   VARCHAR(255)          NOT NULL,
    "time"       INTEGER

);

INSERT INTO "users" ("first_name", "last_name", "role", "address", "phone", "email", "password")
VALUES ('Rezaul', 'karim', 'student', 'Nikunju-2', '01631046477', 'masum.luf@gmail.com',
        '$2b$11$ErMkrWT24nXa.kETuuviB.Mj1C7si.C76h7qK5dMxnNyI8NgIiFrm'),
       ('Masum', 'karim', 'teacher', 'Mohakhali', '01913198340', 'masum.lxin@yahoo.com',
        '$2b$11$ErMkrWT24nXa.kETuuviB.Mj1C7si.C76h7qK5dMxnNyI8NgIiFrm');


-- Drop schema
DROP TABLE "users";
