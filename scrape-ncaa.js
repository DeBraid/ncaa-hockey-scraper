var page = require('webpage').create();
var fs = require('fs');
var teams = require('./ncaa-teamnames.js');
// var year = '2012-2013';
var counter = 0;

function handle_page(){
	var team = 'wisconsin';
	var years = ['2011-2012', '2012-2013', '2013-2014'];
	var year = years[counter]
	console.log('handle_page counter', counter);
	console.log('handle_page team', team);
	console.log('handle_page year', year);
	var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
	
	page.open(URI, function (status) {
		console.log('Page status', status);
		counter += 1
		// years.map(function (year) {
		if (status === 'success') {
			var output_path = 'output_data/'+team+'-'+year+'.tsv';
			var content = page.evaluate(function () {
				return document.getElementById('teamOA').innerText; // outputs TSV
			})
			fs.write(output_path, content, 'w');
			if (counter + 1 === years.length) {
				console.log('EXITING phantom.exit()');
				phantom.exit();
			}
			else {
				setTimeout(handle_page(), 100);
			}
		}
		else {
			output_path = output_path = 'output_data/error-'+team+'-'+year+'.tsv';
			var content = ''
			fs.write(output_path, content, 'w');
			phantom.exit();	
		}
	})
}

if (counter === 0) {
	handle_page()
}