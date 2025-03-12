#! /usr/bin/env bun

import fs from 'fs';
import { $ } from 'bun';

// get first input from command
const waveFile = process.argv[2];
const pairs = process.argv[3] || '';

await $`whisperx "${waveFile}" --model large-v2 --highlight_words True --align_model WAV2VEC2_ASR_LARGE_LV60K_960H --batch_size 4 --compute_type int8 --max_line_count 1 --max_line_width 20 --language en --output_format srt`;

await $`pysubs2 --to ass "${waveFile.replace('.wav', '.srt')}"`;

const input = waveFile.replace('.wav', '.ass');

// read from file
const fileContent = fs.readFileSync(input, 'utf8');

// Split the content into lines
const lines = fileContent.split('\n');

// Process each line
const processedLines = lines.map(line => {
  // REGEX for {\u1}some words{\u0} and capture "some words"
  const regex = /\{\\u1\}(.*?)\{\\u0\}/g;

  if (line === 'Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1') {
    return 'Style: Default,Arial,100,&H0000FF00,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,10,2,5,10,10,10,1'
  }
  
  // Replace the pattern with a modified version that uses the captured text
  return line.replace(regex, (_, capturedText) => {
    // You can customize this replacement format as needed
    return `${pairs}${capturedText}{\\c}`;
  });
});

// Join the lines back together
const modifiedContent = processedLines.join('\n');

// Write the modified content to a new file
const outputPath = input.replace(/\.([^.]+)$/, '-modified.$1');
fs.writeFileSync(outputPath, modifiedContent);

console.log(`Modified content saved to: ${outputPath}`);
