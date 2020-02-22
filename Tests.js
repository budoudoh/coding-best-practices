const fs = require('fs');
const readline = require('readline');

function Coworker(first, last, email, phone) {
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phone = phone;
}

function getCoworkers(callback){
    let coworkers = [];
    const rl = readline.createInterface({
        input: fs.createReadStream('coworkers.csv')
    });
    
    rl.on('line', function (line) {
        let attributes = line.trim().split(",");
        let coworker = new Coworker(attributes[0], attributes[1], attributes[2], attributes[3]);
        coworkers.push(coworker);
    });

    rl.on('close', function(){
        callback(coworkers);
    });
}

function tellBrianToStop(){
    getCoworkers(sendMessage);
}

function sendMessageToBrian(coworkers){
    for(var i =0; i < coworkers.length; i++){
        let coworker = coworkers[i];

        if(coworker.firstName != "Brian")
            return false;

        if(coworker.phone == null)
            return false;

        smsService.sendSMS(coworker.phone, 'Brian, please stop!');
        return true
    }
}

function testSendMessage(){
    var brian = new Coworker("Brian", "Leftovers", "breakroom_scent@notmail.com", "470-ATE-FISH");
    var notBrian = new Coworker("NotBrian", "Leftovers", "breakroom_clean@notmail.com", "470-ATE-SNAK");
    var brianNoNumber = new Coworker("Brian", "Leftovers", "breakroom_scent@notmail.com", null);
    var brianTest = [brian];
    var notBrianTest = [notBrian];
    var brianNoNumberTest = [brianNoNumber];

    console.log("Assert Brian is present and has a phone number ", sendMessageToBrian(brianTest));
    console.log("Assert Brian is not present", sendMessageToBrian(notBrianTest));
    console.log("Assert Brian is present but has no phone number", sendMessageToBrian(brianNoNumberTest));

}

testSendMessage();