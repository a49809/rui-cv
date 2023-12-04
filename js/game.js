const questions = [
{
	question: "What country is Rui Silva from?",
	answers: [
		{ text: "Portugal", correct: true},
		{ text: "Brazil", correct: false},
		{ text: "Angola", correct: false},
		{ text: "Mozambique", correct: false},
	]
},
{
	question: "Which city is Rui Silva from?",
	answers: [
		{ text: "Leiria", correct: false},
		{ text: "Coimbra", correct: false},
		{ text: "Braga", correct: true},
		{ text: "Guimarães", correct: false},
	]
},
{
	question: "What ERP does Rui Silva currently work with?",
	answers: [
		{ text: "Sage", correct: false},
		{ text: "Primavera", correct: false},
		{ text: "SAP", correct: true},
		{ text: "Oracle", correct: false},
	]
},
{
	question: "Which technology is not mentioned in the CV?",
	answers: [
		{ text: "HTML", correct: false},
		{ text: "Java", correct: false},
		{ text: "VBA", correct: false},
		{ text: "Python", correct: true},
	]
},
{
	question: "What university did Rui Silva graduate from?",
	answers: [
		{ text: "Cambridge", correct: false},
		{ text: "Porto", correct: false},
		{ text: "Manchester", correct: false},
		{ text: "Minho", correct: true},
	]
},
{
	question: "What course did Rui Silva graduate from?",
	answers: [
		{ text: "Economy", correct: false},
		{ text: "Management Information Systems", correct: true},
		{ text: "Industrial Management", correct: false},
		{ text: "Architecture", correct: false},
	]
},
{
	question: "What hobby is not mentioned on the CV?",
	answers: [
		{ text: "Music", correct: false},
		{ text: "Football", correct: false},
		{ text: "Fishing", correct: true},
		{ text: "Travel", correct: false},
	]
},
{
	question: "Which organization is Rui Silva currently working for?",
	answers: [
		{ text: "Jordão", correct: true},
		{ text: "ETMA", correct: false},
		{ text: "SAP", correct: false},
		{ text: "University of Minho", correct: false},
	]
},
{
	question: "What role does Rui Silva not currently play?",
	answers: [
		{ text: "Program", correct: false},
		{ text: "Configurator Design", correct: false},
		{ text: "Shipping of goods", correct: true},
		{ text: "Implementing SAP configurator", correct: false},
	]
},
{
	question: "What is the symbol that appears at the end of the website for direct contact?",
	answers: [
		{ text: "Telegram", correct: false},
		{ text: "Instagram", correct: false},
		{ text: "Facebook", correct: false},
		{ text: "Whatsapp", correct: true},
	]
}
];  

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;
let total = 0;
let result = 0;


function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + "." + currentQuestion.question;
	
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
	
function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	total++;
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
		//console.log(score);
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button =>{
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore(){
	//resetState();
	result = (score/total) * 100
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Which gives a percentage of ${result}% correct answers!!!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
});

startQuiz()