var nodemailer = require('nodemailer');
module.exports={
  findCompany :function(email){
    const arremail=email.split("@");
    var s=arr[1];
    const arrcompany=s.split(".");
    var company=s[0];
    

},
generateCode:function(){
    var result= '';
    var charString="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = charString.length;
    for ( var i = 0; i < 6; i++ ) {
      result += charString.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   code=result;
   return result;
},
sendEmail:async function(email,code){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testingpurpose262000@gmail.com',
          pass: 'Manav@54321'
        }
      });
      
      var mailOptions = {
        from: 'testingpurpose262000@gmail.com',
        to: email,
        subject: "Your verification code",
        text:"Hi thank you so much for registering with us the verification code is "+code+"."
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return code;
},
messageString:function(code){
    var boldCode=code.bold();
    return 
},
check:function(email){
    var code=generateCode();
    sendEmail(email,code);
}
}