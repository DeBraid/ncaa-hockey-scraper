var page = require('webpage').create();
var fs = require('fs');
var teams = require('./ncaa-teamnames.js');
// var year = '2012-2013';
var team = 'wisconsin';
var years = ['2011-2012', '2012-2013', '2013-2014'];
// var output_path = 'output_data/'+team+'-'+year+'.tsv';
// var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
// var createTSV = function (status) {
// 	console.log('Page status', status);
// 	years.map(function (year) {
// 		if (status === 'success') {
// 			var output_path = 'output_data/'+team+'-'+year+'.tsv';
// 			var content = page.evaluate(function () {
// 				return document.getElementById('teamOA').innerText; // outputs TSV
// 			})
// 			fs.write(output_path, content, 'w');
// 			// phantom.exit();
// 			setTimeout(next_year, 100);
// 		}
// 		else {
// 			output_path = output_path = 'output_data/error-'+team+'-'+year+'.tsv';
// 			var content = ''
// 			fs.write(output_path, content, 'w');
// 			phantom.exit();	
// 		}
// 	})

// 	function next_year(years){
// 		var year = years.shift();
// 		console.log('year', year);
// 		if(!year) { phantom.exit(0); }
// 		handle_page(team, year);
// 	}
// }

function handle_page(team, year){
	console.log('handle_page team', team);
	console.log('handle_page year', year);
	var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
	
	page.open(URI, function (status) {
		console.log('Page status', status);
		// years.map(function (year) {
		if (status === 'success') {
			var output_path = 'output_data/'+team+'-'+year+'.tsv';
			var content = page.evaluate(function () {
				return document.getElementById('teamOA').innerText; // outputs TSV
			})
			fs.write(output_path, content, 'w');
			// phantom.exit();
			setTimeout(next_year, 100);
		}
		else {
			output_path = output_path = 'output_data/error-'+team+'-'+year+'.tsv';
			var content = ''
			fs.write(output_path, content, 'w');
			phantom.exit();	
		}
	})

	function next_year(years){
		var year = years.shift();
		console.log('year', year);
		if(!year) { phantom.exit(0); }
		handle_page(team, year);
	}
}

function init() {
	handle_page(team, years[0])
}

init()
// function next_team(){
//     var team=teams.shift();
//     if(!team){phantom.exit(0);}
//     handle_page(team);
// }
// function next_year(years){
//     var year=years.shift();
//     if(!year){phantom.exit(0);}
//     handle_page(year);
// }
// next_page();

