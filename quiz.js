document.addEventListener("DOMContentLoaded", () => {
    const quizDivs = document.querySelectorAll('.quiz');

    quizDivs.forEach(div => {
        const question = div.dataset.question;
        let answers;

        try {
            answers = JSON.parse(div.dataset.answers);
        } catch (e) {
            console.error('Invalid JSON in data-answers:', e);
            return;
        }

        generateQuiz(div, { question, answers });
    });

    function generateQuiz(container, quizData) {
        container.innerHTML = '';

        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.textContent = quizData.question;
        container.appendChild(questionEl);

        const answersEl = document.createElement('div');
        answersEl.className = 'answers';

        quizData.answers.forEach((answer, index) => {
            const label = document.createElement('label');
            label.style.display = 'block';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'quiz-answer-' + Math.random().toString(36).substr(2, 5);
            input.value = index;

            label.appendChild(input);
            label.appendChild(document.createTextNode(answer.text));
            answersEl.appendChild(label);
        });

        container.appendChild(answersEl);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit Answer';
        container.appendChild(submitBtn);

        const resultEl = document.createElement('div');
        resultEl.className = 'result';
        container.appendChild(resultEl);

        submitBtn.addEventListener('click', () => {
            const selected = container.querySelector('input[type="radio"]:checked');
            if (!selected) {
                resultEl.textContent = 'Please select an answer.';
                resultEl.style.color = 'orange';
                return;
            }

            const selectedIndex = parseInt(selected.value);
            if (quizData.answers[selectedIndex].correct) {
                resultEl.textContent = 'Correct! 🎉';
                resultEl.style.color = 'green';
            } else {
                resultEl.textContent = 'Wrong! ❌';
                resultEl.style.color = 'red';
            }
        });
    }
});