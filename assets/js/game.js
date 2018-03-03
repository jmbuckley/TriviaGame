$(document).ready(function() {

    // timer that counts down and also displays the countdown on the page
var seconds = 10
var interval = setInterval(function() {
    $(".timer").html(seconds--)
    if ( seconds < 0 ) {
        $("#message").text("Bummer, you ran out of time! Your Results: ").append(showResults);
        $("#timeOutGif").append('<img src="assets/images/giphy.gif"/>');
        $(".quiz-container").hide();
        $("button").hide();
        clearInterval(interval)
    }
}, 1000)

    const myQuestions = [
      {
        question: "Who would win in a battle royal",
        answers: {
            a: "The Avengers",
            b: "The Justice League",
            c: "The X-Men",
            d: "The Fantasic Four",
        },
        correctAnswer: "b"
      },
      {
        question: "What is the classiest city in the world?",
        answers: {
            a: "Moscow",
            b: "San Diego",
            c: "Reno",
            d: "Paris",
        },
        correctAnswer: "b"
      },
      {
        question: "How much wood could a wood chuck chuck, if a wood chuck could chuck wood?",
        answers: {
            a: "Seriously?",
            b: "12 Majestic Oaks",
            c: "700 lbs of wood",
            d: "Wood chucks don't chuck wood",
        },
        correctAnswer: "c"
    },
        {
        question: "Who was the greatest basketball player of all time?",
        answers: {
            a: "Michael Jordan in 'Space Jams'",
            b: "Woody Allen in 'White Men Can't Jump'",
            c: "Ray Allen in 'He Got Game'",
            d: "Will Farrell in 'Semi-Pro'"
        },
        correctAnswer: "a"
      }
    ];
  
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  });