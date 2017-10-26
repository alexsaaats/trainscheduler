// jquery document iniatlize and page load actions
$(document).ready(function() {
console.log("Page loaded, JS started")

// Initialize Firebase
  	var config = {
	    apiKey: "AIzaSyAXhY_oYYf3lbxdINip3rZQA_5FTC0cNYs",
	    authDomain: "trainscheduler-a018d.firebaseapp.com",
	    databaseURL: "https://trainscheduler-a018d.firebaseio.com",
	    projectId: "trainscheduler-a018d",
	    storageBucket: "trainscheduler-a018d.appspot.com",
	    messagingSenderId: "248552848952"
  	};
  	firebase.initializeApp(config);

//set the DB
var database = firebase.database();

//create the initial variables and settings
var trains = [];
var train = "";
var trainname = "";
var destination = "";
var firsttriptime = "";
var frequency = "";
var nextarrival = "";
var traincount = {a: 0, b:"null"};
var traincounter = 1;
var dbcount ="";
var html ="";
var tid = 0;





//rendertrains();

//add a new train scheudule to the DB on click of the submit button

$("#submit-train").click(function() {

	// Prevent default behavior of form submit
	event.preventDefault();

	createTID();

	// Get the input values into an object and assign trainID
	//var traincounter = 
	train = new Object();
		train.name = $("#trainname-input").val().trim();
		train.destination = $("#destination-input").val().trim();
		train.firsttrip = $("#firsttrip-input").val().trim();
		train.frequency = $("#frequency-input").val().trim();
		train.trainID = tid;
		//train.ID = traincounter;

		

	function writeTrainData(trainID, destination, firsttrip, frequency, trainname) {
  		
  		firebase.database().ref('trains/' + train.trainID).set({
		    trainID: train.trainID,
		    destination: train.destination,
		    firsttrip: train.firsttrip,
		    frequency: train.frequency,
		    trainname: train.name
		});
	}

	writeTrainData();
	createTID();


	//var trainname = $("#trainname-input").val().trim();
	//var destination = $("#destination-input").val().trim();
	//var firsttrip = $("#firsttrip-input").val().trim();
	//var frequency = $("#frequency-input").val().trim();

	// Console log the variables for testing
	console.log(train.name);
	console.log(train.destination);
	console.log(train.firsttrip);
	console.log(train.frequency);
	//console.log(train.ID)

	// Save the values to the Firebase DB
	/* database.ref(train.ID).set({
  		trainname: train.name,
  		destination: train.destination,
  		firsttrip: train.firsttrip,
  		frequency: train.frequency,
  		//trainID: train.ID
	}); */

	//clear the form by setting blank values
	$("#trainname-input").val("");
	$("#destination-input").val("");
	$("#firsttrip-input").val("");
	$("#frequency-input").val("");

	//update the table
	cleartable();
	rendert();

	//increments the traincounter
	traincounter + 1;

//close the submit button function
});

console.log("traincounter: " + traincounter);









console.log("try rendert --- ");
rendert();







//TEST FUNKTION

function createTID() { 
database.ref('trains/').on('value', function(snapshot) { 
	tid = snapshot.numChildren() + 1; 
	console.log("TID: " + tid);
	//traincount.a = dbcount;
});
}



function rendert() { 

database.ref().on('value', function(snapshot) { 
	dbcount = ('Count: ' + snapshot.numChildren()); 
	console.log(dbcount);
	//traincount.a = dbcount;

	snapshot.forEach(function(child) {
    createHeaders(child.val());
    showItems(child.val(), key);
    console.log(child.val(), key);
	});

});
}

function createHeaders(data) {
    var html = '';
    html += '<tr>';
    $.each(data, function(key, value) {
        html += '<th>' + key + '</th>';
    });
    html += '<th class="text-right">';
    html += '</tr>';

    $("#tableHeaders").append(html);
    console.log(html);
}

function showItems(data, key) {
    var html = '';
    html += '<tr>';
    $.each(data, function(key, value) {
        html += '<td>' + value + '</td>';
    });
    html += '<td class="text-right"><a href="/" class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i> Edit</a> <a href="/" class="btn btn-danger btn-sm"><i class="fa fa-times"></i> Delete</a></td>';
    html += '</tr>';

    $('#results').append(html);
}

function cleartable() {
	var html = "";
	$('#results').append(html);
	$("#tableHeaders").append(html);
}






/*
//display the train schedule
function rendertrains() {
	//clear the table
	//$("#trainstable").empty();

	database.ref().on('value', function(snapshot) { 
	dbcount = ('Count: ' + snapshot.numChildren()); 
	console.log(dbcount);
	//traincount.a = dbcount;
	});

	database.ref().on("value", function(snapshot) {
	var db = snapshot.val();
	

	// Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

	//var trains = firebase.database().ref('trains/');
	//console.log(snapshot.val());
	//trains.on('value', function(snapshot) {
  		//updatetrains("#trainstable", snapshot.val());
	//});

	/*loop through creating new buttons from the full array
	for (var i = 0; i < trains.length; i++) {
		var a = $("<li>");
		a.addClass("topicitem");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#topicitems").append(a);
		};
}

/*---> Train schedule -- 
Train Name
Destination
Frequency (MIN)
Next Arrival
Minutes Away
*/

//End the document ready function
});