var page = require('webpage').create();
var fs = require('fs');
var output_path = 'ncaa_content.tsv';
var ncaa_url = 'http://www.uscho.com/stats/team/bemidji-state/womens-hockey/2016-2017/';

page.open(ncaa_url, function (status) {
  console.log('Page status', status);
  // var content = page.content;
  var content = page.evaluate(function () {
  	// return document.getElementById('teamOA').innerHTML;
  	return document.getElementById('teamOA').innerText;
  })
  // console.log('Page content', content);
  // page.render('ncaa.png');
  fs.write(output_path, content, 'w');
  phantom.exit();
});