const questions = [
    { question: "What is a strong password?", options: ["123456", "abc123", "Qw!8zY@#", "password"], answer: 2 },
    { question: "What does HTTPS stand for?", options: ["High Tech Process System", "Home Transfer Protection Service", "None", "HyperText Transfer Protocol Secure"], answer: 3 },
    { question: "Which of these is an example of phishing?", options: ["Using a firewall", "Encrypting files", "A scam email asking for passwords", "Updating antivirus software"], answer: 2 },
    { question: "What should you do if you receive a suspicious email?", options: ["Delete or report it", "Reply asking for details", "Open it immediately", "Click the link to check"], answer: 0 },
    { question: "What is two-factor authentication?", options: ["A security process requiring two verification steps", "A second password", "A WiFi encryption protocol", "A type of malware"], answer: 0 },
    { question: "Which of the following is a type of malware?", options: ["VPN", "Antivirus", "Trojan Horse", "Firewall"], answer: 2 },
    { question: "What should you avoid when using public Wi-Fi?", options: ["Accessing bank accounts", "Watching videos", "Browsing social media", "Reading news"], answer: 0 },
    { question: "What is the purpose of a firewall?", options: ["Detect WiFi networks", "Speed up the internet", "Block unauthorized access", "Store passwords"], answer: 2 },
    { question: "What is social engineering?", options: ["Encrypting files", "A new form of malware", "Manipulating people to gain information", "Hacking networks"], answer: 2 },
    { question: "What should you do if your password is leaked in a data breach?", options: ["Change it immediately", "Ignore it", "Use the same password for everything", "Share it with others"], answer: 0 },
    { question: "Which of these is the safest way to store passwords?", options: ["Use a password manager", "Memorize all of them", "Write them down", "Use the same password everywhere"], answer: 0 },
    { question: "Which type of attack uses a fake website to steal information?", options: ["DDoS", "Brute-force", "Phishing", "Ransomware"], answer: 2 }
];
let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    document.getElementById("college-title").style.display = "none"; // Hide the title
    // Your existing game start logic
}

const startBtn = document.getElementById("startBtn");
const quizContainer = document.getElementById("quizContainer");
const questionElement = document.getElementById("question");
const questionNumberElement = document.createElement("h3");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.createElement("button");

// Styling & adding restart button
restartBtn.innerText = "Restart Test";
restartBtn.style.display = "none";
restartBtn.style.marginTop = "10px";
restartBtn.style.padding = "12px";
restartBtn.style.fontSize = "16px";
restartBtn.style.background = "#fd1d1d";
restartBtn.style.color = "white";
restartBtn.style.border = "none";
restartBtn.style.borderRadius = "5px";
restartBtn.style.cursor = "pointer";
restartBtn.addEventListener("click", restartQuiz);
quizContainer.appendChild(restartBtn);

// Insert question number display
quizContainer.insertBefore(questionNumberElement, questionElement);

startBtn.addEventListener("click", function() {
    startBtn.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    let questionData = questions[currentQuestionIndex];
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerText = questionData.question;
    optionsElement.innerHTML = "";

    questionData.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });

    nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestionIndex].answer;
    let options = document.querySelectorAll(".option");

    options.forEach((option, index) => {
        option.onclick = null;  
        if (index === correctIndex) {
            option.classList.add("correct");
        } else if (index === selectedIndex) {
            option.classList.add("wrong");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
    }

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionNumberElement.innerText = "";
        questionElement.innerText = `Quiz Over! Your Score: ${score}/${questions.length}`;
        optionsElement.innerHTML = "";
        nextBtn.style.display = "none";
        restartBtn.style.display = "block";
    }
});

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = "Score: 0";
    restartBtn.style.display = "none";
    loadQuestion();
     }
