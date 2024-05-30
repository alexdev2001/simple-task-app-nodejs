const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'pug');
app.use(express.static('public'));

var task = ['walk dog', 'buy groceries'];

var completedTasks = ['wash car', 'coding'];

app.post('/addtask', (req, res) => {
    var newTask = req.body.newTask;

    task.push(newTask);
    
    res.redirect('/');
});

app.post('/removetask', (req, res) => {
    var completeTask = req.body.check;

    if(typeof completeTask === 'string') {
        completedTasks.push(completeTask);
        
        task.splice(task.indexOf(completeTask), 1);
    } else {
        for (var i = 0; i < completeTask.length; i++) {
            completedTasks.push(completeTask[i]);

            task.splice(task.indexOf(completeTask), 1);
        }
    }
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('index', { task: task, complete: completedTasks});
});

app.listen(3003, () => {
    console.log('listening on port 3003');
});



