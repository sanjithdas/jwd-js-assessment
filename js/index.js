/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

// submit and reset butten element by id

 const btnSubmit = document.getElementById("btnSubmit");
 const btnReset = document.getElementById("btnReset") ;


// DOM loaded event
window.addEventListener('DOMContentLoaded', () => {

  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });

  // submit button event listener
  btnSubmit.addEventListener('click',()=>{
    calculateScore();
  })

  // reset button event - called resetQuiz method
  btnReset.addEventListener('click',()=>{
    resetQuiz();
  })

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/

  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'www stands for ',
      o: ['wide world web', 'world web wide', 'Web world wide web', 'world wide web'],
      a: 3,
    },
    {
      q: 'What is HTTP stands for',
      o: ['Hyper Transfer Protocol', 'Hypertext Transfer Protocol', 'Hyper Text Text Protocol', 'Hypertext Trans Protocol'],
      a: 1,
    },
  ];

  // initialise the cont -  5 seconds for each question
  let count = Math.floor(quizArray.length * 1) * quizArray.length ;
  
  let interval = setInterval(function(){
    document.getElementById('time').innerHTML=`Time Remining: ${count} s`;
    count--;
    if (count === 0){
      clearInterval(interval);
      document.getElementById('time').innerHTML='';
      document.querySelector('#quizWrap').style.display="none";
      document.getElementById("total").style.display = "block"
      document.getElementById("total").innerHTML=
      `<p class="text text-sucess text-center "><div class="scored">Total Scored: ${score}</div></p>`;
      btnSubmit.style.display ="none";
      btnReset.style.display = "none";
      document.querySelector('.txt_label').style.display = "none"
      showQuestionsAndCorrectAnswers();
    
    }
    // adding counter value to a hidden field  
    document.getElementById("counter").value=count;
     
   }, 1000);

   
  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  let score =0;
  const calculateScore = () => {
    score =0;
    
    quizArray.map((quizItem, index) => {
    
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);
        liElement.style.backgroundColor="";

        if (radioElement.checked) {
          // code for task 1 goes here
          
          if (quizItem.a == i) {
            //change background color of li element here
            score = score + 1;
           liElement.style.backgroundColor="green";
          }
          else{
            
            liElement.style.backgroundColor="red";
          }
         
        }
      }
    });
        
    if (parseInt(document.getElementById("counter").value)==0)
        btnSubmit.disabled=true;
         
  };

  // call the displayQuiz function
  displayQuiz();

  // reset the selection

  function resetQuiz(){
    count = Math.floor(quizArray.length * 1) * quizArray.length
    quizArray.map((quizItem, index) => {
     
       for (let i = 0; i < 4; i++) {
         //highlight the li if it is the correct answer
         let li = `li_${index}_${i}`;
         let r = `radio_${index}_${i}`;
         liElement = document.querySelector('#' + li);
         radioElement = document.querySelector('#' + r);
          if (radioElement.checked) {
           // code for task 1 goes here
            radioElement.checked = false;
            liElement.style.backgroundColor="";
           // location.reload();
         }
       }
     });
  }

  // display correct answers once the quiz is finished

  function showQuestionsAndCorrectAnswers(){
    document.getElementById("display_correct").style.display="block";
    let strDivQn = `<div>Correct Answers: </div>`;
    quizArray.forEach((qns)=>{
      console.log(qns.q, qns.a );
      strDivQn += `<p class="alert alert-success ">${qns.q} <span class="bg-success font-weight-bold"> ${qns.o[qns.a]}</span></p>`
    })
    document.getElementById("display_correct").innerHTML = strDivQn;
    document.getElementById("start").style.display="none";
   }
 //  
 
});
