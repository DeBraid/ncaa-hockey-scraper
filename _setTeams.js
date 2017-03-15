var teams = require('./ncaa-teamnames.js').remaining;
// OPTIONAL: specified_team can be passed via CLI
// ie. npm run scrape 'ohio-state'
// if empty string, it will use teams array from constants
// ie. npm run scrape ''

module.exports = function setTeam (specified_team) {
	if (specified_team.length) {
		teams = [];
		teams.push(specified_team);
	}
	return teams;
} 