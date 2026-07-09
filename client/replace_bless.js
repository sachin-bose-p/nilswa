const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'app'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let newContent = content;
    
    // Replace names
    newContent = newContent.replace(/BLESS Crew Alcohol Check/g, 'Alcohol Check System');
    newContent = newContent.replace(/BLESS Crew Check/g, 'Alcohol Check System');
    newContent = newContent.replace(/BLESS \(Crew Alcohol Check\)/g, 'Alcohol Check System');
    newContent = newContent.replace(/BLESS Check/g, 'Alcohol Check System');
    newContent = newContent.replace(/\bBLESS\b/g, 'Alcohol Check System');
    
    // Replace URL paths / IDs
    newContent = newContent.replace(/bless-check/g, 'alcohol-check');
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
