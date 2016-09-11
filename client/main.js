import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
trees = new Mongo.Collection("trees");


Template.editSidebar.onCreated(function helloOnCreated() {
  this.currentTree = new ReactiveVar(null);
  var mydata = JSON.parse(data);
    trees.insert(data);
});

Template.editSidebar.helpers({
  trees() {
	  var array = [];
	  var cursor = trees.find();
	  while(cursor.hasNext)
	  {
		  array.push(cursor.next());
	  }
	  return array;
  },
  currentTree() {
	  return currentTree.get();
  }
});

Template.editSidebar.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
