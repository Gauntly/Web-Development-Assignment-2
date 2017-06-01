var submission = document.getElementById("SubmissionWell");
var Customer_Address = "";
//We define our Regular Expressions here because they're so long I personally don't want to to put them directly in an argument.
var Regex_Name = new RegExp(/^[a-zA-Z ]{2,30}$/);
var Regex_Street = new RegExp(/^\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Place|Ave|Dr|Rd|Blvd|Ln|St|Pl)\.?/);
var Regex_NZPhone = new RegExp(/^(((\+?64\s*[-\.]?[3-9]|\(?0[3-9]\)?)\s*[-\.]?\d{3}\s*[-\.]?\d{4})|((\+?64\s*[-\.\(]?2\d{1}[-\.\)]?|\(?02\d{1}\)?)\s*[-\.]?\d{3}\s*[-\.]?\d{3,5})|((\+?64\s*[-\.]?[-\.\(]?800[-\.\)]?|[-\.\(]?0800[-\.\)]?)\s*[-\.]?\d{3}\s*[-\.]?(\d{2}|\d{5})))$/);

//Temporary storage values. We manipulate these temp values through various functions below, due to them being set as global values
//It is super simple to manipulate them and send them whereever they're required.

var Temp_Customer_Name = "";
var Temp_Customer_Phone_Number = "";
var Temp_Customer_Pickup_StreetName ="";
var Temp_Customer_Pickup_Suburb = "";
var Temp_Customer_Pickup_Date;
var Temp_Customer_Destination_Suburb ="";

//These are simply flags that are manipulated through the checks below. If the check succeeds it changes the value to true.
//When all checks are true the submission button is rendered to be become clickable.
var valid_Name = false;
var valid_PhoneNum = false;
var valid_StreetName = false;
var valid_PickupDate = false;
var valid_Pickup_Suburb = false;
var valid_Destination_Suburb = false;

//This function creates the html alert and posts it below the form field which does not validate.
function ErrorPost(ErrorElement,Error_message){
    var Error_Message = Error_message;
    var Error_CodeBlock = '<div class="alert alert-danger" role="alert">' +
        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false""></span>' +
        '<span class="sr-only">Error:</span>' + Error_Message +
        '</div>';
    ErrorElement.innerHTML  = Error_CodeBlock;
}

//I have tried to make the variable names meaningful as to explain what the function does.
//However we use regex to evaluate user input for their name. If it passes the check passes we make this check true.
function processName() {
    var Customer_Name = (document.getElementById("Customer_Name").value);
    if (Regex_Name.test(Customer_Name)) {
        Customer_Name = encodeURIComponent(document.getElementById("Customer_Name").value);
        valid_Name = true;
        checkForm();
        Temp_Customer_Name = Customer_Name;
    } else{
        var ErrorElement = document.getElementById("Customer_Name_Result");
        ErrorPost(ErrorElement," You need to enter a name!");
        valid_Name = false;
        checkForm();
    }
}

//We process the phone number with regex to validate that this infact is a valid phone number.
function processPhoneNum(){
    var Customer_Phone_Number = (document.getElementById("Customer_Phone_Number").value);
    if(Regex_NZPhone.test(Customer_Phone_Number)) {
        Customer_Phone_Number = encodeURIComponent(document.getElementById("Customer_Phone_Number").value);
        valid_PhoneNum = true;
        checkForm();
        Temp_Customer_Phone_Number = Customer_Phone_Number;
    }
    else{
        var ErrorElement = document.getElementById("Customer_Phone_Result");
        ErrorPost(ErrorElement," A phone number must be entered.");
        valid_PhoneNum = false;
        checkForm();
    }
}

//We again are using regex to determine if the user input is infact a valid street name.
function processStreetName(){
    var Customer_Pickup_StreetName = (document.getElementById("Customer_Pickup_StreetName").value);
    if(Regex_Street.test(Customer_Pickup_StreetName)){
        Customer_Pickup_StreetName = encodeURIComponent(document.getElementById("Customer_Pickup_StreetName").value);
        valid_StreetName = true;
        checkForm();
        Temp_Customer_Pickup_StreetName = Customer_Pickup_StreetName;
    }
    else{
        var ErrorElement = document.getElementById("Customer_Pickup_StreetName_Results");
        ErrorPost(ErrorElement," Please enter a real street name!");
        valid_StreetName = false;
        checkForm();
    }
}

//We have two checks for processing the pickup dateTime object.
//We spawn a current date and use the value of the datetime form input.
//We check if its empty or an invalid date(meaning not completed).
//We also check to see if the current date is greater than the user input date. If so its not possible to book.
function processPickUpDate(){
    var currentdate = new Date();
    var Customer_Pickup_Date = encodeURIComponent(document.getElementById("Customer_Pickup_Date").value);
    var Customer_Pickup_Date_Model = new Date(document.getElementById("Customer_Pickup_Date").value);

    if(Customer_Pickup_Date =="" || Customer_Pickup_Date == "Invalid Date") {
        var ErrorElement = document.getElementById("Customer_Pickup_Date_Result");
        ErrorPost(ErrorElement," Please enter a valid date!");
    }
    else if(Customer_Pickup_Date_Model < currentdate) {
        var ErrorElement = document.getElementById("Customer_Pickup_Date_Result");
            ErrorPost(ErrorElement," You cannot book a taxi in the past!");
    }
    else {
        valid_PickupDate = true;
        checkForm();
        Temp_Customer_Pickup_Date = Customer_Pickup_Date;
            }
}

//For this I had a tricky time designing the regex, due to time constraints so we check if it's empty.
//If so we call the alert.
//I really hope the dropdown I made is used instead though to populate the form with valid suburbs.
//But I understand for testing you will probably use illegal values, everything but a whitespace will pass.
function processPickupSuburb() {
    var Customer_Pickup_Suburb = encodeURIComponent(document.getElementById("Customer_Pickup_Suburb").value);
    if(Customer_Pickup_Suburb == ""){
        var ErrorElement = document.getElementById("Customer_Pickup_Suburb_Result");
        ErrorPost(ErrorElement," Please input a valid Suburb!");
        valid_Pickup_Suburb = false;
        checkForm();
    }
    else{
        valid_Pickup_Suburb = true;
        checkForm();
        Temp_Customer_Pickup_Suburb = Customer_Pickup_Suburb;
    }
}

//This function does exactly the same but for the form above.
//If I had more time I would have liked to create a single function that could have rendered both but that's on me.
function processDestinationSuburb() {
    var Customer_Destination_Suburb = encodeURIComponent(document.getElementById("Customer_Destination_Suburb").value);
    if(Customer_Destination_Suburb == ""){
        var ErrorElement = document.getElementById("Customer_Destination_Suburb_Result");
        ErrorPost(ErrorElement," Please input a valid Suburb!");
        valid_Destination_Suburb = false;
        checkForm();
    }
    else{
        valid_Destination_Suburb = true;
        checkForm();
        Temp_Customer_Destination_Suburb = Customer_Destination_Suburb;
    }
}

//Strip functions again feels lazy, If I spent a little more time I think I could have made this into a singular function.
//The strip functions remove the error when onfocus is activated in the form fields.
//The function names are pretty self explanatory.
function stripName() {
    var Customer_Name_Result = (document.getElementById("Customer_Name_Result"));
    Customer_Name_Result.innerHTML = "";
}
function stripPhone(){
    var Customer_Phone_Result = (document.getElementById("Customer_Phone_Result"));
    Customer_Phone_Result.innerHTML ="";
}
function stripStreet(){
    var Customer_Pickup_StreetName = (document.getElementById("Customer_Pickup_StreetName_Results"));
    Customer_Pickup_StreetName.innerHTML ="";
}
function stripDate(){
    var Customer_Pickup_Date = (document.getElementById("Customer_Pickup_Date_Result"));
    Customer_Pickup_Date.innerHTML ="";
}
function stripPickupSuburb(){
    var Customer_Pickup_Suburb = (document.getElementById("Customer_Pickup_Suburb_Result"));
    Customer_Pickup_Suburb.innerHTML ="";
}
function stripDestinationSuburb(){
    var Customer_Destination_Suburb = (document.getElementById("Customer_Destination_Suburb_Result"));
    Customer_Destination_Suburb.innerHTML ="";
}

//This function looks at all the checks. If they all pass the new submit button is rendered and is clickable.
//Otherwise we re-render a non-clickable button.
//We re-render the non-clickable button if you put valid information in but then take valid information out to
//try submit an incomplete form to the db.
function checkForm() {
    if ((valid_Name == true) && (valid_PhoneNum == true) && (valid_StreetName == true) && (valid_PickupDate == true) && (valid_Pickup_Suburb == true) && (valid_Destination_Suburb == true)) {
        submission.innerHTML = '<button type="submit" '+
            'class="btn btn-block btn-success btn-lg text-center"' +
            ' id="submission" onclick="sendData()">Request a Cab!</button>';
    }
    else if((!valid_Name) || (!valid_PhoneNum) || (!valid_StreetName) || (!valid_PickupDate) || (!valid_Pickup_Suburb) || (!valid_Destination_Suburb)) {
        submission.innerHTML = '<button type="submit" ' +
            'class="btn btn-block btn-success btn-lg text-center"' +
            ' id="submission" ' +
            'onclick="sendData()" ' +
            'disabled>Request a Cab!</button>';
    }
}

//Send data uses XML HTTP REQUEST to request a cab from php and render a success confirmation message below for the user.
function sendData() {
    Customer_Address = Temp_Customer_Pickup_StreetName +", "+ Temp_Customer_Pickup_Suburb;
    var request = new XMLHttpRequest();
    var url = "functions.php";
    var params = "action=request-cab" +
        "&name=" + Temp_Customer_Name +
        "&phone=" + Temp_Customer_Phone_Number +
        "&address=" + Customer_Address +
        "&destination=" + Temp_Customer_Destination_Suburb +
        "&time=" + Temp_Customer_Pickup_Date;

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200)
        {
            document.getElementById("results").innerHTML = request.responseText;
        }
    }
    request.send(params);
}

//We are are using this XHR to pull our data (if valid) from the DB and render it in the innerhtml of the data div.
function retrieveData() {
    var data = document.getElementById("bookings");
    var request = new XMLHttpRequest();
    var url = "functions.php";
    var params = "action=retrieve";
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            data.innerHTML = request.responseText;
        }
    }
    request.send(params);
}

//Similarly to the above function we are displaying a message if our data passes. We are also updating 'unassigned' to 'assigned'
//With the function calls in the php.
function updateData() {
    var idResults = document.getElementById("idResults")
    var data = document.getElementById("RefCodeSearch").value;
    var request = new XMLHttpRequest();
    var url = "functions.php";
    var params = "action=update&id="+data;
    idResults.innerHTML = data;
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            //nice little cheap trick to quicky post success or failure of allocating taxi.
            if(request.responseText === "Success"){
                idResults.innerHTML = "<h1 class='text-center'>The booking request "+"<span style='color: #449d44'>"+ data+ "</span> has been properly assigned</h1>";
                //reloading data to show instant result of approval.
                retrieveData();
            }else{
                idResults.innerHTML = "<h1 class='text-center'>The booking request has failed to be processed.</h1>";
            }

        }
    }
    request.send(params);
}