// jquery document iniatlize and page load actions
$(document).ready(function() {
console.log("Page loaded, JS started")


//create the initial variables and settings
var topics = [
	"Saab", 
	"Volvo", 
	"BMW",
	"Ford",
	"Dodge"
];
console.log(topics);

var search_input = "";
var imageitem = "";
var images_URLlist = [];
var images_IDlist = [];
var images_MEDIAlist = [];
var imageitemURL = '';

$(document).on("click", ".topicitem", loadimages);
$(document).on("click", ".specimage", startgif);

renderButtons();
//loadimages();


// use a loop to create buttons using the array of Topics
function renderButtons() {
	//clear the buttons list in dropdown
	$("#topicitems").empty();

	//loop through creating new buttons from the full array
	for (var i = 0; i < topics.length; i++) {
		var a = $("<li>");
		a.addClass("topicitem");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#topicitems").append(a);
		};
}



// get images from GIPHY when a user clicks a topic button
function loadimages() {
	//Reset the images panel
	$("#imagespanel").empty();

	// set the URL and API key
	var carmodel = $(this).attr("data-name");
	var APIKey = "yAQCeuihnTMHGj8vNnbRTPUI7wcf3oSp";
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + carmodel + "&limit=10&offset=0&rating=PG-13&lang=en";
	var imageitem = "";

	//clearing lists
    var images_IDlist = [];
    var images_URLlist = [];
    var images_MEDIAlist = [];

	// use ajax to open the URL call
	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);

          // Creating a div to hold the images
          var imagesDiv = $("<div class='images'>");

          // Storing the values I need by pulling the 
	        for (var i=0; i < 10; i++) {
			    var imageitem = response.data[i];
			    //console.log(imageitem);

			    //var imageID = imageitem.id;
			    var imageURL = imageitem.images.original_still.url;
			    var imageMEDIA = imageitem.images.original.url;
			    //console.log(imageID);
			    console.log(imageURL);
			    console.log("Media  " + imageMEDIA);
			    //images_IDlist.push(imageID);
			    images_URLlist.push(imageURL);
			    images_MEDIAlist.push(imageMEDIA);

	        }
	          
          // Creating an element to hold the image
          for (var i = 0; i < images_URLlist.length; i++) {
          		var image = $("<img class='specimage'>").attr({
          			src: images_URLlist[i],
          			id: "staticimage"
          			});

	          	imagesDiv.append(image);
          }
         
          // Put the data into the images container
          $("#imagespanel").append(imagesDiv);
	 });
}





// make the image play on click
function startgif () {
	$(".specimage").attr('src', "https://media0.giphy.com/media/l2Jeams6Je8yy3Mis/giphy_s.gif");
}






// make the image stop on click


// add a topic to the array from our Search Bar


$(function() {
    // Save a reference to the input
    var input = $("input[name=search_input]"),
    // Get the form itself
    form = $("form[name=search_form]");
    // Storage for your first_name outside of the scope
    //search_input = false;
	// Bind to the submit event on the form
	form.bind('submit', function() {
        // Set the first_name to the input's value
        search_input = input.val();
        // Log it out (per your example)
        console.log(search_input);
        // show the search history in the search history box
        $("#searchresultslist").append(search_input + '</br></br>');
        // add the item to the array
        topics.push(search_input);
        // add the item to our dropdown list
        renderButtons();
        //$("#topicitems").append('<li id="topic"><a href=>' + search_input + '</a></li>');
        // Return false to prevent the form from posting
        return false;
    });
});


//End the document ready function
});