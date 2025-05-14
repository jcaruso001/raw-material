document.addEventListener("DOMContentLoaded", () => {
    const quizDivs = document.querySelectorAll('.quiz');
    quizDivs[0].classList.add('margin-bottom');

    quizDivs.forEach(div => {
        let questions;

        try {
            questions = JSON.parse(div.dataset.questions);
        } catch (e) {
            console.error('Invalid JSON in data-questions:', e);
            return;
        }

        runQuiz(div, questions);
    });

    function runQuiz(container, questions) {
        let currentQuestionIndex = 0;

        const questionEl = document.createElement('p');
        questionEl.className = 'question';
        container.appendChild(questionEl);

        const answersEl = document.createElement('div');
        answersEl.className = 'answers';
        container.appendChild(answersEl);

        const resultEl = document.createElement('blockquote');
        resultEl.className = 'result';
        resultEl.style.display = 'none';
        container.appendChild(resultEl);

        const nextBtn = document.createElement('button');
        nextBtn.classList = ['answer-button next'];
        nextBtn.textContent = 'Next';
        nextBtn.style.display = 'none';
        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            resultEl.style.display = 'none';
            showQuestion();
        });
        container.appendChild(nextBtn);

        function showQuestion() {
            const question = questions[currentQuestionIndex];
            questionEl.innerHTML = question.question;
            answersEl.innerHTML = '';
            resultEl.textContent = '';
            nextBtn.style.display = 'none';

            question.answers.forEach((answer) => {
                const btn = document.createElement('button');
                btn.className = 'answer-button';
                btn.textContent = answer.text;

                btn.addEventListener('click', () => {
                    // Clear highlight from all buttons
                    answersEl.querySelectorAll('button').forEach(b => b.classList.remove('highlight'));
                    btn.classList.add('highlight');

                    resultEl.textContent = answer.message;
                    resultEl.className = 'result-message'
                    resultEl.style.display = 'block';


                    // Show Next button only if there's another question
                    if (currentQuestionIndex < questions.length - 1) {
                        nextBtn.style.display = 'inline-block';
                    }
                });

                answersEl.appendChild(btn);
            });
        }

        showQuestion();
    }
});