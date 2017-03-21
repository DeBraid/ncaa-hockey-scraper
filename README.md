# NCAA Womens Hockey Stats

A program to scrape NCAA stats.

### How it works: 

Run `npm run start TEAM_NAME YEARS_RANGE`.

under the hood, this runs: 

* `phantomjs scrape-ncaa.js >> logs/log-file.txt`

ie. 

> `npm run start '' '2001-2017'`

* Passing empty string to scrape will default to using the teams array (`ncaa-teamnames.js`).

#### Use Specific Team or Date Range

> `npm run start 'ohio-state' '2010-2015'`

Above is useful when errors occur.

##  Logs 

Success and Errors will be captured in `logs/log-file.txt`  (see `package.json` to change dir / filename)

### Notes 

* `TEAM_NAME` is a string variable passed as first arg via command line.
* `npm run scrape` is an alias for: `phantomjs scrape-ncaa.js`

so ensure `phantomjs` is installed!

## Output 

Create a TSV in folder `output_data` with format:

* `var output_path = 'output_data/'+team+'-'+year+'.tsv';`

# TODO: 

* going back to 2000-2001 season, extract 1 csv for each season with all possible teams

