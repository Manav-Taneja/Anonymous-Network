const express = require('express')
const cors = require('cors')
require('dotenv').config
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const jwt = require("jsonwebtoken");
const path = require('path')
const app = express()
const SECRET="THIS IS MY SECRET KEY"
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())
app.use(express.json())

const authMiddlewares  = async(req, res,next) => {
  const userToken = req.cookies.jwtToken
  if(!userToken) return next()
  try{
     console.log("inside the middle");
     console.log(userToken)
    const { userID, username } = jwt.verify(userToken, SECRET)  
    console.log({userID,username})
    req.userID = userID
    req.username = username
    return next()
  } catch(err){
    return next()
  }
}

if(process.env.NODE_ENV === 'production'){  
  app.use(authMiddlewares)
  app.use('/api/auth/', require('./Routes/auth.routes'))
  app.use('/api/posts/', require('./Routes/posts.routes'))
  app.use('/api/comments/', require('./Routes/comments.routes'))
  app.use('/api/companies/', require('./Routes/companies.routes'))
  app.use('/api/reviews/', require('./Routes/reviews.routes'))
  app.use('/api/users/', require('./Routes/users.routes'))
  app.use('/api/jobs/', require('./Routes/jobs.routes'))
  app.use(express.static(path.join(__dirname, "client/build")))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

}



app.use(authMiddlewares)

app.get("/", (req, res) => {
  res.send("Hello world")
})

const authRouter = app.use('/api/auth/', require('./Routes/auth.routes'))
const postsRouter = app.use('/api/posts/', require('./Routes/posts.routes'))
const commentsRouter = app.use('/api/comments/', require('./Routes/comments.routes'))
const companyRouter = app.use('/api/companies/', require('./Routes/companies.routes'))
const reviewsRouter = app.use('/api/reviews/', require('./Routes/reviews.routes'))
const userRouter = app.use('/api/users/', require('./Routes/users.routes'))
const jobsRouter = app.use('/api/jobs/', require('./Routes/jobs.routes'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Listening to port', PORT)
})
