var UserData=[{username:"Yashwitha" ,password:"123456"},{username:"Aruna",password:"123456"},{username:"Shraghvi",password:"123456"},{username:"Harshini",password:"123456"}];

function SignUp(email,contact,username,password)
{
    var obj={
       email:email,
       Contact:contact,
       username:username,
       password:password
    };
    UserData.push(obj);
    console.log(UserData);

    sessionStorage.username=username;
   
}

function Login(username,password)
{
    
    
    let msg=UserData.find(x=>x.username==username && x.password==password)
    if(msg)
    {
        sessionStorage.username=username;
    }
    return msg;

}
