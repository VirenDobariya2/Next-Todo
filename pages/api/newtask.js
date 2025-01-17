import { checkAuth, connectDB } from "@/utils/features";
import { Task } from "../../models/Task";
import { asyncError, errorHandler } from "@/middlewares/error";

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only POST Method is allowed");
  
    await connectDB();
  
    const { title, description } = req.body;

    const user = await checkAuth(req);

    if(!title || !description) return errorHandler(res, 400, "Plase Enter All fields")

    if (!user) return errorHandler(res, 401, "Login First");
  
    await Task.create({
      title,
      description,
      user: user._id,
    });
  
    res.json({
      success: true,
      message: "Task Created",
    });
  }
  )
export default handler;
