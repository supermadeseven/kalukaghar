const question = document.getElementById('question')
const choices = Array.from (document.getElementsByClassName('choice-text'))
const questioncountertext = document.getElementById('questioncounter')
const scoretext = document.getElementById('score')
const progressbarfull = document.getElementById('progressBarFull')


let currentquestion={}
let acceptinganswers=false
let questioncounter = 0
let score=0
let availablequestions=[]


let Questions=[{
    question: "Q:How oftenly your body feel fatigue:",
    choice1: "Sometimes",
    choice2: "Once",
    choice3: "irregular",
    choice4: "very often",
    answer: 4
  }, {
    question: "Q:Which of these you have:",
    choice1: "sore throat",
    choice2: "Dry cough",
    choice3: "Cold",
    choice4: "Sneeze",
    answer: 2
  }, {
    question: " Q:Due you feel chest pain and pressure",
   
    choice1: "True",
    choice2: "False",
    choice3: "Don't know",
    choice4: "Pass",
    answer: 2
  },{
    question: "Q:From how long you feel these symptoms ?",
    choice1: "1-2 Days",
    choice2: "few hours",
    choice3: "5-6 Days",
    choice4: "More than a week",
    answer: 4
  }]

  const correct_bonus = 10
  const max_questions =4

  const startingminutes = 5
  let time = 5*60
  const timer = document.getElementById('timer')

  setInterval(updatetime,1000)

  function updatetime(){
    const minutes = Math.floor(time/60)
    let seconds = time%60
    seconds = seconds < 5 ? '0' + seconds : seconds 
    timer.innerHTML =`${minutes}:${seconds}`
    time--
  }


  startquiz=()=>{
    questioncounter = 0
    score=0
    availablequestions=[...Questions]
    getnewquestion()
    
    // Timer= setInterval(questioncounter,1000); // 1000ms = 1s

  }
  getnewquestion =()=>{
    if(availablequestions.length === 0 || questioncounter > max_questions)
    return window.location.assign('./end.html')
    
    
      questioncounter ++
      questioncountertext.innerText = `${questioncounter}/${max_questions}`

      progressbarfull.style.width = `${(questioncounter/max_questions)*100}px`
      const questionindex = Math.floor(Math.random()* availablequestions.length)
      currentquestion = availablequestions[questionindex]
      question.innerText = currentquestion.question

      choices.forEach(choice => {
          const number = choice.dataset['number']
          choice.innerText = currentquestion['choice'+ number]
          
      });

      availablequestions.splice(questionindex,1)
      acceptinganswers = true
  }

  choices.forEach(choice =>[
      choice.addEventListener("click" , e=>{
      if(!acceptinganswers) return;

      acceptinganswers = false
      const selectedchoice = e.target
      const selectedanser = selectedchoice.dataset['number']

      const Classtoapply = 
      selectedanser == currentquestion.answer ? 'correct' : 'incorrect';

      if( Classtoapply === "correct"){
        incrementscore(correct_bonus)

      }

      
      selectedchoice.parentElement.classList.add(Classtoapply)
      console.log(Classtoapply)
      setTimeout(
        ()=>{
      selectedchoice.parentElement.classList.remove(Classtoapply)
      getnewquestion()
        
        },1000)
      
      })
  ])

  incrementscore= num =>{
    score += num  
    scoretext.innerText= score;
  }
 


 

  startquiz()
  