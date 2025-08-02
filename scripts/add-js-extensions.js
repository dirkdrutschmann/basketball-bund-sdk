import fs from 'fs';
import path from 'path';

function addJsExtensions(content) {
  return content
    .replace(/from ['"](\.[^'"]+)['"]/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      return `from '${importPath}.js'`;
    })
    .replace(/import ['"](\.[^'"]+)['"]/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      return `import '${importPath}.js'`;
    })
    .replace(/export \* from ['"](\.[^'"]+)\.js['"]/g, (match, importPath) => {
      return `export * from '${importPath}'`;
    })
    .replace(/export \* from ['"](\.[^'"]+)['"]/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      if (importPath.endsWith('/types') || importPath.endsWith('/services')) {
        return `export * from '${importPath}/index.js'`;
      }
      return `export * from '${importPath}.js'`;
    });
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = addJsExtensions(content);
  fs.writeFileSync(filePath, updatedContent);
}

function main() {
  const distDir = path.join(process.cwd(), 'dist', 'esm');
  
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.js')) {
        processFile(filePath);
      }
    }
  }
  
  processDirectory(distDir);
  console.log('✅ .js-Erweiterungen zu allen Imports hinzugefügt');
}

main(); 