const usersService = require("../services/users-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UsersController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.badRequest("error while validation");
      }

      const { email, password } = req.body;
      const userData = await usersService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }

  activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      if (!activationLink) {
        throw ApiError.badRequest("activation link not found");
      }
      usersService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

 async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await usersService.login(email, password);
      if (!email || !password) {
        throw ApiError.badRequest("email and password are required");
      }
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const token = usersService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }

  getAllUsers(req, res, next) {
    try {
      const users = usersService.getAllUsers();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = usersService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UsersController();
