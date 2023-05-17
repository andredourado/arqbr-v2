const fs = require('fs');

fs.readFile('./teste.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  if (data.includes('|9999|118247|')) {
    console.log('String found!');
  } else {
    console.log('String not found.');
  }
});
