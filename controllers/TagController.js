import express from "express";

//Database Connect
import getDB from "../database.js";
const db = getDB();

/**
 * Create Tag
 * POST: http://localhost:3000/api/tasktag */
export async function AddTaskTag(req, res) {
  try {
    const taskId = req.body.taskId;
    const tagname = req.body.tagname;

    const tag = await db.tag.findFirst({
      where: {
        name: tagname,
      },
    });

    if (!tag) {
      tag = await db.tag.create({
        data: {
          name: tagname,
        },
      });
    } else {
      console.log(tag.id, taskId);
      const Connected = await db.task_tag.findFirst({
        where: {
          tagId: tag.id,
          taskId,
        },
      });
      if (Connected)
        res.status(200).json({ message: "Already Added this tag" });
    }
    const tagId = tag.id;

    const taskTag = await db.task_tag.create({
      data: {
        taskId,
        tagId,
      },
    });

    return res.status(201).json({ message: `Task id:  ${taskId}`, taskTag });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

/**
 * Delete Tag
 * DELETE : http://localhost:3000/api/tasktag */
export async function DeleteTaskTag(req, res) {
  try {
    const id = req.body.id;
    const delete_tag = await db.task_tag.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: `Delete Tag Successfully`, delete_tag });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * Create Tag
 * POST: http://localhost:3000/api/projecttag */
export async function AddProjectTag(req, res) {
  try {
    const projectId = req.body.projectId;
    const tagname = req.body.tagname;

    let tag = await db.tag.findFirst({
      where: {
        name: tagname,
      },
    });

    if (!tag) {
      tag = await db.tag.create({
        data: {
          name: tagname,
        },
      });
    } else {
      const Connected = await db.project_tag.findFirst({
        where: {
          tagId: tag.id,
          projectId,
        },
      });
      if (Connected)
        res.status(200).json({ message: "Already Added this tag" });
    }
    const tagId = tag.id;

    const projectTag = await db.project_tag.create({
      data: {
        projectId,
        tagId,
      },
    });

    return res
      .status(201)
      .json({ message: `Project id:  ${projectId}`, projectTag });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

/**
 * Delete Tag
 * DELETE : http://localhost:3000/api/projecttag */
export async function DeleteProjectTag(req, res) {
  try {
    const id = req.body.id;
    const delete_tag = await db.project_tag.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: `Delete Tag Successfully`, delete_tag });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
