

var Blynk = require('blynk-library');

var request = require('request');
var AUTH = '559888bce2724c079b9d617cffbd8518';
var blynk = new Blynk.Blynk(AUTH);
var v10 = new blynk.VirtualPin(10);
//this is used to monitor the listed equipment  ie below url: shows equipment/1' is for equipment 1
var equipment1opt = {
    url: 'http://127.0.0.1:80/api/equipments/1',
    auth: {
        'user': 'reef-pi',
        'pass': 'reef-pi'
    }
};

function equipment1call(error, response, body) {
    if (!error && response.statusCode == 200) {
       var thingy = body.slice(47,51);
	
      // console.log(body.slice(47,51));
      // console.log(body);
    }
    if (thingy == 'true') {
	//console.log('GPIO26 OFF');
	blynk.virtualWrite(10, 255);    // V23 Widget (Green) LED off
	blynk.virtualWrite(14, 'MAIN PUMP ON');
}
    else if(thingy == 'fals') {
       // console.log('its on');
	blynk.virtualWrite(10, 0);
	blynk.virtualWrite(14, 'MAIN PUMP OFF');
} 

}
// end of equipment one


// begin equipment 2
var equip2opt = {
	url: 'http://127.0.0.1:80/api/equipments/2',
	auth: {
		'user': 'reef-pi',
		'pass': 'reef-pi'
	}
};

function equip2call(error, response, equip2) {
	if(!error && response.statusCode == 200) {
	var equip2stat = equip2.slice(48,51);
//	console.log(equip2);
//	console.log(equip2stat);
}
	if (equip2stat == 'tru') {
	   blynk.virtualWrite(11, 255);
	   blynk.virtualWrite(15, 'wave maker  on');
	}
	else if (equip2stat == 'fal') {
	   blynk.virtualWrite(11, 0);
	   blynk.virtualWrite(15, 'wave maker off');
	}
}
// end equipment 2


// begin of temp monitor.  this reads 168 reading.
var tempature = {
    url: 'http://127.0.0.1:80/api/tc/readings',
    auth: {
        'user': 'reef-pi',
        'pass': 'reef-pi'
    }
};

function tempcall(error, response, tempbody) {
    if (!error && response.statusCode == 200) {
// This was a pain.  this sets where it reads from.  As long as the temp is XX.XX then it will work.  If is XX then it will read the wrong stuff and error 
       var begin = tempbody.length - 8;
        var end = tempbody.length - 3;
	var currtemp = tempbody.slice(begin, end);
	var currtemp = parseFloat(currtemp);
	blynk.virtualWrite(12, currtemp);
    }
}

// end temp monitor
var testomg = setInterval(
function() {
//this  calls the items above to work
	request(tempature, tempcall);
	request(equipment1opt, equipment1call);
	request(equip2opt, equip2call).end();
}, 2000);

