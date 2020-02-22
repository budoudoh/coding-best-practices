const fs = require('fs');
const readline = require('readline');
const nodemailer = require("nodemailer");

function TOCMember(first, last, email, phone) {
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phone = phone;
}

function getTOCMembers(callback){
let members = [];
    const rl = readline.createInterface({
        input: fs.createReadStream('members.csv')
    });
    
            rl.on('line', function (line) {
                let attributes = line.trim().split(",");
        if(attributes.length == 4){
            let member = new TOCMember(attributes[0], attributes[1], attributes[2], attributes[3]);
                members.push(member);
        }
            });
    
        rl.on('close', function(){
            callback(members);
        });
}


function emailMembers(){
    getTOCMembers(function(members){
let transporter = nodemailer.createTransport({
    host: "smtp.fakeServer.email",
    port: 587,
    secure: false, 
    auth: {
        user: "fake",
        pass: "4ls0_F4k3!"
    }
    });
        for(var i =0; i < members.length; i++){
            let member = members[i];
            if(member.firstName != null){
                if(member.lastName != null){
                    if(member.email != null){
                        let info = await transporter.sendMail({
                            from: '"TOC" <toc@example.com>',
                            to: member.email,
                            subject: "TOC Happy Hour This week!",
                            html: "<h1>Hey "+member.firstName+"!</h1><p> We've got a happy hour coming up soon and it just wouldn't be the same without you. We hope to see you there! Please RSVP by using our new TOC app to let us know if you will make it. See you there!<p>"
                            });
                    }
                }
            }
        }
    })
}

emailMembers();