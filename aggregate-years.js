var fs = require('fs');
var csv = require('csv-parser');
var json2csv = require('json2csv');
var glob = require('glob');
var path = require('path');
// var year = '2001-2002';
var years = [
	'2016-2017', '2015-2016', '2014-2015', '2013-2014', '2012-2013', '2011-2012', '2010-2011',
	'2008-2009', '2006-2007', '2005-2006', '2004-2005', '2003-2004', '2002-2003'
]

years.map((year) => {
	var path_for_glob = `./output_data/*${ year }.tsv`; 
	var output_file_name = `./output_data/${ year }.csv`; 
	var dataArray = [];

	glob.sync(path_for_glob).forEach((file, i)=>{
		fs.createReadStream(file)
			.pipe(csv({ separator: '\t' }))
			.on('data', function (row) {
				var team = file.split('-20')[0].split('data/')[1]
				// console.log('team', team);
				row.Season = year;
				row.Team = team;
				// console.log('row', row)
				dataArray.push(row)
			})
			.on('end', function(){
				var result = json2csv({ data: dataArray, fields: Object.keys(dataArray[0]) });
				fs.writeFileSync(output_file_name, result);
			});
	})
	dataArray = [];
})
