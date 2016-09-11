import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
		
	Meteor.methods({
		q: function() {
			return Meteor.http.get("50.116.62.202:3000/findinfo")
		}
})
});
