var page = require('webpage').create();
var fs = require('fs');
var teams = require('./ncaa-teamnames.js').remaining;
var args = require('system').args;
var year_counter = 0;
var team_counter = 0;

function setYear (years_arg) {
	var year;
	// years_arg is second arg passed via command line
	if (years_arg === '2001-2017') {
		 years = [
			'2001-2002', '2002-2003', '2003-2004', '2004-2005', '2005-2006', '2006-2007', '2008-2009', 
			'2010-2011', '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016', '2016-2017'
		];
		years.reverse()
		year = years[year_counter];
	} 
	else {
		// passed as a specific string (useful in case of error)
		year = years_arg;
	}
	return year;
}

function setTeam (specified_team) {
	// specified_team is second arg passed via command line
	// if empty string, it will use teams from constants
	// if string is specified, will use that team
	return specified_team.length ? specified_team : teams[team_counter];
}

function getNCAAdata(){
	var team = setTeam(args[1]); // first arg passed via command line
	var year = setYear(args[2]); // second arg passed via command line
	if (!team || !year) {
		var err = 'Error in either Team: '+team+', or Year: '+year;
		logError(err);
		phantom.exit();	
	}
	console.log('getNCAAdata year_counter, team, year', year_counter, team, year);
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
				// if content is null, then move onto next team?
				// team_counter += 1; 
			} else {
				// create a new file
				fs.write(output_path, content, 'w');
			}

			if (year_counter === years.length) {
				console.log('EXITING: counter === years.length');
				year_counter = 0;
				team_counter += 1;
				if (team_counter > teams.length) {
					phantom.exit();
				}
			}
			
			// re-run the top-level fn
			setTimeout(getNCAAdata(), 100);
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

if (team_counter === 0 && year_counter === 0) {
	getNCAAdata()
}