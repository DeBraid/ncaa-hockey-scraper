var page = require('webpage').create();
var fs = require('fs');
var output_path = 'ncaa_content.html';
var ncaa_url = 'http://www.uscho.com/stats/team/bemidji-state/womens-hockey/2016-2017/';

page.open(ncaa_url, function (status) {
  console.log('Page status', status);
  var content = page.content;
  // page.render('ncaa.png');
  fs.write(output_path, content, 'w');
  phantom.exit();
});