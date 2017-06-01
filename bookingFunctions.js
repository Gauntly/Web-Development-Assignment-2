var submission = document.getElementById("SubmissionWell");
var Customer_Address = "";
var Regex_Name = new RegExp(/^[a-zA-Z ]{2,30}$/);
var Regex_Street = new RegExp(/^\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Place|Ave|Dr|Rd|Blvd|Ln|St|Pl)\.?/);
var Regex_NZPhone = new RegExp(/^(((\+?64\s*[-\.]?[3-9]|\(?0[3-9]\)?)\s*[-\.]?\d{3}\s*[-\.]?\d{4})|((\+?64\s*[-\.\(]?2\d{1}[-\.\)]?|\(?02\d{1}\)?)\s*[-\.]?\d{3}\s*[-\.]?\d{3,5})|((\+?64\s*[-\.]?[-\.\(]?800[-\.\)]?|[-\.\(]?0800[-\.\)]?)\s*[-\.]?\d{3}\s*[-\.]?(\d{2}|\d{5})))$/);

var Temp_Customer_Name = "";
var Temp_Customer_Phone_Number = "";
var Temp_Customer_Pickup_StreetName ="";
var Temp_Customer_Pickup_Suburb = "";
var Temp_Customer_Pickup_Date;
var Temp_Customer_Destination_Suburb ="";

var valid_Name = false;
var valid_PhoneNum = false;
var valid_StreetName = false;
var valid_PickupDate = false;
var valid_Pickup_Suburb = false;
var valid_Destination_Suburb = false;

function ErrorPost(ErrorElement,Error_message){
    var Error_Message = Error_message;
    var Error_CodeBlock = '<div class="alert alert-danger" role="alert">' +
        '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false""></span>' +
        '<span class="sr-only">Error:</span>' + Error_Message +
        '</div>';
    ErrorElement.innerHTML  = Error_CodeBlock;
}

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
//Strip functions again feels lazy, If I spent a little more time I think I could have
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

function checkForm() {
    if ((valid_Name == true) && (valid_PhoneNum == true) && (valid_StreetName == true) && (valid_PickupDate == true) && (valid_Pickup_Suburb == true) && (valid_Destination_Suburb == true)) {
        submission.innerHTML = '<button type="submit" '+
            'class="btn btn-block btn-success btn-lg text-center"' +
            ' id="submission" onclick="sendData()">Request a Cab!</button>';
    }
    else if((!valid_Name) || (!valid_PhoneNum) || (!valid_StreetName) || (!valid_PickupDate) || (!valid_Pickup_Suburb) || (!valid_Destination_Suburb)) {
        console.log("should get here 33");
        // console.log("(valid_Name)" + (valid_Name) + "(valid_PhoneNum)" + (valid_PhoneNum) + "(valid_StreetName)" + valid_StreetName + "valid_PickupDate" + valid_PickupDate + "valid_Pickup_Suburb" + valid_Pickup_Suburb + "valid_Destination_Suburb"+ valid_Destination_Suburb);
        submission.innerHTML = '<button type="submit" ' +
            'class="btn btn-block btn-success btn-lg text-center"' +
            ' id="submission" ' +
            'onclick="sendData()" ' +
            'disabled>Request a Cab!</button>';
    }
}

function sendData() {
    console.log("sendData Function Triggered.");
    Customer_Address = Temp_Customer_Pickup_StreetName +", "+ Temp_Customer_Pickup_Suburb;
    console.log(Customer_Address);
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
        console.log("State changed");
        console.log()
        if (request.readyState == 4 && request.status == 200)
        {
            document.getElementById("results").innerHTML = request.responseText;
        }
    }
    request.send(params);
}

function retrieveData() {
    var data = document.getElementById("bookings");
    var request = new XMLHttpRequest();
    var url = "functions.php";
    var params = "action=get";

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function() {
        console.log("State changed on Admin page");
        if (request.readyState == 4 && request.status == 200) {
            console.log("we get to 4th ready state successfully.");
            data.innerHTML = request.responseText;
        }
    }
    request.send(params);
}
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
        console.log(data);
        console.log("State changed on Admin page");
        if (request.readyState == 4 && request.status == 200) {
            console.log("we get to 4th ready state successfully.");
            //nice little cheap trick to quicky post success or failure of allocating taxi.
            if(request.responseText === "Success"){
                idResults.innerHTML = "<h1 class='text-center'>The booking request "+"<span style='color: #449d44'>"+ data+ "</span> has been properly assigned</h1>";
                retrieveData();
            }else{
                idResults.innerHTML = "<h1 class='text-center'>The booking request has failed to be processed.</h1>";
            }

        }
    }
    request.send(params);
}