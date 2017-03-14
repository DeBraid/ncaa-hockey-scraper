var page = require('webpage').create();
var fs = require('fs');
// var teams = require('./ncaa-teamnames.js');
var args = require('system').args;
var year_counter = 0;
var team_counter = 0;

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

function setTeams(teams_arg) {
	return teams_arg[team_counter];
}
function getNCAAdata(){
	var team = args[1]; // first arg passed via command line
	var teams = setTeams(args[1]); // first arg passed via command line
	var years = setYears(args[2]); // second arg passed via command line
	var year = years[counter]
	console.log('getNCAAdata counter, team, year', counter, team, year);
	var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
	var output_path = 'output_data/'+team+'-'+year+'.tsv';
	
	page.open(URI, function (status) {
		console.log('Page Status', status);
		year_counter += 1
		if (status === 'success' || team_counter === teams.length) {
			var content = page.evaluate(function () {
				return document.getElementById('teamOA').innerText; // outputs TSV
			})
			
			if (!content) {
				logError(content)
			} else {
				// create a new file
				fs.write(output_path, content, 'w');
			}

			if (year_counter === years.length) {
				console.log('EXITING: counter === years.length');
				year_counter = 0;
				team_counter += 1;
				// phantom.exit();
			}
			else {
				// re-run the top-level fn
				setTimeout(getNCAAdata(), 100);
			}
		}
		else {
			logError(status)
			phantom.exit();	
		}

		function logError(error) {
			if (!error) {
				console.error('No content for', output_path)
			} else {
				console.error('Status: ', error)
				console.error('Error at: ', output_path)
			}
		}
	})
}

if (counter === 0) {
	getNCAAdata()
}