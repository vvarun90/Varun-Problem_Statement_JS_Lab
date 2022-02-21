// ES2015 - new syntax for classes
// class Person {
// }

/**
 * Step 1: Create Question class - text (string), choices (an array of strings), answer (string)
 */
function Question( text, choices, answer ) {
  this.text = text;
  this.choices = choices;
  this.answer = answer; // this shall be one of the choices
}

// Step 2: Add a method isCorrectAnswer which accepts and argument ```choice``` and returns true if choice matches the answer
Question.prototype.isCorrectAnswer = function( choice ) {
  return choice === this.answer;
};

/**
 * Step 3: Create Quiz class with following requirements
 * Quiz
 * Data members
 *  - score - number of right answers (initialize to 0)
 *  - questions - an array of Question objects
 *  - questionIndex - the index of the currently displayed question in the quiz 
 * 
 * Methods
 * checkOptionWithAnswer( answer ) - checks the current question's answer with the answer passed as argument, and
 *    1. If correct, it increases the score - use the current question's isCorrectAnswer() method to check this
 *    2. In any case, it increments the questionIndex
 * 
 * NOTE: You can test out if you are able to create a Quiz object, and call the method on it
 */
function Quiz( questions ) {
  // number of correct answers - initially 0
  this.score = 0;
  this.questions = questions;
  // we start with the first question (this is the question currently displayed in the quiz), i.e. index = 0
  this.questionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.questionIndex];
};

// checks the current question's answer with the answer passed as argument, and
Quiz.prototype.checkOptionWithAnswer = function( answer ) {
  // If correct, we increases the score - we use the current question's isCorrectAnswer() method to check this
  if( this.getCurrentQuestion().isCorrectAnswer( answer ) ) {
    this.score++;
  }

  // In any case, we increments the questionIndex
  this.questionIndex++;
};

// checks if the quiz has ended (if the current questionIndex is 1 more than the last index in questions array)
// return true if ended and false if not
Quiz.prototype.isEnded = function() {
  // Step 4: Complete the function
  return this.questions.length === this.questionIndex;
};

function showScore() {
  // Select the #quiz element, and display the final score
  // use innerHTML (because we have to set <h1>Result</h1><div id="score">....</div>)
  document.querySelector( '#quiz' ).innerHTML = `
    <h1>Result</h1>
    <div id="score">You scored ${techQuiz.score} / ${techQuiz.questions.length}</div>
  `;
}

// displays the current question and choices. Also sets up the necessary event handlers
function loadQuestion() {
  if( techQuiz.isEnded() ) {
    showScore();
    return;
  }

  /**
   * 1. Select the #question DOM node and use textContent to populate the current question's text
   */
  var currentQuestion = techQuiz.getCurrentQuestion();

  document.querySelector( '#question' ).textContent = currentQuestion.text;
 
   /* 2. Use a for loop to iterate from 0 -> 3 and select the choice span within the loop (id will be 'choice-' + i). Set the textContent to the appropriate choice.
   */
  for( var i = 0; i < currentQuestion.choices.length; i++ ) {
    document.getElementById( 'choice' + i ).textContent = currentQuestion.choices[i];
    handleOptionButtonClick( 'btn' + i, currentQuestion.choices[i] );
  }

  showProgress();
}

// btnId is the id of the button. choice is the text within that button.
function handleOptionButtonClick( btnId, choice ) {
  var button = document.querySelector( '#' + btnId );
  button.onclick = function() {
    // alert( 'choice is ' + choice  );
    
    // (Almost) The last step : call the quiz checkOptionWithAnswer(), and call loadQuestion()
    techQuiz.checkOptionWithAnswer( choice );
    loadQuestion();
  };
}

// populate the footer with a message showing the current question - for example, "Question 3 of 5"
function showProgress() {
  document.querySelector( '#progress' ).textContent = 'Question ' + ( techQuiz.questionIndex + 1 ) + ' of ' + techQuiz.questions.length;
}

// create questions here
var questions = [
  new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

var techQuiz = new Quiz( questions );
loadQuestion();