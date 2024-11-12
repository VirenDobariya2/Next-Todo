import { serialize } from "cookie";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";

export const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Nextjs",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DataBase connected on ${connection.host}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export const cookieSetter = (res, token, set) => {
  res.serHeader(
    "Set-Cookie",
    serialize("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const generateToken = (user) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie.split("=")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
};
