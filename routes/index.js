var express = require('express');
const Todo = require('./../models/Todo');
var router = express.Router();


router.get('/', (req, res) => {

    Todo.find({}, (err, todos) => {
        res.render("index", {
            tasks: (Object.keys(todos).length > 0 ? todos : {})
        });
    });
});

// POST - submit a task
router.post('/', (req, res) => {
    const newTask = new Todo({
        task: req.body.task
    });

    newTask.save()
    .then(task => res.redirect('/'))
    .catch(err => console.log(err));
});

// POST - delete todo item
router.post('/todo/delete', (req, res) => {
    const taskKey = req.body._key;

    Todo.findOneAndRemove({_id: taskKey}, (err) => {
        if(err) console.log(err);
        res.redirect('/');
    });
});


module.exports = router;

