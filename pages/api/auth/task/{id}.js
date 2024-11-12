import { checkAuth, connectDB } from "@/utils/features";
import { Task } from "../../models/Task";
import { asyncError, errorHandler } from "@/middlewares/error";

const handler = asyncError(async (req, res) => {

    await connectDB();

    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Login First");

    const taskId = req.query.id;

    const task = await Task.findById(taskId);
    
    if (!task) return errorHandler(res, 404, "Task not found")

    task.isCompleted = !task.isCompleted

  if (req.method === "PUT") {
   
    await task.save()

    res.status(200).json({
        success:true,
        message:"Task Updated Successfully "
    })

  } else if (req.method === "DELETE") {
    
    await task.deleteOne()

    res.status(200).json({
        success:true,
        message:"Task Deleted Successfully "
    })
    
  } else {
    errorHandler(res, 400, "This method is not available");
  }
});

export default handler;
