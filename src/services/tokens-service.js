const tokensRepository = require("../repositories/tokens-repository.js");
const jwt = require("jsonwebtoken");

class TokensService {
  constructor() {
    this.tokensRepository = tokensRepository;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  saveToken(userId, refreshToken) {
    const tokenData = this.tokensRepository.tokens.find(
      (token) => token.user === userId
    );
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData;
    }
    const token = this.tokensRepository.tokens.push({
      user: userId,
      refreshToken,
    });
    return token;
  }

  removeToken(refreshToken) {
    tokensRepository.tokens = tokensRepository.tokens.filter(
      (token) => token.refreshToken === refreshToken
    );
    return tokensRepository.tokens;
  }

  findToken(refreshToken) {
    const tokenData = tokensRepository.tokens.find(
      (tokens) => tokens.refreshToken === refreshToken
    );
    return tokenData;
  }
}
module.exports = new TokensService();
