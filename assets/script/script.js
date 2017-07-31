// Initialize Firebase
var config = {
    apiKey: "AIzaSyCn20AAD7-UGQzb-_Gz5o3mTA9lyHfA7A0",
    authDomain: "timesheet-b00b0.firebaseapp.com",
    databaseURL: "https://timesheet-b00b0.firebaseio.com",
    projectId: "timesheet-b00b0",
    storageBucket: "",
    messagingSenderId: "629337215789"
};
  firebase.initializeApp(config);

// Create a var to reference the database
var database = firebase.database();


// Create initial values for the vars
var inputFirstName = '';
var inputLastName = '';
var inputRole = '';
var inputDate = '';
var inputRate = 0;

  // When the user clicks the submit button, get the date from the fields.
$('#submit').on('click', function() {
	event.preventDefault();
	inputFirstName = $('#input-first-name').val().trim().toLowerCase();
	inputLastName = $('#input-last-name').val().trim().toLowerCase();
	inputRole = $('#input-role').val().trim().toLowerCase();
	inputDate = $('#input-date').val().trim();
	inputRate = $('#input-rate').val().trim();
	console.log(inputFirstName)
	// And push them to Firebase.
	database.ref().push({
		inputFirstName: inputFirstName,
		inputLastName: inputLastName,
		inputRole: inputRole,
		inputDate: inputDate,
		inputRate: inputRate,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// On load and when data in Firebase changes, get a snapshot.
database.ref().on("value", function(snapshot) {
  
});

// When the search button is clicked...
$('#search-button').on('click', function() {
	event.preventDefault();
	// We get the value in the text field and save it in a var...
	var search = $('#search').val().trim().toLowerCase();
	var splitFirstName = search.split(' ')[0];
	var splitLastName = search.split(' ')[1];
	// START CODING HERE
	database.ref().orderByChild("inputFirstName").equalTo(splitFirstName).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      var dateFormat = 'MM/DD/YYYY';
      // Console.loging the last user's data
      console.log(sv.inputFirstName);
      // Put info into field
      $('#employee-output').text(sv.inputFirstName + ' ' + sv.inputLastName);
      $('#data-name').text(sv.inputFirstName + ' ' + sv.inputLastName);
      $('#data-role').text(sv.inputRole);
      $('#data-start').text(sv.inputDate);
      $('#data-rate').text(sv.inputRate);
      var convertedDate = moment(sv.inputDate, dateFormat);
      var monthsWorked = moment(convertedDate).diff(moment(), "months") * -1;
      $('#data-months').text(monthsWorked);
      var amountPaid = monthsWorked * sv.inputRate;
      $('#data-paid').text(amountPaid)
	});
	database.ref().orderByChild("inputLastName").equalTo(search).on("child_added", function(snapshot) {
	  var sv = snapshot.val();
	  var dateFormat = 'MM/DD/YYYY';
      // Put info into field
      $('#employee-output').text(sv.inputFirstName + ' ' + sv.inputLastName);
      $('#data-name').text(sv.inputFirstName + ' ' + sv.inputLastName);
      $('#data-role').text(sv.inputRole);
      $('#data-start').text(sv.inputDate);
      $('#data-rate').text(sv.inputRate);
      var convertedDate = moment(sv.inputDate, dateFormat);
      var monthsWorked = moment(convertedDate).diff(moment(), "months") * -1;
      $('#data-months').text(monthsWorked);
      var amountPaid = monthsWorked * sv.inputRate;
      $('#data-paid').text(amountPaid)
	});
});



