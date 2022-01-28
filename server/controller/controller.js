var Taskdb = require('../model/model');
	

	// create and save new task
	exports.create = (req,res)=>{
	    // validate request
	    if(!req.body){
	        res.status(400).send({ message : "Content can not be emtpy!"});
	        return;
	    }
	

	    // new task
	    const task = new Taskdb({
	        task : req.body.task,
	        date : req.body.date,
	    	priority: req.body.priority,
	        status : req.body.status
	    })
	

	    // save task in the database
	    task
	        .save(task)
	        .then(data => {
	           
	            res.redirect('/add-task');
	        })
	        .catch(err =>{
	            res.status(500).send({
	                message : err.message || "Some error occurred while creating a create operation"
	            });
	        });
	

	}
	

	// retrieve and return all tasks/ retrive and return a single task
	exports.find = (req, res)=>{
	

	    if(req.query.id){
	        const id = req.query.id;
	

	        Taskdb.findById(id)
	            .then(data =>{
	                if(!data){
	                    res.status(404).send({ message : "Not found task with id "+ id})
	                }else{
	                    res.send(data)
	                }
	            })
	            .catch(err =>{
	                res.status(500).send({ message: "Erro retrieving task with id " + id})
	            })
	

	    }else{
	        Taskdb.find()
	            .then(task => {
	                res.send(task)
	            })
	            .catch(err => {
	                res.status(500).send({ message : err.message || "Error Occurred while retriving task information" })
	            })
	    }
	

	    
	}
	

	// Update a new idetified task by task id
	exports.update = (req, res)=>{
	    if(!req.body){
	        return res
	            .status(400)
	            .send({ message : "Data to update can not be empty"})
	    }
	

	    const id = req.params.id;
	    Taskdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
	        .then(data => {
	            if(!data){
	                res.status(404).send({ message : `Cannot Update task with ${id}. Maybe task not found!`})
	            }else{
	                res.send(data)
	            }
	        })
	        .catch(err =>{
	            res.status(500).send({ message : "Error Update task information"})
	        })
	}
	

	// Delete a task with specified task id in the request
	exports.delete = (req, res)=>{
	    const id = req.params.id;
	

	    Taskdb.findByIdAndDelete(id)
	        .then(data => {
	            if(!data){
	                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
	            }else{
	                res.send({
	                    message : "Task was deleted successfully!"
	                })
	            }
	        })
	        .catch(err =>{
	            res.status(500).send({
	                message: "Could not delete Task with id=" + id
	            });
	        });
	}

