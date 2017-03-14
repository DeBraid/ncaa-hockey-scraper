var page = require('webpage').create();
var fs = require('fs');
// var teams = require('./ncaa-teamnames.js');
var args = require('system').args;
var counter = 0;

function setYears (years_arg) {
	var years;
	// years_arg is second arg passed via command line
	if (years_arg === '2001-2017') {
		 years = [
			'2001-2002', '2002-2003', '2003-2004', '2004-2005', '2005-2006', '2006-2007', '2008-2009', 
			'2010-2011', '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016', '2016-2017'
		];
	} 
	else {
		// passed exact array of years, like above (useful in case of error)
		years = years_arg;
	}
	return years;
}

function getNCAAdata(){
	var team = args[1]; // first arg passed via command line
	var years = setYears(args[2]); // second arg passed via command line
	var year = years[counter]
	console.log('getNCAAdata counter, team, year', counter, team, year);
	var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
	
	page.open(URI, function (status) {
		console.log('Page Status', status);
		counter += 1
		if (status === 'success') {
			var output_path = 'output_data/'+team+'-'+year+'.tsv';
			var content = page.evaluate(function () {
				return document.getElementById('teamOA').innerText; // outputs TSV
			})
			fs.write(output_path, content, 'w');
			if (counter === years.length) {
				console.log('counter === years.length, EXITING');
				phantom.exit();
			}
			else {
				setTimeout(getNCAAdata(), 100);
			}
		}
		else {
			output_path = 'output_data/error-'+team+'-'+year+'.tsv';
			var content = 'Error Status: ' + status;
			fs.write(output_path, content, 'w');
			phantom.exit();	
		}
	})
}

if (counter === 0) {
	getNCAAdata()
}