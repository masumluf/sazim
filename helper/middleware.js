const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkUniqueEmail = async (req, res, next) => {
  let { email } = req.body;
  try {
    let result = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (result) {
      return res.status(240).send("Email Address Already in Use");
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json("Server Busy At The Moment");
  }
};
