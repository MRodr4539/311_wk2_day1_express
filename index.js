
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const { users } = require('./state')

/* BEGIN - create routes here */
//"Get Users" button appears allowing you click
app.get('/', (req, res)=>{
  res.send(`<a href="http://localhost:4000/users">Get Users</a>`)
})
//pulls list of users
app.get('/users', (req, res)=>{
  res.json(users)
})
//allows us to pull any user from the list 
//:id / express syntacs, no underscore needed, see state.js  
app.get('/users/:id', (req, res)=>{
  const found = users.some(user => user._id == req.params.id)
  if (found){
    res.send(users.filter(user => user._id == req.params.id))
  }else {
    res.status(400).json({msg: `User id ${req.params.id} not found`})
  }
})
//Post/ New user that does not exist 
app.post(`/users`, (req,res)=>{
  const newUser = {
    id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar 
  }
  users.push(newUser)
  res.json(users)
})
app.put(`/users/:id`, (req,res)=>{
  const updateUser ={
    id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar 
  }
  if(!newUser.id) res.status(400).json({ msg: "New users require an id" })
  users.push(updateUser)
  res.json(users)
})
/* END - create routes here */
app.put('/users/:id', (req, res) => {
  const updateUser = req.body;
  users.forEach(user => {
    if(user._id === parseInt(req.params.id)) {
      user.name = updateUser.name ? updateUser.name : user.name;
      user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;
      user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;
      res.json({ msg: `User updated: ${user}` })
    }
  })
})
app.delete('/users/:id', (req, res) => {
  const found = users.some(user => user._id == req.params.id)
  if (found){
    res.json({ 
      msg: `User deleted`, 
      users: users.filter(user => user._id == req.params.id)
    })
  } else {
    res.status(404).json({msg: `User id ${req.params.id} not found.`})
  }
})

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))