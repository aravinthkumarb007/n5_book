import { readFileSync } from 'fs';

function countInFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const vocabMatches = content.match(/id:\s*['"]l\d+_v\d+['"]/g) || [];
  const grammarMatches = content.match(/id:\s*['"]l\d+_g\d+['"]/g) || [];
  const exerciseMatches = content.match(/id:\s*['"]l\d+_ex\d+['"]/g) || [];
  return {
    vocab: vocabMatches.length,
    grammar: grammarMatches.length,
    exercises: exerciseMatches.length
  };
}

const files = [
  'a:/N5_Kanji/src/data/minnaNoNihongo/lessons1_to_5.ts',
  'a:/N5_Kanji/src/data/minnaNoNihongo/lessons6_to_10.ts',
  'a:/N5_Kanji/src/data/minnaNoNihongo/lessons11_to_15.ts',
  'a:/N5_Kanji/src/data/minnaNoNihongo/lessons16_to_20.ts',
  'a:/N5_Kanji/src/data/minnaNoNihongo/lessons21_to_25.ts'
];

let totalV = 0, totalG = 0, totalE = 0;
files.forEach((f, i) => {
  const counts = countInFile(f);
  totalV += counts.vocab;
  totalG += counts.grammar;
  totalE += counts.exercises;
  console.log(`Lessons ${i*5 + 1} to ${i*5 + 5}: ${counts.vocab} vocab, ${counts.grammar} grammar, ${counts.exercises} exercises`);
});

console.log(`\nTOTAL CURRICULUM: ${totalV} Vocabulary items, ${totalG} Grammar explanations, ${totalE} Practice exercises.`);
