var fs = require('fs');
var csv = require('csv-parser');
var input_path = 'output_data/amherst-2001-2002.tsv'

fs.createReadStream(input_path)
  .pipe(csv({
  	separator: '\t'
  }))
  .on('data', function (row) {
    row.Season = '2001-2002'
    row.Team = 'amherst'
    console.log('row', row)
  })
  .on('end', function(){
    // var result = json2csv({ data: dataArray, fields: Object.keys(dataArray[0]) });
    // fs.writeFileSync(fileName, result);
  });