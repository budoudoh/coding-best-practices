function Location(address, city, state, zip, coord) {
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.coord = coord;
}

function Coordinate(lat, long) {
    this.lat = lat;
    this.long = long;
}

function doesStuff(aThing, anotherThing){
    if(aThing.coord.lat != anotherThing.lat){
        return false;
    }

    if(aThing.coord.long != anotherThing.long){
        return false;
    }

    return true;
}


function doSomethingBig(somethingBig, somethingBigAsWell){
    var rememberThatTimeBrianWarmedHisFishUpInTheBreakroomMicrowave = [];
    for(var i = 0; i < somethingBigAsWell.length; i++){
        if(doesStuff(somethingBig, somethingBigAsWell[i])){
            rememberThatTimeBrianWarmedHisFishUpInTheBreakroomMicrowave.push(somethingBigAsWell[i])
        }
    }
    return rememberThatTimeBrianWarmedHisFishUpInTheBreakroomMicrowave;
}
var TheBreakroomSmelledLikeABassProShopForTheRestOfTheDay = new Coordinate(33.748543, -84.404543);
var BrianIsSeriouslyTheWorst = new Location("504 Fair St SW", 
"Atlanta", 
"GA", 
30313, 
TheBreakroomSmelledLikeABassProShopForTheRestOfTheDay)

doSomethingBig(BrianIsSeriouslyTheWorst, [TheBreakroomSmelledLikeABassProShopForTheRestOfTheDay]);
