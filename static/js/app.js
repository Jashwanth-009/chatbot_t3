let lastQuestion = "";
let lastAnswer = "";

function askQuestion() {
  const questionInput = document.getElementById("question");
  const responseDiv = document.getElementById("response");
  const loader = document.getElementById("loader");
  const feedbackButtons = document.getElementById("feedback-buttons");

  const question = questionInput.value.trim();
  if (!question) {
    responseDiv.innerText = "Please enter a question.";
    return;
  }

  responseDiv.innerText = "";
  feedbackButtons.classList.add("hidden");
  loader.classList.remove("hidden");

  fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  })
    .then(response => response.json())
    .then(data => {
      loader.classList.add("hidden");
      responseDiv.innerText = data.response;

      lastQuestion = question;
      lastAnswer = data.response;

      feedbackButtons.classList.remove("hidden");
    })
    .catch(err => {
      loader.classList.add("hidden");
      responseDiv.innerText = "Error connecting to server.";
      console.error("Server error:", err);
    });
}

function sendFeedback(liked) {
  fetch("http://localhost:5000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: lastQuestion,
      answer: lastAnswer,
      liked: liked
    })
  }).then(() => {
    const feedbackButtons = document.getElementById("feedback-buttons");
    feedbackButtons.classList.add("hidden");
    alert(liked ? "Thanks for your feedback!" : "Feedback noted!");
  });
}
