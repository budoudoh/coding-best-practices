const fs = require('fs');
const readline = require('readline');
const sms = require('sms-service');
const smsService = new sms.SMSService();

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


function sendHappyHourText(){
    getTOCMembers(function(members){
        for(var i =0; i < members.length; i++){
            let member = members[i];
            if(member.phone != null){
                smsService.sendSMS(member.phone, 'Remember to come to the happy hour tonight!');
            }
        }
    });
}

function sendCodingWhileBlackText(){
    getTOCMembers(function(members){
        for(var i =0; i < members.length; i++){
            let member = members[i];
            if(member.phone != null){
                smsService.sendSMS(member.phone, 'Remember to come to Coding While Black tonight!');
            }
        }
    });
}

function sendTOCFoundationsText(){
    getTOCMembers(function(members){
        for(var i =0; i < members.length; i++){
            let member = members[i];
            if(member.phone != null){
                smsService.sendSMS(member.phone, 'Remember to tell Basil you think this class is amazing!');
            }
        }
    });
}


function sendTexts(){
    var dayOfWeek = new Date().dayOfWeek();
    
    switch(dayOfWeek){
        case 0:
            sendTOCFoundationsText();
            break;
        case 1:
            sendTOCFoundationsText();
            break;
        case 2:
            sendTOCFoundationsText();
            break;
        case 3:
            sendCodingWhileBlackText();
            break;
        case 4:
            sendHappyHourText();
            break;
        case 5:
            sendTOCFoundationsText();
            break;
        case 6:
            sendTOCFoundationsText();
            break;
        default:
            sendTOCFoundationsText();
            break;
    }
}

sendTexts();