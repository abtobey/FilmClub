$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then(() => {
        window.location.replace("/movies");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let loginTextWrapper = document.querySelector(".ml11 .letters");
  loginTextWrapper.innerHTML = loginTextWrapper.textContent.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter'>$&</span>"
  );
  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml11 .line",
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 700,
    })
    .add({
      targets: ".ml11 .line",
      translateX: [
        0,
        document.querySelector(".ml11 .letters").getBoundingClientRect().width +
          10,
      ],
      easing: "easeOutExpo",
      duration: 700,
      delay: 100,
    })
    .add({
      targets: ".ml11 .letter",
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: "-=775",
      delay: (el, i) => 34 * (i + 1),
    })
    .add({
      targets: ".ml11",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000,
    });
});
