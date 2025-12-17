/**
 * 🔍 Logo Verification Script
 * Verifica que todos los archivos del logo estén correctamente configurados
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del logo Quantum Token...\n');

// Rutas a verificar
const checks = [
  {
    name: 'Logo SVG Principal',
    path: 'assets/images/quantum-token-logo.svg',
    required: true
  },
  {
    name: 'Logo PNG Principal',
    path: 'assets/images/quantum-token-logo.png',
    required: false
  },
  {
    name: 'Configuración del Token',
    path: 'assets/token-config.json',
    required: true
  },
  {
    name: 'Componente TypeScript',
    path: 'src/ui/quantum-token-logo.ts',
    required: true
  },
  {
    name: 'Logo Showcase',
    path: 'logo-showcase.html',
    required: true
  },
  {
    name: 'Instrucciones de Setup',
    path: 'LOGO-SETUP.md',
    required: true
  }
];

// Archivos que deben incluir el logo
const htmlFiles = [
  'index.html',
  'test.html',
  'app.html',
  'quantum-app.html'
];

let allGood = true;
let warnings = [];

// Verificar existencia de archivos
checks.forEach(check => {
  const fullPath = path.join(__dirname, check.path);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`✅ ${check.name}: Encontrado`);
  } else {
    if (check.required) {
      console.log(`❌ ${check.name}: NO ENCONTRADO (Requerido)`);
      allGood = false;
    } else {
      console.log(`⚠️  ${check.name}: No encontrado (Opcional)`);
      warnings.push(check.name);
    }
  }
});

console.log('\n📄 Verificando archivos HTML...\n');

// Verificar que los archivos HTML incluyan referencias al logo
htmlFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasLogoReference = content.includes('quantum-token-logo');
    
    if (hasLogoReference) {
      console.log(`✅ ${file}: Incluye referencia al logo`);
    } else {
      console.log(`⚠️  ${file}: NO incluye referencia al logo`);
      warnings.push(`${file} sin logo`);
    }
  } else {
    console.log(`❌ ${file}: Archivo no encontrado`);
  }
});

// Verificar configuración del token
console.log('\n⚙️  Verificando configuración del token...\n');

const configPath = path.join(__dirname, 'assets/token-config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    console.log(`✅ Nombre: ${config.name}`);
    console.log(`✅ Símbolo: ${config.symbol}`);
    console.log(`✅ Logo principal: ${config.logo.main}`);
    console.log(`✅ Color primario: ${config.colors.primary}`);
    console.log(`✅ Color secundario: ${config.colors.secondary}`);
    console.log(`✅ Color acento: ${config.colors.accent}`);
  } catch (error) {
    console.log(`❌ Error leyendo configuración: ${error.message}`);
    allGood = false;
  }
}

// Resumen final
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60) + '\n');

if (allGood && warnings.length === 0) {
  console.log('🎉 ¡TODO PERFECTO! El logo está completamente configurado.');
  console.log('\n📝 Próximos pasos:');
  console.log('   1. Guarda la imagen del logo en: assets/images/quantum-token-logo.svg');
  console.log('   2. Abre logo-showcase.html en tu navegador para ver el resultado');
  console.log('   3. Revisa LOGO-SETUP.md para más instrucciones\n');
} else if (allGood && warnings.length > 0) {
  console.log('✅ Configuración básica completa');
  console.log(`⚠️  ${warnings.length} advertencia(s):`);
  warnings.forEach(w => console.log(`   - ${w}`));
  console.log('\n📝 Revisa LOGO-SETUP.md para detalles\n');
} else {
  console.log('❌ Se encontraron errores críticos');
  console.log('📝 Revisa los archivos marcados con ❌ arriba\n');
}

console.log('💡 Para más información, consulta: LOGO-SETUP.md\n');
