-- CreateTable
CREATE TABLE "Subject"
(
    "id"     SERIAL       NOT NULL,
    "name"   VARCHAR(255) NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam"
(
    "id"        SERIAL NOT NULL,
    "userId"    INTEGER,
    "subjectId" INTEGER,
    "mark"      TEXT   NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User"
(
    "id"         SERIAL NOT NULL,
    "role"       TEXT   NOT NULL,
    "time"       TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT,
    "last_name"  TEXT,
    "address"    TEXT,
    "phone"      TEXT,
    "password"   TEXT,
    "email"      TEXT,

    PRIMARY KEY ("id")
);

INSERT INTO "User" ("first_name", "last_name", "role", "address", "phone", "email", "password")
VALUES ('Rezaul', 'karim', 'student', 'Nikunju-2', '01631046477', 'masum.luf@gmail.com',
        '$2b$11$ErMkrWT24nXa.kETuuviB.Mj1C7si.C76h7qK5dMxnNyI8NgIiFrm'),
       ('Masum', 'karim', 'teacher', 'Mohakhali', '01913198340', 'masum.lxin@yahoo.com',
        '$2b$11$ErMkrWT24nXa.kETuuviB.Mj1C7si.C76h7qK5dMxnNyI8NgIiFrm');

-- AddForeignKey
ALTER TABLE "Subject"
    ADD FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam"
    ADD FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam"
    ADD FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
