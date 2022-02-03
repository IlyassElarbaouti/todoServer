const usersService = require("../service/users-service");
const usersRepository = require("../repository/users-repository");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("error while validation", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = usersService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      usersService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = usersService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const token = usersService.logout(refreshToken);
      res.clearCookie('refreshToken')
      return res.status(200).json(token)
    }
    catch (e) {
      next(e)
    }
  }
}
module.exports = new UserController();
