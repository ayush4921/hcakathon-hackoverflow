document.getElementById("onlyshowtologgedinusers").style.display = "none";
document.getElementById("onlyshowtologgedoutusers").style.display = "block";

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
$(".interactive-menu-button a").click(function () {
  $(this).toggleClass("active");
});

var scroll = new SmoothScroll('a[href*="#"]');

$(".more-btn").click(function () {
  $("#hiden-gallery").toggleClass("hide");
  $("#hiden-gallery").toggleClass("open");
  if ($("#hiden-gallery").is(".open")) {
    $(".more-btn-inside").text("Show Less.");
  } else {
    $(".more-btn-inside").text("Show More.");
  }
});

function slickify() {
  $(".blog-slider").slick({
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: "unslick",
      },
    ],
  });
  $(".slick-next").text("");
  $(".slick-next").addClass("icofont-long-arrow-right");
  $(".slick-prev").text("");
  $(".slick-prev").addClass("icofont-long-arrow-left");
}

slickify();
$(window).resize(function () {
  var $windowWidth = $(window).width();
  if ($windowWidth > 991) {
    slickify();
    $("#blog-btn").addClass("hide-me");
  } else if ($windowWidth < 991) {
    $("#blog-btn").removeClass("hide-me");
  }
});

$("#blog-btn").click(function () {
  $(".hiden-blog").toggleClass("hide-blog");
  $(".hiden-blog").toggleClass("open-blog");
  if ($(".hiden-blog").is(".open-blog")) {
    $("#blog-btn").text("Show Less Stories.");
  } else {
    $("#blog-btn").text("Show More Stories.");
  }
});
document.getElementById("logout").onclick = function () {
  logout();
};
document.getElementById("google").onclick = function () {
  signinwithgoogle();
};
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    document.getElementById("userdetails").style.display = "block";

    var name, email, photoUrl, uid, emailVerified;
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    document.getElementById("google").style.display = "none";
    document.getElementById("logout").style.display = "block";
    var src = document.getElementById("userdetails");
    src.innerText = "Hello, " + name;
    /*
    var img = document.createElement("img");

    img.src = photoUrl;

    src.appendChild(img);*/
    try {
      readdata();
    } catch (e) {}
  } else {
    document.getElementById("google").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("userdetails").style.display = "none";
    document.getElementById("onlyshowtologgedinusers").style.display = "none";
    document.getElementById("onlyshowtologgedoutusers").style.display = "block";
  }
});

function signinwithgoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      document.getElementById("google").style.display = "none";
      document.getElementById("logout").style.display = "block";
      document.getElementById("onlyshowtologgedinusers").style.display =
        "block";
      document.getElementById("onlyshowtologgedoutusers").style.display =
        "none";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert(errorCode);
      // ...
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      alert("logout successful");
    })
    .catch(function (error) {
      alert("an error happened");
    });
}
document.getElementById("submitbutton").onclick = function () {
  handleform();
};
function handleform() {
  let rbs = document.querySelectorAll('input[name="disease"]');
  let selecteddisease;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      break;
    }
  }
  alert(selecteddisease);

  let citizen = document.querySelectorAll('input[name="Citizen"]');
  let citizenship;
  for (const rb of citizen) {
    if (rb.checked) {
      citizenship = rb.value;
      break;
    }
  }
  let message = document.getElementById;
  alert(citizenship);
}
