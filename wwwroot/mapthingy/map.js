let result = document.getElementById("result");
let xhr = new XMLHttpRequest();
xhr.open("GET", "data.json");
xhr.addEventListener("load", processJSON);
xhr.send();
function processJSON(event) {
  let json = this.responseText;
  const obj = JSON.parse(json);
  console.log(obj);
}

function getPosition() {
  // Simple wrapper
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}
async function main(obj) {
  var position = await getPosition();
  location = { latitude: position.latitude, longitude: position.longitude };
  asdasd = calculatedistance(obj, location);
}

function calculatedistance(obj1, object2) {
  mydict = [];
  outputdict = {};
  Object.keys(obj1).forEach(function (key) {
    distance = calculateqdistance(
      obj1[key]["LATITUDE"],
      obj1[key]["LONGITUDE"],
      object2["latitude"],
      object2["longitude"]
    );
    mydict.push({ key: distance });
  });
  mydict.sort(function (a, b) {
    return a.key - b.key;
  });
  for (i = 0; i < 5; i++) {
    outputdict[mydict[i]] = obj1[mydict[i]];
  }
  return outputdict;
}

function calculateqdistance(lat1, long1, lat2, long2) {
  return ((lat1 - lat2) ** 2 + (long1 - long2) ** 2) ** 1 / 2;
}
