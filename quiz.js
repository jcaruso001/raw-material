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

        const questionEl = document.createElement('p');
        questionEl.className = 'question';
        questionEl.innerHTML = quizData.question;
        container.appendChild(questionEl);

        const answersEl = document.createElement('div');
        answersEl.className = 'answers';
        container.appendChild(answersEl);

        const resultEl = document.createElement('blockquote');
        resultEl.className = 'result';
        container.appendChild(resultEl);

        quizData.answers.forEach((answer) => {
            const btn = document.createElement('button');

            btn.className = 'answer-button';
            btn.textContent = answer.text;

            btn.addEventListener('click', () => {
                answersEl.querySelectorAll('button').forEach(b => b.classList.remove('highlight'));
                btn.classList.add('highlight');
                resultEl.textContent = answer.message;
                resultEl.className = 'result-message'
            });

            answersEl.appendChild(btn);
        });
    }
});