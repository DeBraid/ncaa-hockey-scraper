module.exports = function setYear (years_arg) {
	var default_years = [
		'2016-2017', '2015-2016', '2014-2015', '2013-2014', 
		'2012-2013', '2011-2012', '2010-2011', '2009-2010', 
		'2008-2009', '2007-2008', '2006-2007', '2005-2006', 
		'2004-2005', '2003-2004', '2002-2003', '2001-2002' 
	]
	// years_arg is second arg passed via command line
	// default is the whole range, can omit arg and get 01-17
	if (!years_arg || years_arg === '2001-2017') {
		console.log('Years: default_years', default_years);
		return default_years;
	} 
	else {
		var years = [];
		// passed as a specific string (useful in case of error)
		var range = years_arg.split('-');
		var rangeDelta = Math.abs(range[0] - range[1]);
		if (rangeDelta <= 1) {
			years.push(years_arg);
		} else {
			// fix me --> remove -1 ?
			var end = Math.abs(range[0] - 2001) - 1;
			var start = Math.abs(range[1] - 2017) - 1;
			years = default_years.slice(start, default_years.length - end);
		}
		console.log('_setYears Years:', years);
		return years
	}
}