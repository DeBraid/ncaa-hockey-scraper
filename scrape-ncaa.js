var page = require('webpage').create();
var fs = require('fs');
var teams = require('./ncaa-teamnames.js');
var team = 'wisconsin';
// var year = '2016-2017';
var year = '2013-2014';
// var years = ['2014-2015', '2015-2016', '2016-2017'];
var output_path = 'output_data/'+team+'-'+year+'.tsv';
var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';
var createTSV = function (status) {
  console.log('Page status', status);
  if (status === 'success') {
	  var content = page.evaluate(function () {
	  	// outputs a TSV
	  	return document.getElementById('teamOA').innerText;
	  })
	  fs.write(output_path, content, 'w');
	  phantom.exit();
  }
  else {
  	output_path = output_path = 'output_data/error-'+team+'-'+year+'.tsv';
  	var content = ''
	fs.write(output_path, content, 'w');
	phantom.exit();	
  }
}

page.open(URI, createTSV);