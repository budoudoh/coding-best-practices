const fs = require('fs');
const readline = require('readline');
const sms = require('sms-service');
const smsService = new sms.SMSService();

function TOCOfficer(first, last, email, phone, yearsOfService) {
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phone = phone;
    this.yearsOfService = yearsOfService;
}

function getTOCOfficers(callback){
    let officers = [];
    const rl = readline.createInterface({
        input: fs.createReadStream('officers.csv')
    });
    
    rl.on('line', function (line) {
        let attributes = line.trim().split(",");
        let officer = new TOCOfficer(attributes[0], attributes[1], attributes[2], attributes[3], attributes[4]);
        officers.push(officer);
    });

    rl.on('close', function(){
        callback(officers);
    });
}

function secretText(){
    getTOCOfficers(function(officers){
        for(var i =0; i < officers.length; i++){
            let officer = officers[i];
            if(officer.yearsOfService > 3)
                smsService.sendSMS(member.phone, "Thank you for your years of service! "+
                "You're the best, and I'm totally not sending this mesage to any officer "+
                "who has been with the team for more than 3 years. Just to you, because you're the best. "+
                "BTW, don't tell anyone I sent this, especially not anyone who's been here for longer than 3 years. "+
                "Wouldn't want them to think I'm choosing favorites, right!?!" );
        }
    });
}

secretText();