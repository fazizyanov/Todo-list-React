const { v4: uuidv4 } = require('uuid');
const Task = require('../../models/tasks');


module.exports.getAllTasks = async (req, res, next) => {
  Task.find({}).then(result => {
    res.send({data: result})
  });
};

module.exports.createNewTask = (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('text') && body.hasOwnProperty('isCheck')) {
    body.id = uuidv4();
    const task = new Task(body);
    task.save().then(result => {
      Task.find({}).then(_result => {
        res.send({data: _result});
      })
    })
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeTaskInfo = (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('_id') && (body.hasOwnProperty('text') || body.hasOwnProperty('isCheck'))) {
    Task.updateOne({_id: req.body._id}, {text: req.body.text, isCheck: req.body.isCheck}).then(result => {
      Task.find({}).then(result => {
        res.send({data: result});
      })
    })
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.deleteTask = (req, res, next) => {
  Task.deleteOne({_id: req.query._id}).then(result => {
    Task.find({}).then(result => {
      res.send({data: result});
    })
  })
};

module.exports.deleteAllTask = (req, res, next) => {
  Task.remove({}).then(result => {
    res.send({data: result});
  })
};

