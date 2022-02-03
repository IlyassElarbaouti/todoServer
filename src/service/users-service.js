const usersRepository = require("../repository/users-repository");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  registration(email, password) {
    const candidate = usersRepository.users.find(
      (user) => user.email === email
    );
    if (candidate) {
      throw ApiError.badRequest(
        `user already registred with this email:${email}`
      );
    }
    const hashPassword = bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = usersRepository.createUser(
      email,
      hashPassword,
      activationLink
    );
    try {
      mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/activate/${activationLink}`
      );
    } catch (error) {
      console.log(error);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  activate(activationLink) {
    const user = usersRepository.users.find(
      (user) => user.activationLink === activationLink
    );
    console.log(activationLink);
    console.log(usersRepository.users);
    if (!user) {
      throw ApiError.badRequest("no activation link found");
    }
    user.isActivated = true;
  }

  login(email, password) {
    const user = usersRepository.users.find((user) => user.email === email);
    if (!user) {
      throw ApiError.badRequest("no user found");
    }
    const isPassEquals = bcrypt.compare(String(password), String(user.password));
    if (!isPassEquals) {
      throw ApiError.badRequest("incorrect password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token
  }
}
module.exports = new UserService();
