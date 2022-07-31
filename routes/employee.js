const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');


router.get('/', (req, res) => {
    Employee.find({})
        .then((employees) => {
            res.render('index', {employees : employees});
        })
        .catch(err => {
            console.log(err);
        })
    
})

router.get('/employee/search' , (req, res) => {
    res.render('search', {employee: ''});
})

router.get('/employee/new', (req, res) => {
    res.render('new');
})

router.get('/employee', (req, res) => {
    const searchQuery = {name: req.query.name};
    Employee.findOne(searchQuery)
        .then((employee) => {
            res.render('search', {employee: employee});
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    Employee.findOne({_id: id})
        .then((data) => {
            res.render('edit', {employee: data});
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/employee/new', (req, res) => {
    const newEmployee = req.body;
    const employee = new Employee({
        name: newEmployee.name,
        designation: newEmployee.designation,
        salary: newEmployee.salary
    })
    employee.save()
        .then((data) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })
    

    // using mongoose model create() method ----

        // const newEmployee = {
        //     name: req.body.name,
        //     designation: req.body.designation,
        //     salary: req.body.salary
        // }

        // Employee.create(newEmployee)
        //     .then(() => {
        //         res.redirect('/')
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
})

router.put('/edit/:id', (req, res) => {
    const searchQuery = {_id: req.params.id};
    Employee.updateOne(searchQuery, {$set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }})
    .then((data) => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
})

router.delete('/delete/:id', (req, res) => {
    const searchQuery = {_id:req.params.id};
    Employee.deleteOne(searchQuery)
        .then((data) => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;