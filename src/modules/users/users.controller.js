import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { verifyPassword } from "../../config/plugin/encrypted-password.plugin.js";
import generateJWT from "../../config/plugin/generate-jwt.plugin.js";
import { UserService } from "./users.service.js";

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserService.findOneByEmail(email);

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  const isCorrectPassword = await verifyPassword(password, user.password);

  if (!isCorrectPassword) {
    return next(new AppError("invalid credentials", 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
});

export const findAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await UserService.create({ name, email, password, role });

    const token = await generateJWT(user.id);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
};

export const findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json(user);
});

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    const userUpdated = await UserService.update(user, { name, email });

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await UserService.delete(user);

    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    });
  }
};
