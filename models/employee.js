const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : {
        type: String
    },
    designation: {
        type: String
    },
    salary: {
        type: Number
    }
})

const employee = mongoose.model('employee', employeeSchema);
module.exports = employee;