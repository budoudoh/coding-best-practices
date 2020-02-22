const fs = require('fs');
const readline = require('readline');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.fakeServer.email",
    port: 587,
    secure: false, 
    auth: {
        user: "fake",
        pass: "st1ll_F4k3!"
    }
});

function TOCRecuits(first, last, email, phone, sponsor_email) {
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phone = phone;
    this.sponsor_email = sponsor_email;
}



function sendNewJoinerEmails(){
    let joiners = [];
    const rl = readline.createInterface({
        input: fs.createReadStream('recruits.csv')
    });
    
    rl.on('line', function (line) {
        let attributes = line.trim().split(",");
        let recruit = new TOCRecuits(attributes[0], attributes[1], attributes[2], attributes[3], attributes[4]);
        recruits.push(recruit);
    });

    rl.on('close', function(){
        for(var i =0; i < joiners.length; i++){
            let joiner = joiners[i];
            transporter.sendMail({
                from: '"TOC" <toc@example.com>',
                to: joiner.email,
                cc: joiners.sponsor_email,
                subject: "Welcome to TOC!",
                html: "<h1>Hey "+joiner.firstName+"!</h1>"+
                "<p> Welcome to the club! We're glad to have you join our organization. Can't wait to see you at the events!</p>"
                });
        }
        
    });

    return true;
}


function testReadingJoinersFile(){
    console.log("Assert Joiner File is being read", sendNewJoinerEmails());
}

function testEmailSending(){
    console.log("Assert new joiner email is being sent", sendNewJoinerEmails());
}

testReadingJoinersFile()