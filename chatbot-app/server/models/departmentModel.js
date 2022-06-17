const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({
    departmentID: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('departments', DepartmentSchema)