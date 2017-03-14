var page = require('webpage').create();
var fs = require('fs');

var team = 'wisconsin';
var year = '2016-2017';
var output_path = 'output_data/'+team+'-'+year+'.tsv';
var URI = 'http://www.uscho.com/stats/team/'+team+'/womens-hockey/'+year+'/';

page.open(URI, function (status) {
  console.log('Page status', status);
  var content = page.evaluate(function () {
  	// outputs a TSV
  	return document.getElementById('teamOA').innerText;
  })
  fs.write(output_path, content, 'w');
  phantom.exit();
});