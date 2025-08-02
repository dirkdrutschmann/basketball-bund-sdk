import fs from 'fs';
import path from 'path';

function copyCjsFiles() {
  const distCjsDir = path.join(process.cwd(), 'dist-cjs');
  const distDir = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(distCjsDir)) {
    console.error('❌ dist-cjs Verzeichnis nicht gefunden');
    return;
  }
  
  function copyDirectory(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        copyDirectory(srcPath, path.join(destDir, file));
      } else if (file.endsWith('.js')) {
        const destPath = path.join(destDir, file);
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDirectory(distCjsDir, distDir);
  
  fs.rmSync(distCjsDir, { recursive: true, force: true });
  
  console.log('✅ CommonJS-Dateien erfolgreich kopiert');
}

copyCjsFiles(); 