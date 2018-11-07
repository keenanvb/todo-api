require('./config/config');
let express = require('express');
let bodyParser = require('body-parser');
let { ObjectID} = require('mongodb');
const _ = require("lodash");

let {mongoose} = require('./db/mongoose');
let {User} = require('./models/user');
let {Todo} = require('./models/todo');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     let now = new Date().toString();
//     let log = `Date ${now} ${req.method} ${req.url} \n`;
//     fs.appendFile('logs.txt', log, (err) => {
//         if (err) {
//             console.log('Unable to append to log.txt')
//         }
//     });
//     next();
// });

//Maintenance
// app.use((req, res, next) => {
//     res.render('');
// })

app.post('/todos',authenticate,(req,res)=>{
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((todo)=>{
        res.send(todo)
    },(error)=>{
        res.status(400).send(error);
    });
    console.log(req.body);
});

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({_creator: req.user._id}).then((todos)=>{
        res.send({
            todos
        })
    },(error)=>{
        res.status(400).send(error);
    });
});

app.get('/todos/:id',authenticate,(req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }

    Todo.findOne({_id:id,_creator:req.user._id}).then((todo)=>{
        if(!todo){
         return res.status(404).send();
        }

        res.send({todo})
    }).catch((error)=>{
        res.status(400).send(error);
    });
});

app.delete('/todos/:id',authenticate, async (req,res)=>{
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }

    try{
        const todo = await Todo.findOneAndRemove({_id:id,_creator:req.user._id});
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    
    }catch(e){
        res.status(400).send(e);
    }

    // Todo.findOneAndRemove({_id:id,_creator:req.user._id}).then((todo)=>{
    //     if(!todo){
    //         return res.status(404).send();
    //     }
    //     res.send({todo})
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['text','completed']);


    if(!ObjectID.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id:id,_creator:req.user._id},{$set: body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((error)=>{
        res.status(400).send(error);
    });

});

// User
app.post('/user',async (req,res) => {
    const body = _.pick(req.body,['email','password']);
    const user = new User(body);

    try{
        await user.save()
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    }catch(e){
        res.status(400).send(e);
    }


    // user.save().then(()=>{
    //     return user.generateAuthToken();
    // }).then((token)=>{
    //     res.header('x-auth', token).send(user);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // });
})

//auth 
app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

//login
app.post('/users/login', async (req,res)=>{
    const body = _.pick(req.body,['email','password']);
    try{
        const user = await  User.findByCredentials(body.email,body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    }catch(e){
        res.send(400).send(error);
    }

    // User.findByCredentials(body.email,body.password).then((user)=>{
    //     user.generateAuthToken().then((token)=>{
    //         res.header('x-auth', token).send(user);
    //     });
    // }).catch((error)=>{
    //     res.send(400).send(error);
    // })
})

app.delete('/users/me/token',authenticate, async (req,res)=>{
    try{
        await req.user.removeToken(req.token);
        res.status(200).send();
    }catch(e){
        res.status(400).send();
    }
    // req.user.removeToken(req.token).then(()=>{
    //     res.status(200).send();
    // },()=>{
    //     res.status(400).send();
    // })
});

app.listen(3000,()=>{
    console.log(`listeing on port ${port}`)
});

module.exports = {app}

