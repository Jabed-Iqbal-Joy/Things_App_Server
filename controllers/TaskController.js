import express from "express";

//Database Connect
import getDB from "../database.js";
const db = getDB();

/**
 * Create Task
 * POST: http://localhost:3000/api/task */
export async function CreateTask(req, res) {
  // req.body.userId = req.user_id;
  const user_id = req.user_id;
  console.log(JSON.stringify(req.body));
  req.body.when = req.body.when === undefined ? "Anytime" : req.body.when;
  try {
    const task = await db.task.create({
      data: { ...req.body, userId: user_id },
    });
    return res
      .status(201)
      .json({ message: `Task is Created by ${user_id}`, id: task.id });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

/**
 * Get All Task
 * Get: http://localhost:3000/api/task */
export async function getAllTask(req, res) {
  try {
    const user_id = req.user_id;
    console.log(user_id);
    const tasks = await db.task.findMany({
      where: {
        userId: user_id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json({
      tasks,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * GetTaskByID
 * Get: http://localhost:3000/api/task/taskId*/
export async function getTaskByID(req, res) {
  try {
    const id = req.params.taskId;
    const task = await db.task.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        subtasks: {
          select: {
            id: true,
            name: true,
          },
        },
        task_tag: {
          select: { tag: { select: { name: true } } },
        },
      },
    });
    console.log(task);
    return res.status(200).json({ task });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ message: err.message });
  }
}

/**
 * UpdateTaskByID
 * PUT: http://localhost:3000/api/task/taskId*/
export async function UpdateTaskByID(req, res) {
  try {
    const id = req.params.taskId;
    const row = await db.task.findUnique({
      where: {
        id,
      },
    });
    const newRow = { ...row, ...req.body };
    const updateRow = await db.task.update({
      where: {
        id,
      },
      data: newRow,
    });
    res.status(200).json({ message: "Update Task Successfully", updateRow });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

/**
 * DeleteTaskByID
 * PUT: http://localhost:3000/api/task/taskId*/
export async function DeleteTaskByID(req, res) {
  try {
    const id = req.body.taskId;
    const delete_task = await db.task.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Delete Task Successfully", delete_task });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

/**
 * Create SubTask
 * POST: http://localhost:3000/api/subtask
 * */
export async function CreateSubtask(req, res) {
  // const user_id = req.user_id;
  try {
    console.log(req.body);
    const subtask = await db.subtask.create({
      data: req.body,
    });
    return res.status(201).json({ subtask });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * Create SubTask
 * PUT: http://localhost:3000/api/subtask
 * */
export async function UpdateSubtask(req, res) {
  // const user_id = req.user_id;
  // const taskId = req.body.taskId;
  try {
    const id = req.body.subtaskId;
    const row = await db.subtask.findUnique({
      where: {
        id,
      },
    });
    row = { ...row, ...req.body.name };
    const updatedRow = await db.subtask.update({
      data: row,
      where: {
        id,
      },
    });
    return res.status(201).json({ updatedRow });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
