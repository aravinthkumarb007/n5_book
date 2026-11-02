// Test Minna no Nihongo Curriculum & Quiz Engine
import http from 'http';

async function testApi() {
  console.log('Testing /api/ai/generate-lesson-quiz endpoint...');
  const postData = JSON.stringify({
    lessonRange: [1, 2, 3],
    questionTypes: ['mcq', 'fill_blank', 'sentence_formation', 'translation_ja_en'],
    questionCount: 6,
    generatorMode: 'smart_local'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/ai/generate-lesson-quiz',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          console.log('Status code:', res.statusCode);
          const json = JSON.parse(data);
          console.log(`HTTP ${res.statusCode}: Received ${json.questions?.length || 0} questions!`);
          if (json.questions && json.questions.length > 0) {
            console.log('Sample Question 1:', json.questions[0].prompt, '-> Type:', json.questions[0].type);
          }
          resolve(json);
        } catch (e) {
          console.error(`HTTP ${res.statusCode}: Response was not JSON:`, data.slice(0, 300));
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.warn('API connection test warning:', e.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

testApi();
