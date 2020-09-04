$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-input');
  const userInput = $('input#userName-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      userName: userInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.userName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName);
    emailInput.val('');
    userInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser (email, password, userName) {
    $.post('/api/signup', {
      email: email,
      password: password,
      userName: userName
    })
      .then(() => {
        window.location.replace('/movies');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr (err) {
    $('#alert .msg').text('Email address or username is already in use');
    $('#alert').fadeIn(500);
  }

  // Wrap every letter in a span
  const signUpTextWrapper = document.querySelector('.ml11 .letters');
  signUpTextWrapper.innerHTML = signUpTextWrapper.textContent.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: true })
    .add({
      targets: '.ml11 .line',
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: 'easeOutExpo',
      duration: 700
    })
    .add({
      targets: '.ml11 .line',
      translateX: [
        0,
        document.querySelector('.ml11 .letters').getBoundingClientRect().width +
          10
      ],
      easing: 'easeOutExpo',
      duration: 700,
      delay: 100
    })
    .add({
      targets: '.ml11 .letter',
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 600,
      offset: '-=775',
      delay: (el, i) => 34 * (i + 1)
    })
    .add({
      targets: '.ml11',
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 1000
    });
});
