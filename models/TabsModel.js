const mongoose = require('mongoose')

var TabsSchema = new mongoose.Schema({
	tabsID: {
		type: Number,
		required: true
	},

	tabsName: {
		type: String,
		required: true
	},

	tabsInstrument: {
		type: String,
		required: true
	},

	URL: {
		type: String,
		required: true
	}
});

var tabs = mongoose.model('Tabs', TabsSchema);

module.exports = tabs;