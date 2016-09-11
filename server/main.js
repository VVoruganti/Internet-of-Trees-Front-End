import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	
		var settings = {
		 "async": true,
		 "crossDomain": true,
		 "url": "http://127.0.0.1:3000/up/",
		 "method": "POST",
		 "headers": {
		   "cache-control": "no-cache",
		   "postman-token": "d6fe2240-d957-723f-f2c2-3ca3d2eee6a7",
		   "content-type": "application/x-www-form-urlencoded"
		 },
		 "data": {
		   "c": "blue",
		   "": ""
		 }
		}

	/*	$.ajax(settings).done(function (response) {
		 console.log(response);
		}); */
		//Vineeth • Now

	}

);