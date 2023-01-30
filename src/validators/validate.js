
const isValidName=(name)=>{
    const regex=/^([a-z A-Z]){2,30}$/
    return regex.test(name)
};
const isValidEmail=(email)=>{
email=email.split("@")

let regex = /^([a-zA-Z0-9.])$/
console.log(regex.test(email[0]))
//if(!regex.test(email[0])) return false

}
const isValidPassword=(password)=>{
   
    const regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/
    return regex.test(password)

}


module.exports={isValidName,isValidEmail,isValidPassword}