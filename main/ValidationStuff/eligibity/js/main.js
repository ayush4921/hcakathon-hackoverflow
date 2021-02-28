function handleclick() {
  let rbs = document.querySelectorAll('input[name="disease"]');
  let selectedValue;
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
  let message = document.getElementById("formmessage").value;
  let name = document.getElementById("fullname").value;
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  var cityRef = db.collection(user.uid).doc("data");

  var setWithMerge = cityRef.set(
    {
      message: message,
      profession: profession,
      name: name,
      eligible: true,
    },
    { merge: true }
  );
}
