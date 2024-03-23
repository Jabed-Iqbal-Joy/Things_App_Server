import express from "express";

//Database Connect
import getDB from "../database.js";
const db = getDB();

/**
 * Create Project
 * POST: http://localhost:3000/api/project */
export async function CreateProject(req, res) {
  const user_id = req.user_id;
  try {
    const project = await db.project.create({
      data: { ...req.body, userId: user_id },
    });
    return res
      .status(201)
      .json({ message: `Project is Created by ${user_id}`, project });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

/**
 * Get All Projects
 * Get: http://localhost:3000/api/projects */
export async function getAllProject(req, res) {
  try {
    const user_id = req.user_id;
    const projects = await db.project.findMany({
      where: {
        userId: user_id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json({
      projects,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

/**
 * GetTaskByID
 * Get: http://localhost:3000/api/project/projectId*/
export async function getProjectByID(req, res) {
  try {
    const id = req.params.projectId;
    const project = await db.project.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        tasks: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      // include: { tasks: true },
    });
    return res.status(200).json({ project });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ message: err.message });
  }
}
