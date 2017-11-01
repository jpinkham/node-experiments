#!/usr/bin/env node

// Objective: Display current temp for the specified lat/long

// TODO: add command line flags for: debug, help
// TODO: update all debug output to require cli debug arg enabled


// declare vars and set defaults
var latitude     = 0;
var longitude    = 0;
var weather_temp = 0;
var weather_url  = ''; // ?? Bother to find a way to set this, with placeholders for the lat/long
//example url: https://api.weather.gov/points/39.9,-78.9/forecast 


var prompt = require('prompt');
prompt.start();

// Pull lat/long from command line
var all_args = process.argv.slice(2);
latitude  = all_args[0];
longitude = all_args[1];


//TODO: get this working
// ELSE if not specified, ask user for lat/long
//prompt.get(['latitude','longitude'], function (error, result) {
//	console.log('Command-line input received:');
//	console.log('  latitude:  ' + result.latitude);
//	console.log('  longitude: ' + result.longitude);
//});

// Validate user input: 
// test ideas: decimal numbers only (pos/neg), non-zero numbers

//	If validation fails, show error and quit


// assume lat/log is considered good
weather_url = "https://api.weather.gov/points/" + latitude + "," + longitude + "/forecast";



// make request to weather API
var request   = require('request');
//request.debug = true; // verbose output of request and response

var request_options = {
	url: weather_url,
	headers: { 
	// WARN: NWS requires that a User Agent be sent or they will block the request. 
	// References: https://stackoverflow.com/a/32641073, https://forecast-v3.weather.gov/documentation?redirect=legacy
		//'user-agent'   : 'JPTestExercise/v0.1a; contact.jpinkham@cpan.org',   
		'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',	
	  	'content-type' : 'application/json',	
	  },
	json : true,
};

// GAH! Why am I getting a 500 error, when this works in a browser? What headers are different?
// SOLVED: NWS didn't like my made-up user agent, even though it conforms to what NWS requested for the API


//console.log('http request options:' + request_options);

// TODO: use a real function, not anonymous
request.get(
	request_options, 
	function (error, response, body) {
	//?? assume 'error' is for a software error, rather than problem with response
		if (error) { console.log('error:', error); } // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		//console.log('body:\n', body); 

		// check for timeout
		// check for error response
			// if response code is not 200, print body.status, body.title, body.detail
		// if either occurred, show error and quit	

		weather_temp = response.body.properties.periods[0].temperature + ' ' + response.body.properties.periods[0].temperatureUnit;

		// check that response contains the temp data
		console.log("Temperature at location >" + latitude + "< lat and >" + longitude + "< long is >" + weather_temp + "<");


	}
);



