import fs from 'fs';
import path from 'path';

// Funktion zum Hinzufügen von .js-Erweiterungen zu Imports
function addJsExtensions(content) {
  // Füge .js zu relativen Imports hinzu (nur für import/from statements)
  return content
    .replace(/from ['"](\.[^'"]+)['"]/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      return `from '${importPath}.js'`;
    })
    .replace(/import ['"](\.[^'"]+)['"]/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      return `import '${importPath}.js'`;
    })
    // Korrigiere export * statements zurück
    .replace(/export \* from ['"](\.[^'"]+)\.js['"]/g, (match, importPath) => {
      return `export * from '${importPath}'`;
    })
    // Füge .js zu export * statements hinzu
    .replace(/export \* from ['"](\.[^'"]+)['"]/g, (match, importPath) => {
      if (importPath.endsWith('.js')) return match;
      // Für Verzeichnisse, füge /index.js hinzu
      if (importPath.endsWith('/types') || importPath.endsWith('/services')) {
        return `export * from '${importPath}/index.js'`;
      }
      return `export * from '${importPath}.js'`;
    });
}

// Funktion zum Verarbeiten einer Datei
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = addJsExtensions(content);
  fs.writeFileSync(filePath, updatedContent);
}

// Hauptfunktion
function main() {
  const distDir = path.join(process.cwd(), 'dist');
  
  // Verarbeite alle .js-Dateien im dist-Verzeichnis
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