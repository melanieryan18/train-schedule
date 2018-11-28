// Initialize Firebase
console.log("CHOO CHOO");

var config = {
    apiKey: "AIzaSyBxKaBzWShI2hUrT3veWwQ3oVgsrycA_bE",
    authDomain: "choo-choo-schedule-469ea.firebaseapp.com",
    databaseURL: "https://choo-choo-schedule-469ea.firebaseio.com",
    projectId: "choo-choo-schedule-469ea",
    storageBucket: "choo-choo-schedule-469ea.appspot.com",
    messagingSenderId: "700131271010"
};
firebase.initializeApp(config);

var database = firebase.database();

// get the data from ui 
$(document).on("click", "#add-train-btn", function (e) {
    e.preventDefault();
    var train = $("#train-input").val();
    var destination = $("#destination-input").val();
    var frequency = $("#frequency-input").val();
    var nextArrival = $("#arrival-input").val();
    var minutesAway = $("#minutes-input").val();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        train: train,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
    }

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.desination);
    console.log(newTrain.frequency);
    console.log(newTrain.nextArrival);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#arrival-input").val("");
    $("#minutes-input").val("");


    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var tName = childSnapshot.val().train;
        var tDest = childSnapshot.val().destination;
        var tFreq = childSnapshot.val().frequency;
        var tArrival = childSnapshot.val().nextArrival;

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" +
            tFreq + "</td><td>" + tArrival + "</td><td>"); 
    });
    // // Create the new row
    // var newRow = $("<tr>").append(
    //     $("<td>").text(trainName),
    //     $("<td>").text(trainDest),
    //     $("<td>").text(trainFreq),
    //     $("<td>").text(trainArrival),
    //     $("<td>").text(minsAway),
    // );

    // // Append the new row to the table
    // $("#train-table > tbody").append(newRow);
});

