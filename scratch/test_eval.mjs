import http from 'http';

async function testEval() {
  console.log('Testing /api/ai/evaluate-test endpoint...');
  const postData = JSON.stringify({
    examTitle: 'Minna Mastery Assessment',
    lessonNumbers: [1, 2, 3],
    timeSpentSeconds: 120,
    answers: [
      {
        questionId: 'q1',
        prompt: 'What is the reading of 私?',
        userAnswer: 'わたし',
        correctAnswer: 'わたし',
        isCorrect: true,
        explanation: '私 is read as わたし',
        lessonNumber: 1,
        category: 'vocabulary'
      },
      {
        questionId: 'q2',
        prompt: 'Choose particle: 私は学生（　）です。',
        userAnswer: 'を',
        correctAnswer: 'は',
        isCorrect: false,
        explanation: 'Particle は marks topic',
        lessonNumber: 1,
        category: 'grammar'
      }
    ]
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/ai/evaluate-test',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`HTTP ${res.statusCode}: Score: ${json.result?.scorePercent}%, Correct: ${json.result?.correctCount}/${json.result?.totalQuestions}`);
          console.log('AI Diagnostic Summary:', json.result?.aiDiagnostic?.summary);
          resolve(json);
        } catch (e) {
          console.error(`HTTP ${res.statusCode}: Error parsing:`, data);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.warn('Eval test warning:', e.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

testEval();
