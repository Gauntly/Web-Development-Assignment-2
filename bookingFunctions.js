
var submission = document.getElementById("submission");
var Customer_Address = "";
submission.onclick = function sendData() {
    var currentdate = new Date();
    console.log("sendData Function Triggered.");
    var Customer_Name = encodeURIComponent(document.getElementById("Customer_Name").value);
    var Customer_Phone_Number = encodeURIComponent(document.getElementById("Customer_Phone_Number").value);
    var Customer_Pickup_StreetName = encodeURIComponent(document.getElementById("Customer_Pickup_StreetName").value);
    var Customer_Pickup_Unit = encodeURIComponent(document.getElementById("Customer_Pickup_Unit").value);
    var Customer_Pickup_Date = new Date(document.getElementById("Customer_Pickup_Date").value);
    var Customer_Pickup_Suburb = encodeURIComponent(document.getElementById("Customer_Pickup_Suburb").value);
    var Customer_Destination_Suburb = encodeURIComponent(document.getElementById("Customer_Destination_Suburb").value);
    //Simply checks if there was an optional unit number included. If not we correctly format the address.

    function ErrorPost(ErrorElement,Error_message){
       // var ErrorElement = ErrorElement;
       var Error_Message = Error_message;
       // var error = document.getElementById(ErrorElement);
       var Error_CodeBlock = '<div class="alert alert-danger" role="alert">' +
            '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false""></span>' +
            '<span class="sr-only">Error:</span>' + Error_Message +
           '</div>';
        ErrorElement.innerHTML  = Error_CodeBlock;
    }

    if(Customer_Name == ""){
        var ErrorElement = document.getElementById("Customer_Name_Result");
        ErrorPost(ErrorElement,"You need to enter a name!");
        // var CustomerError = document.getElementById("Customer_Name_Result");
        // var CustomerError_CodeBlock = '<div class="alert alert-danger alert-dismissable fade in" role="alert">' +
        //     '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false""></span>' +
        //     '<span class="sr-only">Error:</span>Please enter your name.</div>';
        // CustomerError.innerHTML  = CustomerError_CodeBlock;
        // alert("You need to enter a name!");
    }

    if(Customer_Phone_Number ==""){
        // alert("A phone number must be entered.")
    }

    if(Customer_Pickup_StreetName ==""){
        // alert("A street name must be entered!");
    }

    //We have converted the user inputted date to a Date Object, we can compare the current Date with the user inputted date.
    if(Customer_Pickup_Date == "Invalid Date"){
        // alert("You need to enter a date!");
    }else {
        if (Customer_Pickup_Date < currentdate) {

            // alert("You cannot book a taxi in the past!");
            console.log("current Date" + currentdate);
        } else {
            console.log("current Date " + currentdate);
            console.log("inputted date " + (Customer_Pickup_Date));
            Customer_Pickup_Date = encodeURIComponent(document.getElementById("Customer_Pickup_Date").value);
        }
    }

    if(Customer_Pickup_Suburb ==""){
        // alert("A suburb must be entered!");
    }
    if(Customer_Pickup_Unit == ""){
        Customer_Address = Customer_Pickup_StreetName +", " + Customer_Pickup_Suburb;
        console.log(decodeURI(Customer_Address));
    }else{
        Customer_Address = Customer_Pickup_StreetName +", "+ Customer_Pickup_Unit +", "+ Customer_Pickup_Suburb;
        console.log(decodeURI(Customer_Address));
    }

    if(Customer_Pickup_Suburb ==""){
        // alert("A suburb must be entered!");
    }else{

    }

    var request = new XMLHttpRequest();
    var url = "functions.php";
    var params = "action=request-cab&name=" + Customer_Name + "&phone=" + Customer_Phone_Number + "&address=" + Customer_Address + "&destination=" + Customer_Pickup_Suburb + "&time=" + Customer_Pickup_Date;

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function()
    {
        console.log("State changed");
        if (request.readyState == 4 && request.status == 200)
        {
            document.getElementById("results").innerHTML = request.responseText;
        }
    }
    request.send(params);
}

function strip()
{
    var CustomerError = document.getElementById("Customer_Name_Result");
    // var tmp = document.createElement("DIV");
    CustomerError.innerHTML = "";
}