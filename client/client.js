import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var treeArray = new ReactiveVar([]);
var currentTree = new ReactiveVar(null);
Template.editSidebar.onCreated(function sidebarOnCreated() {
});

Template.editSidebar.helpers({
  trees:function() {
    var array = [];
	var cursor = Trees.find();
	cursor.forEach(function(doc){array.push(doc)});
	treeArray.set(array);
	return array;
  },
  curTree : function()
  {
	  return currentTree.get();
  },
  shouldBeChecked: function (value)
  {
	if(value!=null&&value!=undefined&&value!="")
		return "checked"
	return "";
  }
});

Template.editSidebar.events({
  'change #TreeList'(event, instance) {
    // increment the counter when button is clicked
	editTree(compileObj());
    var id = $("#TreeList").val();
	console.log(id)
	for(let i = 0; i <treeArray.get().length; i ++)
	{
		if(id == treeArray.get()[i].TreeID)
		{
			currentTree.set(treeArray.get()[i]);
			return;
		}
	}
	currentTree.set(null);
  },
  'change #ID' (event,instance) {
	  var id= $('#ID').val();
	  deleteTree(currentTree.get());
	  for(i = 0; i < treeArray.get().length; i++)
	  {
		  if(id == treeArray.get()[i].TreeID) 
		  {
			  currentTree.set(treeArray.get()[i]);
			  return;
		  }
	  }
	  addTree(compileObj);
	  
  },
  'click #catalogTree' (event, instance) {
	  editTree(compileObj());
  },
  'click #removeTree' (event, instance) {
	  removeTree(compileObj());
  }
});

  function compileObj()
  {
	  var obj = {};
	  obj.TreeID = $("#ID").val();
	  obj.Species = $("#Tree-Species").val();
	  obj.location = $("#Location").val();
	  obj.size = $("#Size").val();
	  obj.diameter = $("#Diameter").val();
	  obj.clean = z($("#Clean").is(':checked'));
	  obj.weed = z($("#Weed").is(':checked'));
	  obj.prune = z($("#Prune").is(':checked'));
	  obj.canker = z($("#Canker").is(':checked'));
	  obj.crack = z($("#Crack").is(':checked'));
	  obj.Cavities = z($("#Cavities").is(':checked'));
	  obj.Decay = z($("#Decay").is(':checked'));
	  obj.Gall = z($("#Gall").is(':checked'));
	  obj.insects = z($("#Insects").is(':checked'));
	  obj.Comments =$("#Comments").val();
	  return obj;
	  
  }
  function getTree(obj)
  {
	  $.ajax(
	  {
		  url:'http://50.116.62.202:3000/findinfo?TreeID='+obj.TreeID,
		  method:'GET',
		  data:obj,
		  success: function(data) {
			  currentTree.set(data.note[0]);
		  }
	  });
		  
  }
 
  function z(x)
  {
	  if(x)
		  return "X";
  }
   function addTree(obj)
  {
	  return;
	  if (obj.TreeID==undefined||obj.TreeID=="")
		  return;
	  $.ajax(
	  {
		  url:'http:/50.116.62.202:3000/upload',
		  method:'POST',
		  contentType: "application/x-www-form-urlencoded",
		  data:obj,
		  success: function(data) {
			  treeArray.set(data);
			  setSelect(obj);
		  }
		});
  }
  function editTree(obj)
  {
	  return;
	  if (obj.TreeID==undefined||obj.TreeID=="")
		  return;
	  Meteor.call("q", function(err, resp) {
		console.log(resp);
		treeArray.set(resp.content);
	  });
	 // HTTP.call("POST", 'http:/50.116.62.202:3000/edit', {"contentType": "application/x-www-form-urlencoded"}, function(data, status) {
	//		console.log(status);});
	  //	  event.preventDefault();
/*	  $.ajax(
	  {
		  url: 'http:/50.116.62.202:3000/edit',
		 method: "POST",
		   contentType: "application/x-www-form-urlencoded",
		  data:obj, 
		  crossDomain:true,
		  success: function(data, status) {
			treeArray.set(data);
			console.log(status);
		  },
		  'error': function(data) {
			  console.log(data)
		  }
	  }
	  ); */
  }
  function deleteTree(obj)
  {
	  return;
		$.ajax({
			url:'http://50.116.62.202:3000/delete',
			method:"DELETE", 
			data:obj, 
			success: function(data){
					treeArray.set(data);
					currentArray.set(treeArray.get()[0]);//needs more 
				}
			});
  }
  function setSelect(obj)
  {
	  $("TreeList").val(obj.TreeID);
  }
