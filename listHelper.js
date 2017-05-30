var btn = document.getElementById("btn_dropdown_pickup");
var btn_dest = document.getElementById("btn_dropdown_destination");

btn_dest.addEventListener('click', function () {
    btn_dest.removeEventListener('click',function () {});
    var btn_Destination_Request = new XMLHttpRequest();
    btn_Destination_Request.open('POST', 'surroundingareas.json', true);
    btn_Destination_Request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    btn_Destination_Request.onload = function () {
        if (btn_Destination_Request.readyState == 4 && btn_Destination_Request.status == 200) {
            var ourData = JSON.parse(btn_Destination_Request.responseText);
            areaList = ourData.area;
                renderListDest(ourData);
        }
    };
    btn_Destination_Request.send();
    btn_dest.removeEventListener('click', arguments.callee);
});
btn.addEventListener('click', function () {
            btn.removeEventListener('click',function () {});
            var btn_Pickup_Request = new XMLHttpRequest();
            btn_Pickup_Request.open('POST', 'surroundingareas.json', true);
            btn_Pickup_Request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            btn_Pickup_Request.onload = function () {
                if (btn_Pickup_Request.readyState == 4 && btn_Pickup_Request.status == 200) {
                    var ourData = JSON.parse(btn_Pickup_Request.responseText);
                    renderListPickUp(ourData);
                }


            };
            btn_Pickup_Request.send();
    btn.removeEventListener('click', arguments.callee);
});

//Pulls local JSON data and creates a list that is used when the dropdown button is clicked.

function renderListPickUp(data) {
    var ul = document.getElementById("areaList_pickup");
    for (i in data.area) {
        var x = data.area[i];
        var li = document.createElement("li");
        li.setAttribute("id", x);
        ul.appendChild(li);
        var htmLIST = document.getElementById(x);
        htmLIST.innerHTML = '<a href="#" id="'+x+'" onclick="processPickupSuburb()" onblur="processPickupSuburb()">' +x+ '</a>';
    }
}
function renderListDest(data) {
    var ul = document.getElementById('areaList_dest');
        for (i in data.area) {
            var x = data.area[i];
            var li = document.createElement("li");
            li.setAttribute("id",x+1);
            ul.appendChild(li);
            var htmLIST = document.getElementById(x+1);
            htmLIST.innerHTML = '<a href="#" id="'+x+'" onclick="processDestinationSuburb" onblur="processDestinationSuburb()">' +x+ '</a>';
        }
}

var ul_dest = document.getElementById('areaList_dest');
var ul = document.getElementById('areaList_pickup');

    ul.onclick = function (event) {
        var text = document.getElementById('Customer_Pickup_Suburb');
        var target = getEventTarget(event);
        text.value = target;
    };

    ul_dest.onclick = function (event) {
        var text = document.getElementById('Customer_Destination_Suburb');
        var target = getEventTarget(event);
        text.value = target;
    };
    function getEventTarget(e) {
        e = e || window.event;
        return e.target.id;
    }
