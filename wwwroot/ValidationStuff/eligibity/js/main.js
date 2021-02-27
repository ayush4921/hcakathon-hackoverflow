function handleform() {
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  var cityRef = db.collection(user.uid).doc("data");
  let rbs = document.querySelectorAll('input[name="disease"]');
  let selecteddisease;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      break;
    }
  }
  let citizen = document.querySelectorAll('input[name="Citizen"]');
  let profession = document.getElementById("profession").value;
  let citizenship;
  for (const rb of citizen) {
    if (rb.checked) {
      citizenship = rb.value;
      break;
    }
  }
  let message = document.getElementById.value;
  let name = document.getElementById("fullname").value;
  db.collection("cities")
    .doc("LA")
    .set({
      disease: selecteddisease,
      citizenship: citizenship,
      message: message,
      profession: profession,
      name: name,
    })
    .then(() => {
      alert("Document successfully written!");
    })
    .catch((error) => {
      alert(error);
    });
  var setWithMerge = cityRef.set(
    {
      disease: selecteddisease,
      citizenship: citizenship,
      message: message,
      profession: profession,
      name: name,
    },
    { merge: true }
  );
}
document.getElementById("submitbutton").onclick = function () {
  handleform();
};
