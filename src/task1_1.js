process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chunk;
  // Use a loop to make sure we read all available data.
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`${chunk.split('').reverse().join('')}\n`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});

// process.exit(1);
// process.exitCode = 1;