

var Blynk = require('blynk-library');
var tf = require('string-includes');
var request = require('request');
var AUTH = 'use you own one from blynk';
var blynk = new Blynk.Blynk(AUTH);
var v10 = new blynk.VirtualPin(10);
//this is used to monitor the listed equipment  ie below url: shows equipment/1' is for equipment 1
var equipment1opt = {
    url: 'http://127.0.0.1:80/api/equipments/2',
    auth: {
        'user': 'reef-pi',
        'pass': 'reef-pi'
    }
};

function equipment1call(error, response, equip1) {
    if (!error && response.statusCode == 200) {
//       var thingy = body.slice(47,51);  removed for testing of the device
	
      // console.log(body.slice(47,51));
      // console.log(body);
    }
    if (tf(equip1 == 'true')) {
	//console.log('GPIO26 OFF');
	//blynk.virtualWrite(10, 255);    // V23 Widget (Green) LED off
	blynk.virtualWrite(14, 'Main Pump On');
}
    else if (tf(equip1 == 'false')) {
       // console.log('its on');
	//blynk.virtualWrite(10, 0);
	blynk.virtualWrite(14, 'Main Pump Off');
} 

}
// end of equipment one


// begin equipment 2
var equip2opt = {
	url: 'http://127.0.0.1:80/api/equipments/3',
	auth: {
		'user': 'reef-pi',
		'pass': 'reef-pi'
	}
};

function equip2call(error, response, equip2) {
	if(!error && response.statusCode == 200) {
//	var equip2stat = equip2.slice(48,51);
//	console.log(equip2);
//	console.log(equip2stat);
}
	if (tf(equip2 == 'true')) {
	  // blynk.virtualWrite(11, 255);
	   blynk.virtualWrite(15, 'Wave Maker On');
	}
	else if (tf(equip2 == 'false')) {
	  // blynk.virtualWrite(11, 0);
	   blynk.virtualWrite(15, 'Wave Maker Off');
	}
}
// end equipment 2

// begin equipment 3

var equip3opt = {
	url: 'http://127.0.0.1:80/api/equipments/4',
	auth: {
		'user': 'reef-pi',
		'pass': 'reef-pi'
	}
};

function equip3call(error, response, equip3) {
	if(!error && response.statusCode == 200) {
//	var equip3stat = equip3.slice(48,51);
//	console.log(equip3);
//	console.log(equip3stat);
}
	if (equip3 == 'true') {
	   //blynk.virtualWrite(11, 255);
	   blynk.virtualWrite(16, 'Heater On');
	}
	else if (tf(equip3 == 'false')) {
	  // blynk.virtualWrite(11, 0);
	   blynk.virtualWrite(15, 'Heater Off');
	}
}

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
        var end = tempbody.length - 5;      //changed from 3 to 5 to get rid of decimal point for now
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
	request(equip2opt, equip2call)
	request(equip3opt, equip3call).end();
}, 2000);
