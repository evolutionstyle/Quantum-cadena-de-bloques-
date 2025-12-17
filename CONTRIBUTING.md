# 🤝 Guía de Contribución - Quantum Blockchain

¡Gracias por tu interés en contribuir a Quantum Blockchain! Este proyecto es pionero en blockchain cuántico y valoramos cada contribución.

---

## 📋 Tabla de Contenidos

1. [Código de Conducta](#código-de-conducta)
2. [Cómo Puedes Ayudar](#cómo-puedes-ayudar)
3. [Proceso de Contribución](#proceso-de-contribución)
4. [Estándares de Código](#estándares-de-código)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Testing](#testing)
7. [Comunidad](#comunidad)

---

## 📜 Código de Conducta

### Nuestros Valores
- 🤝 **Respeto**: Tratamos a todos con dignidad
- 🌍 **Inclusión**: Valoramos la diversidad
- 🔬 **Innovación**: Fomentamos ideas audaces
- 🎯 **Excelencia**: Buscamos la calidad
- 🤲 **Colaboración**: Trabajamos juntos

### No Toleramos
- ❌ Acoso o discriminación
- ❌ Lenguaje ofensivo
- ❌ Trolling o spam
- ❌ Violación de privacidad
- ❌ Conducta poco profesional

---

## 🚀 Cómo Puedes Ayudar

### 💻 Desarrollo
- Implementar nuevas features
- Corregir bugs
- Optimizar rendimiento
- Mejorar documentación
- Escribir tests

### 🔬 Investigación
- Algoritmos cuánticos
- Criptografía post-cuántica
- Optimizaciones de red
- Análisis de seguridad

### 📚 Documentación
- Tutoriales
- Guías de uso
- Traducciones
- Videos explicativos
- Ejemplos de código

### 🎨 Diseño
- UI/UX improvements
- Logos y branding
- Visualizaciones
- Animaciones

### 🐛 Reporte de Bugs
- Encontrar vulnerabilidades
- Testing de features
- Validación de edge cases

---

## 🔄 Proceso de Contribución

### 1. Fork del Repositorio
```bash
# Clona tu fork
git clone https://github.com/TU-USUARIO/Quantum-cadena-de-bloques-.git
cd Quantum-cadena-de-bloques-

# Agrega el upstream
git remote add upstream https://github.com/ORIGINAL/Quantum-cadena-de-bloques-.git
```

### 2. Crea una Rama
```bash
# Actualiza main
git checkout main
git pull upstream main

# Crea rama con nombre descriptivo
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
# o
git checkout -b docs/actualizar-readme
```

### 3. Desarrolla tu Contribución
```bash
# Haz tus cambios
# Commits frecuentes con mensajes claros

git add .
git commit -m "✨ Agrega nueva funcionalidad X"
```

### 4. Sigue los Estándares
- ✅ Código limpio y bien documentado
- ✅ Tests para nuevas features
- ✅ Sin errores de linting
- ✅ Documentación actualizada

### 5. Push y Pull Request
```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Ve a GitHub y crea el Pull Request
```

### 6. Template del Pull Request
```markdown
## 📝 Descripción
[Describe qué hace este PR]

## 🎯 Tipo de cambio
- [ ] 🐛 Bug fix
- [ ] ✨ Nueva feature
- [ ] 📚 Documentación
- [ ] 🎨 Mejora UI/UX
- [ ] ⚡ Optimización

## ✅ Checklist
- [ ] Tests pasan
- [ ] Código documentado
- [ ] README actualizado (si aplica)
- [ ] Sin conflictos con main

## 🧪 Cómo probar
[Pasos para probar los cambios]

## 📸 Screenshots (si aplica)
[Capturas de pantalla]
```

---

## 📐 Estándares de Código

### TypeScript
```typescript
// ✅ BIEN - Código limpio y tipado
interface QuantumBlock {
  index: number;
  timestamp: number;
  data: string;
  hash: string;
  previousHash: string;
  qubits: Qubit[];
}

function generateBlock(data: string): QuantumBlock {
  // Implementación clara y documentada
}

// ❌ MAL - Sin tipos, confuso
function doStuff(x) {
  return x + 1;
}
```

### HTML/CSS
```html
<!-- ✅ BIEN - Estructura semántica -->
<section class="glass-card p-6">
  <h2 class="text-2xl font-bold gradient-text">Título</h2>
  <p class="text-gray-400">Descripción clara</p>
</section>

<!-- ❌ MAL - Divitis, inline styles -->
<div style="padding: 20px">
  <div style="color: red">Texto</div>
</div>
```

### Commits
Usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato
<tipo>: <descripción>

# Ejemplos
✨ feat: Agrega sistema de staking cuántico
🐛 fix: Corrige bug en validación de transacciones
📚 docs: Actualiza guía de instalación
🎨 style: Mejora diseño del dashboard
⚡ perf: Optimiza algoritmo de consenso cuántico
🧪 test: Agrega tests para crypto module
🔧 chore: Actualiza dependencias
```

---

## 🏗️ Estructura del Proyecto

```
Quantum-cadena-de-bloques-/
├── assets/                    # Recursos estáticos
│   ├── images/               # Logos, iconos
│   ├── quantum-theme.css     # Sistema de diseño
│   └── THEME-GUIDE.md        # Guía de colores
├── src/                      # Código fuente TypeScript
│   ├── blockchain/           # Core blockchain
│   ├── quantum/              # Simulación cuántica
│   ├── crypto/               # Criptografía
│   ├── defi/                 # Finanzas descentralizadas
│   ├── nft/                  # Sistema NFT
│   ├── ai/                   # Inteligencia artificial
│   ├── medical/              # Healthcare
│   ├── security/             # Seguridad
│   └── ui/                   # Componentes UI
├── tests/                    # Tests unitarios
├── docs/                     # Documentación
├── *.html                    # Aplicaciones web
├── package.json              # Dependencias
├── tsconfig.json             # Config TypeScript
└── README.md                 # Documentación principal
```

---

## 🧪 Testing

### Ejecutar Tests
```bash
# Todos los tests
npm test

# Tests específicos
npm test -- quantum-simulator

# Con coverage
npm run coverage

# Watch mode
npm test -- --watch
```

### Escribir Tests
```typescript
import { describe, it, expect } from 'vitest';
import { QuantumBlock } from '../src/blockchain/qblock';

describe('QuantumBlock', () => {
  it('debe crear un bloque válido', () => {
    const block = new QuantumBlock(0, 'data', '0');
    expect(block.index).toBe(0);
    expect(block.data).toBe('data');
  });

  it('debe calcular hash correcto', () => {
    const block = new QuantumBlock(0, 'test', '0');
    expect(block.hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
```

---

## 💬 Comunidad

### Canales de Comunicación

- 💬 **Discord**: discord.gg/quantumchain
- 🐦 **Twitter**: @QuantumChainPro
- 💼 **LinkedIn**: /company/quantum-blockchain
- 📧 **Email**: developers@quantumblockchain.io
- 📝 **Blog**: medium.com/@quantumchain

### Reuniones
- 📅 **Community Call**: Cada 2 semanas (Miércoles 3pm EST)
- 🔬 **Tech Deep Dive**: Mensual (Viernes 4pm EST)
- 🎯 **Contributors Sync**: Semanal (Lunes 10am EST)

### Obtener Ayuda
1. 📖 Lee la documentación primero
2. 🔍 Busca en issues cerrados
3. 💬 Pregunta en Discord #dev-help
4. 🐛 Abre un issue si es un bug

---

## 🏅 Reconocimiento

### Top Contributors
Los contribuidores destacados reciben:
- ⭐ Badge especial en GitHub
- 🎁 Quantum Tokens (QTK)
- 🏆 Mención en releases
- 👕 Swag exclusivo
- 🎯 Prioridad en hiring

### Hall of Fame
Mantenemos un [CONTRIBUTORS.md](CONTRIBUTORS.md) con todos los que han ayudado.

---

## 📜 Licencia

Al contribuir, aceptas que tu código se licencia bajo [MIT License](LICENSE).

---

## 🎯 Áreas Prioritarias

### 🔥 High Priority
- [ ] Implementar más algoritmos cuánticos
- [ ] Optimizar rendimiento del simulador
- [ ] Expandir tests de seguridad
- [ ] Mejorar documentación de API

### 🎨 Design Needed
- [ ] Dashboard de métricas en tiempo real
- [ ] Visualización 3D de qubits
- [ ] Animaciones de transacciones

### 🔬 Research
- [ ] Nuevos protocolos de consenso cuántico
- [ ] Integración con hardware cuántico real
- [ ] Algoritmos de optimización

---

## ❓ FAQ

**P: ¿Necesito saber computación cuántica?**  
R: No necesariamente. Hay tareas en frontend, docs, testing que no requieren expertise cuántico.

**P: ¿Cuánto tiempo toma revisar un PR?**  
R: Usualmente 2-5 días. PRs urgentes se marcan con label `urgent`.

**P: ¿Puedo trabajar en un issue asignado a otro?**  
R: Pregunta primero. Si no hay actividad por 7 días, está disponible.

**P: ¿Hay compensación?**  
R: Para contribuciones mayores, ofrecemos tokens QTK y posibles roles pagos.

---

## 🙏 Agradecimientos

Gracias a todos los que hacen posible este proyecto pionero. Cada línea de código, cada issue reportado, cada sugerencia cuenta.

**Juntos estamos construyendo el futuro de la blockchain. 🚀**

---

<div align="center">
  <img src="assets/images/quantum-token-logo.png" width="100">
  
  **Quantum Blockchain - El Futuro es Cuántico**
  
  [![GitHub Stars](https://img.shields.io/github/stars/tu-repo?style=social)](https://github.com/tu-repo)
  [![Discord](https://img.shields.io/discord/123456789?color=7289da&label=Discord&logo=discord)](https://discord.gg/quantumchain)
  [![Twitter Follow](https://img.shields.io/twitter/follow/QuantumChainPro?style=social)](https://twitter.com/QuantumChainPro)
</div>
