import express from "express";
import * as controller from "../controllers/authController.js";
import * as task from "../controllers/TaskController.js";
import * as project from "../controllers/ProjectController.js";
import * as tag from "../controllers/TagController.js";
import { validateTokenMiddleware } from "../middleware/auth.middleware.js";

const routes = express.Router();

/*POST Methods*/
routes.post("/register", controller.register);
routes.post("/login", controller.login);
routes.post("/task", validateTokenMiddleware, task.CreateTask);
routes.post("/subtask", validateTokenMiddleware, task.CreateSubtask);
routes.post("/project", validateTokenMiddleware, project.CreateProject);
routes.post("/tasktag", validateTokenMiddleware, tag.AddTaskTag);
routes.post("/projecttag", validateTokenMiddleware, tag.AddProjectTag);

/*GET Methods*/
routes.get("/tasks", validateTokenMiddleware, task.getAllTask);
routes.get("/task/:taskId", validateTokenMiddleware, task.getTaskByID);
routes.get("/projects", validateTokenMiddleware, project.getAllProject);
routes.get(
  "/project/:projectId",
  validateTokenMiddleware,
  project.getProjectByID
);

/*PUT Methods*/
routes.put("/task/:taskId", validateTokenMiddleware, task.UpdateTaskByID);
routes.put("/subtask", validateTokenMiddleware, task.UpdateSubtask);

/*DELETE Methods*/
routes.delete("/task", validateTokenMiddleware, task.DeleteTaskByID);
routes.delete("/tasktag", validateTokenMiddleware, tag.DeleteTaskTag);
routes.delete("/projecttag", validateTokenMiddleware, tag.DeleteProjectTag);
export default routes;
