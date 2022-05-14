const router = require('express').Router({ mergeParams : true })
const db = require('../dbConnection')
const helper=require('./helper.routes')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { system } = require('nodemon/lib/config');
const SECRET="THIS IS MY SECRET KEY"
var verificationcode;

//*SIGNUP
router.post('/signup', async(req, res) => {
  console.log("Inside signup/////////////////////")
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  console.log("Fields ++++++ "+username+"  "+password+"  "+email)
  //MISSING ANY OF THE FIELDS
  if (!username || !password || !email) return res.status(400).send("Please enter all the fields")

  //BCRYPT INITIALISATION
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt) //HASHED PASSWORD 
  console.log("PasswordHash   ===== "+passwordHash)
  const signUpUserQuery = await db.query(`INSERT INTO users(username, email, hashedpassword) VALUES ($1, $2, $3) returning id`, [ username, email, passwordHash ])
  console.log("after running query")
  var code=await helper.generateCode();
  console.log(code);
  helper.sendEmail(email,code);
  verificationcode=code;
  res.status(200).json({message:"Verification code send"});
})
router.get('/verify/:code',async(req,res)=>{
  const code=req.params.code
  console.log(req.params);
  console.log(code+"  "+verificationcode)
  if(code===verificationcode){
    return res.status(200).json({message:"Verification Successfull"})
  }
  else{
    return res.status(200).json({message:"Verification Failed"})
  }
})
//*LOGIN USER
router.post('/login', async(req, res) => {
  const username = req.body.username
  const password = req.body.password
  console.log(username+"  "+password)
  if (!username || !password) return res.status(400).json({message: "PLease enter all the fields"})

  const checkUserExistsQuery = await db.query('SELECT hashedPassword, id FROM users WHERE username = $1', [username])

  if (checkUserExistsQuery.rowCount === 0) {
    console.log("inside this")
    return res.status(400).json({message: "No such account exists"})
}

  try{
    console.log("inside this")
    //COMPARES THE TWO PASSWORDS AND CHECKS IF ITS TRUE
    const isUserDetailsCorrect = await bcrypt.compare(password,checkUserExistsQuery.rows[0].hashedpassword)
    console.log(isUserDetailsCorrect+"  ********")
    if(isUserDetailsCorrect==false){
      console.log("inside this")
      return res.status(401).json({message:'Either password or username is wrong'})
  }
  console.log(checkUserExistsQuery+"  "+username)
    //CREATING A TOKEN TO BE SENT TO THE FRONTEND
    const token = jwt.sign(
      {
        userID: checkUserExistsQuery.rows[0].id,
        username,
        isAdmin: false
      }, 
      SECRET
    )
    res.cookie('jwtToken', token, { httpOnly: true } ).json({message: "Logged in successfully", logUserIn: true, username, userID:checkUserExistsQuery.rows[0].id})
  } catch(err) {
    res.status(400).json(
      {
        message: err.message
      }
    )
  }
})

router.get('/check-auth-status', async(req, res) => {
  try {

    const userToken = req.cookies.jwtToken

    const { userID, username } = jwt.verify(userToken,SECRET)

    if(userToken) return res.status(200).json({isLoggedIn: true, userID, username})

    if(!userToken) return res.status(404).json({isLoggedIn: false})


  } catch(err) {
    res.json({message: err})
  }
})

router.get('/logout', async(req, res) => {
  res.clearCookie('jwtToken')
  res.json(
    {
      logOutUser: true
    }
  )
})

router.get('/token', async(req, res) => {
  // const token = jwt.sign(
  //   {
  //     userID: "59883372-07b5-4a21-a7c6-9cfef0a10444",
  //     username: "rgs45",
  //     isAdmin: false
  //   }, 
  //   process.env.JWT_SECRET
  // )
  // res.cookie('jwtToken', token, { httpOnly: true } ).json({message: "Logged in successfully", logUserIn: true})
  console.log(jwt.verify(req.cookies.jwtToken, SECRET))
})


module.exports = router