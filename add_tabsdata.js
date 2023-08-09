const db = require ('./models/mysqldb.js');

async function addData() {
	var tab = {
		tabsID: 1,
		tabsName: 'Somewhere Over The Rainbow',
		tabsInstrument: 'Ukulele',
		URL: 'somewhere_over_the_rainbow'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 2,
		tabsName: 'Adventure Time (Theme)',
		tabsInstrument: 'Ukulele',
		URL: 'adventure_time_theme'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 3,
		tabsName: 'Another One Bites The Dust',
		tabsInstrument: 'Bass',
		URL: 'another_one_bites_the_dust'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 4,
		tabsName: 'Cups',
		tabsInstrument: 'Ukulele',
		URL: 'cups'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 5,
		tabsName: 'Like Im Gonna Lose You',
		tabsInstrument: 'Bass',
		URL: 'like_im_gonna_lose_you'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 6,
		tabsName: 'Smells Like Teen Spirit',
		tabsInstrument: 'Bass',
		URL: 'smells_like_teen_spirit'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 7,
		tabsName: 'Pumped Up Kicks',
		tabsInstrument: 'Ukulele',
		URL: 'pumped_up_kicks'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 8,
		tabsName: 'Riptide',
		tabsInstrument: 'Ukulele',
		URL: 'riptide'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 9,
		tabsName: 'Feel Good Inc.',
		tabsInstrument: 'Bass',
		URL: 'feel_good_inc'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 10,
		tabsName: 'Perfect',
		tabsInstrument: 'Guitar',
		URL: 'perfect'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
	
	var tab = {
		tabsID: 11,
		tabsName: 'Seven Nation Army',
		tabsInstrument: 'Bass',
		URL: 'seven_nation_army'
	};
	
	var query = "INSERT INTO `tab` (tabsID, tabsName, tabsInstrument, URL) values ('" + tab.tabsID + "', '" + tab.tabsName + "', '" + tab.tabsInstrument + "', '" + tab.URL + "');";
		
	await db.query(query)
}

addData();