var page = require('webpage').create();
var fs = require('fs');
// var teams = require('./ncaa-teamnames.js').remaining;
var _setYears = require('./_setYears.js');
var _setTeams = require('./_setTeams.js');
var args = require('system').args;

var teams = _setTeams(args[1]) 
var years = _setYears(args[2])
var year_counter = 0;
var team_counter = 0;

function getNCAAdata(){
	var team = teams[team_counter];
	var year = years[year_counter];
	if (!team || !year) {
		var err = 'Error in either Team: '+team+', or Year: '+year;
		logError(err);
		phantom.exit();	
	}
	console.log('getNCAAdata year_counter, team, year', year_counter, team, year);
	var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
	var output_path = 'output_data/'+team+'-'+year+'.tsv';
	console.log('Attemping to Open Page: ', URI);
	page.open(URI, function (status) {
		console.log('Page is Open, status', status);
		year_counter += 1
		if (status === 'success' || team_counter === teams.length) {
			var content = page.evaluate(function () {
				return document.getElementById('teamOA').innerText; // outputs TSV
			})
			
			if (!content) {
				logError(content)
				// if content is null, then move onto next team?
				skipToNextTeamOrExit(content)
			} else {
				// create a new file
				fs.write(output_path, content, 'w');
			}
			skipToNextTeamOrExit()
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

		function skipToNextTeamOrExit(content) {
		 	if (content === null || year_counter === years.length) {
				console.log('skipToNextTeam: content null');
				year_counter = 0;
				team_counter += 1;
				if (team_counter === teams.length) {
					console.log('Exit, no more teams.');
					phantom.exit();
				}
			}
		 }

		 function setTeam (specified_team) {
			// OPTIONAL: specified_team can be passed via CLI
			// ie. npm run scrape 'ohio-state'
			// if empty string, it will use teams array from constants
			// ie. npm run scrape ''
			if (specified_team.length) {
				teams = [];
				teams.push(specified_team);
			}
			return teams[team_counter];
		} 
	})
}

if (team_counter === 0 && year_counter === 0) {
	getNCAAdata()
}