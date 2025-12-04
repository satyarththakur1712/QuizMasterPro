document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('quizForm');
  if (!form) return;

  const answers = {
    q1: 'a',
    q2: 'b',
    q3: 'a',
    q4: 'b',
    q5: 'b',
    q6: 'd',
    q7: 'a',
    q8: 'c',
    q9: 'b',
    q10: 'a'
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    let correct = 0;
    const detail = [];

    Object.keys(answers).forEach((q) => {
      const user = formData.get(q);
      const ok = user === answers[q];
      if (ok) correct += 1;
      detail.push({ question: q, user: user || null, correct: answers[q], ok });
    });

    const total = Object.keys(answers).length;
    const percent = Math.round((correct / total) * 100);

    const result = { total, correct, percent, detail, timestamp: Date.now() };
    try {
      sessionStorage.setItem('quizResult', JSON.stringify(result));
    } catch (err) {
      console.warn('Could not save result to sessionStorage', err);
    }
    window.location.href = 'results.html';
  });
});
