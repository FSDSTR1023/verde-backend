import jwt from "jsonwebtoken";

export const newJWT = (info = {}, expiresIn = '8h') => {
    return jwt.sign(info, process.env.JWT_SIGN, { expiresIn });
};

export const valitateJWT = (token) => {
    token = token.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SIGN);
};