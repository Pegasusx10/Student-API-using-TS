import { Response, Request } from 'express';
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const student = require('../models/studentmodel');

// Get all students
// GET /api/students
const getStudent = asyncHandler(async (req: Request, res: Response) => {
    const projects = await student.find();
    res.status(200).json(projects);
});

// Create a new student
//  POST /api/student
const createStudent = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Title is required');
    }
    const project = await student.create(req.body);
    if (!project) {
        res.status(400);
        throw new Error('student not created');
    }
    res.status(201).json(project);
});

// Get a student by id
// GET /api/projects/:id
const getStudent = asyncHandler(async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error(`${req.params.id} is not a valid id`);
    }
    const project = await student.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error('student not found');
    }
    res.status(200).json(project);
});

//  Delete a student by id
//  DELETE /api/student/:id
const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error(`${req.params.id} is not a valid id`);
    }
    const project = await student.findByIdAndDelete(req.params.id);
    if (!student) {
        res.status(404);
        throw new Error('student not found');
    }
    res.status(200).json({
        message: `Project ${req.params.id} deleted`,
        project: project,
    });
});

//  Update a student by id
// PUT /api/student/:id
const updateStudent = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Title is required');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error(`${req.params.id} is not a valid id`);
    }
    const student = await student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!student) {
        res.status(404);
        throw new Error('student not found');
    }
    res.json(student);
});

module.exports = {
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent,
};
