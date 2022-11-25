const express = require('express');
const router = express.Router();

const {
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent,
} = require('../conrollers/studentControllers');

router.route('/').get(getStudent).post(createStudent);
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;
