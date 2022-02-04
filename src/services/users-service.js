const usersRepository = require("../repositories/users-repository");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const mailService = require("./mail-service");
const tokenService = require("./tokens-service");
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
    let hashPassword = bcrypt.hash(password, 3);
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

  async getHashPassword(password) {
    await bcrypt.hash(password, 3).then((hashPass) => hashPass);
  }

  activate(activationLink) {
    const user = usersRepository.users.find(
      (user) => user.activationLink === activationLink
    );
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
    const isPassEquals = bcrypt.compare(
      String(password),
      String(user.password)
    );
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
    return token;
  }

  getAllUsers() {
    const users = usersRepository.users;
    return users;
  }

  refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromRepo = tokenService.findToken(refreshToken);
    if (!userData || tokenFromRepo) {
      throw ApiError.UnauthorizedError();
    }
    const user = usersRepository.find((user) => user.id === userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
module.exports = new UserService();
