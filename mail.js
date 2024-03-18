var nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"tongvannghia806@gmail.com",
        pass:"chinhnghia123"
    }
})
module.exports = transporter