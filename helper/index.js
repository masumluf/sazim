const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

dotenv.config();

exports.helperMethodForFetcingProducts = async (
  obj = {},
  singleProduct = false,
  id = null,
) => {
  try {
    if (singleProduct) {
      return await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          transactions: true,
        },
      });
    } else {
      return await prisma.product.findMany(obj);
    }
  } catch (e) {
    //console.log(e);
    return false;
  }
};

exports.helperMethodForFetchingTransactions = async () => {
  return await prisma.transaction.findMany();
};

exports.helperMethodForCreateProduct = async (name) => {
  return prisma.product.create({
    data: {
      name,
    },
  });
};

exports.checkUserAvailability = async (email) => {
  try {
    let result = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

exports.checkLoginPassword = async (password, userPassword) => {
  // console.log(password, userPassword);
  try {
    let isPassword = await bcrypt.compare(password, userPassword);

    console.log(isPassword);

    if (!isPassword) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.generateToken = async (user) => {
  let mobileApp = false;

  try {
    return jwt.sign(
      {
        _id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: mobileApp === true ? "300d" : "7d",
      },
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.updateInformationWithId = async (md, id, obj) => {
  var result = null;
  try {
    if (md === "user") {
      result = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: obj,
      });
    }

    if (md === "enrolment") {
      result = await prisma.enrolment.update({
        where: {
          id: parseInt(id),
        },
        data: obj,
      });
    }

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.checkStudentDuplicateEnrolment = async (subjectId, id) => {
  try {
    const checkDuplication = await prisma.enrolment.findFirst({
      where: {
        AND: [
          {
            subjectId: parseInt(subjectId),
          },

          {
            userId: parseInt(id),
          },
        ],
      },
    });
    return checkDuplication ? true : false;
  } catch (error) {
    return false;
  }
};

exports.checkEnrolmentCount = async (subjectId, id) => {
  try {
    const count = await prisma.enrolment.count({
      where: {
        AND: [
          {
            subjectId: parseInt(subjectId),
          },

          {
            userId: parseInt(id),
          },
        ],
      },
    });
    return count > 12 ? true : false;
  } catch (error) {
    return false;
  }
};

exports.checkTeacherEnrolmentCount = async (subjectId, id) => {
  try {
    const count = await prisma.enrolment.count({
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
    });
    //console.log(count);
    return count > 0 ? true : false;
  } catch (error) {
    return false;
  }
};

exports.sortGroupMember = (arr, magicNumber) => {
  var group = [];

  //const magicNumber = 5;

  // for (let i = 0; i < arr.length; i++) {
  //   console.log(parseInt(arr[i].mark));
  // }

  for (let i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].mark) > magicNumber) {
      if (parseInt(arr[i].mark) - magicNumber <= 3) {
        group.push(arr[i]);
      }
    } else {
      if (parseInt(arr[i].mark) - magicNumber >= -3) {
        group.push(arr[i]);
      }
    }
  }

  //console.log(group);

  return group;
};
