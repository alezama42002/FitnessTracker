import RefreshToken from "../models/refreshTokensModel.js";

// Adds a refreshToken to the database
const addToken = async (refreshToken) => {
  return await RefreshToken.create({
    Token: refreshToken,
  });
};

// Deletes a refreshToken from the database
const deleteToken = async (refreshToken) => {
  return await RefreshToken.destroy({
    where: {
      Token: refreshToken,
    },
  });
};

// Finds a specific refreshToken from the database
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
