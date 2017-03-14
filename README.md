# NCAA Womens Hockey Stats

A program to scrape NCAA stats.

### How it works: 

Run `npm run scrape TEAM_NAME`.

ie. 

> `npm run scrape 'ohio-state'`

### Notes 

* `TEAM_NAME` is a string variable passed as first arg via command line.
* `npm run scrape` is an alias for: `phantomjs scrape-ncaa.js`

so ensure `phantomjs` is installed!

## Output 

Create a TSV in folder `output_data` with format:

* `var output_path = 'output_data/'+team+'-'+year+'.tsv';`

# TODO: 

* going back to 2000-2001 season, extract 1 csv for each season with all possible teams

