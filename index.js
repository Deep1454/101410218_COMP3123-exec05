const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const userData = require('./user.json');

app.use(express.json());
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html'); 
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile('user.json', (err, data) => {
      if (err) {
          return res.status(500).send('Server Error');
      }
      res.json(JSON.parse(data));
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).send({ status: false, message: "Username and password are required." });
  }

  // Validate username
  if (userData.username !== username) {
    return res.send({ status: false, message: "User Name is invalid" });
  }

  // Validate password
  if (userData.password !== password) {
    return res.send({ status: false, message: "Password is invalid" });
  }

  // If both username and password are valid
  return res.send({ status: true, message: "User Is valid" });
});
  
/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

router.get('/logout', (req,res) => {
  res.send('This is logout router');
});

router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  res.status(500).send('<h1>Server Error</h1>');
});

app.use('/', router);

app.listen(process.env.port || 8888);

console.log('Web Server is listening at port '+ (process.env.port || 8888));