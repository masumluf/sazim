const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { parse } = require("dotenv");
const {
  helperMethodForFetcingProducts,
  checkUserAvailability,
  checkLoginPassword,
  generateToken,
  updateInformationWithId,
  checkStudentDuplicateEnrolment,
  checkEnrolmentCount,
  checkTeacherEnrolmentCount,
  sortGroupMember,
} = require("../helper");

const { relationalKeyword } = require("../helper/keyword");

exports.helloWorld = async (_, res) => {
  res.send("Hello World");
};

exports.fetchAllProducts = async (_, res) => {
  try {
    let resultWithRelationalTable = await helperMethodForFetcingProducts(
      relationalKeyword,
      false,
    );

    res.status(201).json(resultWithRelationalTable);
  } catch (e) {
    console.log(e);
    res.status(500).send(false);
  }
};

exports.fetchProductById = async (req, res) => {
  let { id } = req.params;

  try {
    let singleProductList = await helperMethodForFetcingProducts(
      relationalKeyword,
      true,
      parseInt(id),
    );

    res.status(201).json(singleProductList);
  } catch (e) {
    console.log(e);
    res.status(500).send(false);
  }
};

exports.signUp = async (req, res) => {
  let { first_name, last_name, email, address, phone, password, role } =
    req.body;

  try {
    let hashPassword = await bcrypt.hash(password, 8);
    const job = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        address,
        phone,
        password: hashPassword,
        role,
      },
    });
    //console.log(req.body);
    //console.log(job);
    return res.status(201).send("User created successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Busy");
  }
};

exports.signIn = async (req, res) => {
  let { email, password } = req.body;

  try {
    let hashPassword = await bcrypt.hash(password, 8);
    const user = await checkUserAvailability(email);

    if (!user) {
      return res.status(240).send("User Not Found");
    }

    const checkPassword = await checkLoginPassword(password, user?.password);

    if (!checkPassword) {
      return res.status(244).send("Wrong Credentials");
    }

    let token = await generateToken(user);

    if (!token) {
      return res.status(250).send("Token Generation Failed");
    }

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: `${user.first_name + " " + user.last_name}`,
        role: user.role,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Busy");
  }
};

exports.getProfile = async (req, res) => {
  let { id } = req.params;

  try {
    let profile = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(201).send(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Busy");
  }
};

exports.profileUpdate = async (req, res) => {
  let { first_name, id, last_name, email, address, phone, password } = req.body;

  //console.log(req.body);

  try {
    let hashPassword = await bcrypt.hash(password, 8);

    let obj = {
      first_name,
      last_name,
      email,
      address,
      phone,
      password: hashPassword,
    };

    if (await updateInformationWithId("user", id, obj)) {
      return res.status(201).send(true);
    } else {
      return res.status(422).send(false);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(true);
  }
};

exports.getSubjectName = async (__, res) => {
  try {
    let results = await prisma.subject.findMany();
    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send(false);
  }
};

exports.getTeacherBySubject = async (req, res) => {
  let { id } = req.params;

  try {
    let results = await prisma.subjectByTeacher.findMany({
      where: {
        subjectId: parseInt(id),
      },
      select: {
        userId: true,
      },
      // include: {
      //   subject: true,
      // },
    });

    //console.log();

    let teacherProfile = await prisma.user.findMany({
      where: {
        id: { in: results.map((result) => result.userId) },
      },
      select: {
        first_name: true,
        last_name: true,
        id: true,
      },
    });

    return res.status(200).send(teacherProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).send(false);
  }
};

exports.studentSubjectEnrolment = async (req, res) => {
  let { subjectid, id } = req.params;

  //console.log(subjectid, id);

  try {
    const checkDuplication = await prisma.subjectByTeacher.findFirst({
      where: {
        AND: [
          {
            subjectId: parseInt(subjectid),
          },
          {
            userId: parseInt(id),
          },
        ],
      },
    });

    if (checkDuplication) {
      //console.log(checkDuplication);
      return res.status(203).send(true);
    }

    const job = await prisma.subjectByTeacher.create({
      data: {
        subjectId: parseInt(subjectid),
        userId: parseInt(id),
      },
    });
    if (job) {
      return res.status(201).send(true);
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).send(false);
  }
};

exports.addSubjectToProfile = async (req, res) => {
  let { subjectid, id } = req.params;

  //console.log(subjectid, id);

  try {
    const checkDuplication = await prisma.subjectByTeacher.findFirst({
      where: {
        AND: [
          {
            subjectId: parseInt(subjectid),
          },
          {
            userId: parseInt(id),
          },
        ],
      },
    });

    if (checkDuplication) {
      //console.log(checkDuplication);
      return res.status(203).send(true);
    }

    const job = await prisma.subjectByTeacher.create({
      data: {
        subjectId: parseInt(subjectid),
        userId: parseInt(id),
      },
    });
    if (job) {
      return res.status(201).send(true);
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).send(false);
  }
};

exports.subjectEnrolment = async (req, res) => {
  let { subjectId, teacherId, id } = req.params;

  try {
    if (await checkStudentDuplicateEnrolment(subjectId, id)) {
      return res.status(203).send(true);
    }

    if ((await checkEnrolmentCount(subjectId, id)) === false) {
      return res.status(204).send(true);
    }

    const job = await prisma.enrolment.create({
      data: {
        subjectId: parseInt(subjectId),
        teacherId: parseInt(teacherId),
        userId: parseInt(id),
      },
    });
    if (job) {
      return res.status(201).send(true);
    }
  } catch (error) {
    return res.status(500).send(false);
  }
};

exports.arrangeMark = async (req, res) => {
  let { subjectId, id } = req.params;

  try {
    if (await checkTeacherEnrolmentCount(subjectId, id)) {
      const job = await prisma.enrolment.findMany({
        where: {
          AND: [
            {
              subjectId: parseInt(subjectId),
            },
            {
              teacherId: parseInt(id),
            },
          ],
        },

        select: {
          mark: true,
          subjectId: true,
          id: true,
          user: {
            select: {
              id: true,
              first_name: true,
            },
          },
        },
      });
      if (job) {
        return res.status(200).send(job);
      }
    } else {
      return res.status(201).send(true);
    }

    //console.log(await checkTeacherEnrolmentCount(subjectId, id));
  } catch (error) {
    console.log(error);
    return res.status(500).send(false);
  }
};

exports.markUpdate = async (req, res) => {
  let { id, grade } = req.body;
  try {
    let obj = { mark: grade };
    if (await updateInformationWithId("enrolment", id, obj)) {
      return res.status(201).send(true);
    } else {
      return res.status(422).send(false);
    }
  } catch (error) {
    return res.status(500).send(false);
  }
};

const groupPermute = (nums) => {
  let result = [];
  if (nums.length === 0) return [];
  if (nums.length === 1) return [nums];
  if (nums.length === 2 || nums.length === 3) return [nums];
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const remainingNums = nums.slice(0, i).concat(nums.slice(i + 2));
    const remainingNumsPermuted = groupPermute(remainingNums);
    for (let j = 0; j < remainingNumsPermuted.length; j++) {
      const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
      result.push(permutedArray);
    }
  }
  return result;
};

exports.makeGroup = async (req, res) => {
  let { subjectId, teacherId, magicNumber } = req.params;

  try {
    //console.log(subjectId, teacherId, magicNumber);
    const job = await prisma.enrolment.findMany({
      where: {
        AND: [
          {
            subjectId: parseInt(subjectId),
          },
          {
            teacherId: parseInt(teacherId),
          },
        ],
      },

      select: {
        mark: true,
        user: {
          select: {
            first_name: true,
          },
        },
      },
    });

    console.log(job.length);

    if (job.length === 0) {
      return res.status(204).send(true);
    }

    if (job.length <= 11) {
      return res.status(206).send(true);
    }

    let list = sortGroupMember(job, magicNumber);

    if (job.length > 0 && list.length === 0) {
      return res.status(203).send(true);
    }

    //console.log(list);

    let myArr = groupPermute(list);

    return res.status(200).send(myArr);

    //console.log(job);
  } catch (error) {
    console.log(error);
    return res.status(500).send(false);
  }
};
