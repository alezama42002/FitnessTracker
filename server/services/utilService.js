import RefreshToken from "../models/refreshTokensModel.js";

const addToken = async (refreshToken) => {
  return await RefreshToken.create({
    Token: refreshToken,
  });
};

const deleteToken = async (refreshToken) => {
  return await RefreshToken.destroy({
    where: {
      Token: refreshToken,
    },
  });
};

const findToken = async (refreshToken) => {
  const Token = await RefreshToken.findOne({
    where: {
      Token: refreshToken,
    },
  });

  if (Token === null) return false;
  else return true;
};

export default { addToken, deleteToken, findToken };
