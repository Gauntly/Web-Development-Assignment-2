var btn = document.getElementById("btn_dropdown_pickup");
var btn_dest = document.getElementById("btn_dropdown_destination");

btn_dest.addEventListener('click', function () {
    btn_dest.removeEventListener('click',function () {});
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('POST', 'surroundingareas.json', true);
    ourRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    ourRequest.onload = function () {
        if (ourRequest.readyState == 4 && ourRequest.status == 200) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderListDest(ourData);
        }
    };
    ourRequest.send();
    btn_dest.removeEventListener('click', arguments.callee);
});


btn.addEventListener('click', function () {
            // btn.removeEventListener('click',function () {});
            var ourRequest = new XMLHttpRequest();
            ourRequest.open('POST', 'surroundingareas.json', true);
            ourRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            ourRequest.onload = function () {
                if (ourRequest.readyState == 4 && ourRequest.status == 200) {
                    var ourData = JSON.parse(ourRequest.responseText);
                    renderListPickUp(ourData);
                }


            };
            ourRequest.send();
    btn.removeEventListener('click', arguments.callee);
});

//Pulls local JSON data and creates a list that is used when the dropdown button is clicked.
function renderListPickUp(data) {
    for (i in data.area) {
        var x = data.area[i];
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.setAttribute("id",x);
        li.textContent = x;
        var ul = document.getElementById("areaList_pickup");
        ul.appendChild(li);
    }
}

function renderListDest(data) {
    for (i in data.area) {
        var x = data.area[i];
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.setAttribute("id", x);
        li.textContent = x;
        var ul = document.getElementById("areaList_dest");
        ul.appendChild(li);
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
