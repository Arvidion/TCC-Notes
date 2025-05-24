import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { username, password, confirm_password } = req.body;
  
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Password tidak sama" });
  }
  
  const hashPassword = await bcrypt.hash(password, 5);

  try {
    const data = await Users.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User Created",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      accessToken,
      message: "Login Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    
    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) return res.status(403).json({ message: "User not found" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const { id, username } = user;
      const accessToken = jwt.sign(
        { id, username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; 
    if (!refreshToken) return res.sendStatus(204);

    const data = await Users.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!data) return res.status(204).json("User not found");
    await Users.update({ refresh_token: null }, { where: { id: data.id } });
    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logout",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

