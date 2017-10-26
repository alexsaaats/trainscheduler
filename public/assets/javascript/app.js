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
var returnArr = [];

//logdb();

console.log("call rendert --- ");
rendert();
arrivaltime();


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
		

	function writeTrainData(trainID, destination, firsttrip, frequency, trainname) {
  		
  		firebase.database().ref('trains/' + train.trainID).set({
		    trainID: train.trainID,
		    destination: train.destination,
		    firsttrip: train.firsttrip,
		    frequency: train.frequency,
		    trainname: train.name
		});
	}

	function addtotable() {
		var html = "<tr><td>" 
				+ train.trainID + 
				"</td><td>" 
				+ train.trainname + 
				"</td><td>" 
				+ train.destination + 
				"</td><td>" 
				+ " NEXT ARRIVAL TIME " + 
				"</td><td>" 
				+ train.frequency + 
				"</td></tr>";

		$('#results').append(html);
	}

	//Call functions to save to DB and then create a new TID
	writeTrainData();
	createTID();
	//addtotable();

	// Console log the variables for testing
	console.log(train.name);
	console.log(train.destination);
	console.log(train.firsttrip);
	console.log(train.frequency);
	console.log(train.trainID);

	//clear the form by setting blank values
	$("#trainname-input").val("");
	$("#destination-input").val("");
	$("#firsttrip-input").val("");
	$("#frequency-input").val("");

	//update the table
	//cleartable();
	//rendert();

//close the submit button function
});





//FUNCTIONS --------------------------------------

// func to create the TID
function createTID() { 
database.ref('trains/').on('value', function(snapshot) { 
	tid = snapshot.numChildren() + 1; 
	console.log("TID: " + tid);
	//traincount.a = dbcount;
});
}

function logdb() {
	database.ref('/trains').on('value', function(snapshot) { 
		console.log(snapshot.val());
	});
}

function arrivaltime() {
	var time = moment().calendar(); 
	console.log(time);
	var htmltime = '<li id="el-time">' + time + '</li>';
	$('#el-time').append(htmltime);

	var arrival = '';

}



//func to render the trains table
function rendert() { 
	database.ref('/trains').on('value', function(snapshot) { 
		
	function snapshotToArray(snapshot) {
    		returnArr = [];
			 snapshot.forEach(function(childSnapshot) {
				var item = childSnapshot.val();
				item.key = childSnapshot.key;

				returnArr.push(item);
			});

    return returnArr;
	};


	firebase.database().ref('trains/').on('value', function(snapshot) {
	    console.log(snapshotToArray(snapshot));
	    	console.log(returnArr[0].trainname);

	    	var length = returnArr.length;
	    	console.log(length);
	    	console.log("LENGTH OF ARRAY: " + length);

	    	for (i=0; i < length; i++) {
			var html = "<tr><td>" 
					+ returnArr[i].trainID + 
					"</td><td>" 
					+ returnArr[i].trainname + 
					"</td><td>" 
					+ returnArr[i].destination + 
					"</td><td>" 
					+ " NEXT ARRIVAL TIME " + 
					"</td><td>" 
					+ returnArr[i].frequency + 
					"</td></tr>";

			$('#results').append(html);

			}
	});

		console.log("Return array: " + returnArr);

	});
}


/*
//Func to show the headers
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


//func to show the rows

function showItems1(data, key) {
    var html = '';
    html += '<tr>';
    $.each(data, function(key, value) {
        html += '<td>' + value + '</td>';
    });
    html += '<td class="text-right"></td>';
    html += '</tr>';

    $('#results').append(html);
    console.log(html);
}

function showItems(data, key) {
    var html = '';
    html += '<tr>';
    $.each(data, function(key, value) {
        html += '<td>' + value + '</td>';
    });
    html += '<td></td>';
    html += '</tr>';

    $('#results').append(html);
    console.log(html);
}




function loopitems(data, key) {
	for (i=0; i <= tid; i++) {
		var html = "<tr><td>" 
					+ data[i].trainID + 
					"</td><td>" 
					+ data[i].trainname + 
					"</td><td>" 
					+ data[i].destination + 
					"</td><td>" 
					+ " NEXT ARRIVAL TIME " + 
					"</td><td>" 
					+ data[i].frequency + 
					"</td></tr>";
	}

		//$('#results').append(html);
    	console.log(data);
	//}

}

*/


//Clears the table for reloading
function cleartable() {
	html = "<div></div>";
	$('#results').replace(html);
	//$("#tableHeaders").append(html);
	console.log("table cleared");
}


//End the document ready function
});