const tokenRepository = require("../repository/token-repository.js");
const jwt = require("jsonwebtoken");

class TokenService {

  constructor() {
    this.tokenRepository = tokenRepository;
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
    const tokenData=this.tokenRepository.tokens.find(token=>token.user===userId) 
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData
    }
    const token = this.tokenRepository.tokens.push({ user: userId, refreshToken })
    return token
  }

  removeToken(refreshToken) {
    tokenRepository.tokens = tokenRepository.tokens.filter(token => token.refreshToken === refreshToken);
    return tokenRepository.tokens;
  }
}
module.exports = new TokenService();
