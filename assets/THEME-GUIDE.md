# 🎨 Guía de Tema Quantum Token

Esta guía explica cómo usar el sistema de diseño oficial basado en los colores del logo Quantum Token.

## 🎯 Colores Oficiales

### Paleta Principal
```css
--quantum-orange: #FF8C00  /* Naranja - Energía e innovación */
--quantum-blue: #1E3A5F    /* Azul oscuro - Profundidad cuántica */
--quantum-cyan: #00FFFF    /* Cyan - Tecnología del futuro */
```

### Significado de los Colores

- **Naranja (#FF8C00)**: Representa la energía, innovación y la potencia de la computación cuántica
- **Azul (#1E3A5F)**: Simboliza la profundidad, estabilidad y complejidad de los algoritmos cuánticos
- **Cyan (#00FFFF)**: Evoca la tecnología, el futuro y la naturaleza digital de la blockchain

## 📦 Instalación

### Método 1: Link en HTML
```html
<link rel="stylesheet" href="assets/quantum-theme.css">
```

### Método 2: Import en CSS
```css
@import url('assets/quantum-theme.css');
```

### Método 3: Import en JavaScript/TypeScript
```javascript
import 'assets/quantum-theme.css'
```

## 🎨 Uso de Clases

### Textos con Gradiente
```html
<h1 class="quantum-text-gradient">Quantum Blockchain</h1>
<h2 class="quantum-text-gradient-reverse">El Futuro es Cuántico</h2>
```

### Botones
```html
<!-- Botón primario (naranja a cyan) -->
<button class="btn-quantum-primary">Iniciar Minado</button>

<!-- Botón secundario (azul a cyan) -->
<button class="btn-quantum-secondary">Ver Dashboard</button>

<!-- Botón outline -->
<button class="btn-quantum-outline">Explorar</button>
```

### Tarjetas
```html
<div class="card-quantum">
  <h3 class="text-quantum-cyan">Estado del Sistema</h3>
  <p class="text-quantum-orange">100% Operacional</p>
</div>
```

### Badges
```html
<span class="badge-quantum-orange">Activo</span>
<span class="badge-quantum-cyan">Online</span>
<span class="badge-quantum-blue">Cuántico</span>
```

### Efectos de Brillo
```html
<img src="logo.svg" class="glow-quantum-cyan">
<div class="glow-quantum-orange">Elemento destacado</div>
<div class="glow-quantum-mixed">Efecto mixto</div>
```

### Animaciones
```html
<div class="animate-quantum-pulse">Pulso</div>
<div class="animate-quantum-glow">Brillo</div>
<div class="animate-quantum-float">Flotante</div>
<div class="animate-quantum-gradient">Gradiente animado</div>
```

## 🎯 Variables CSS

### Usando Variables Directamente
```css
.mi-elemento {
  background: var(--quantum-gradient-primary);
  color: var(--quantum-cyan);
  border: 2px solid var(--quantum-border-cyan);
  box-shadow: var(--quantum-shadow-orange);
}
```

### Gradientes Disponibles
```css
/* Gradiente principal (naranja → azul → cyan) */
background: var(--quantum-gradient-primary);

/* Gradiente inverso (cyan → azul → naranja) */
background: var(--quantum-gradient-reverse);

/* Gradiente horizontal */
background: var(--quantum-gradient-horizontal);

/* Gradientes de dos colores */
background: var(--quantum-gradient-orange-cyan);
background: var(--quantum-gradient-blue-cyan);
background: var(--quantum-gradient-orange-blue);
```

### Fondos
```css
/* Fondo principal con gradiente */
background: var(--quantum-bg-primary);

/* Fondo oscuro sólido */
background: var(--quantum-bg-dark);

/* Tarjeta con blur */
background: var(--quantum-bg-card);
backdrop-filter: blur(10px);

/* Overlay */
background: var(--quantum-bg-overlay);
```

## 📱 Componentes Comunes

### Header
```html
<header style="background: var(--quantum-bg-dark); border-bottom: 2px solid var(--quantum-cyan);">
  <img src="assets/images/quantum-token-logo.svg" class="glow-quantum-cyan">
  <h1 class="quantum-text-gradient">Quantum Blockchain</h1>
</header>
```

### Card de Dashboard
```html
<div class="card-quantum">
  <h3 class="text-quantum-cyan font-bold mb-4">📊 Estadísticas</h3>
  <div class="space-y-2">
    <div>Bloques: <span class="text-quantum-orange font-bold">1,247</span></div>
    <div>Hash Rate: <span class="text-quantum-cyan font-bold">5.2 TH/s</span></div>
  </div>
</div>
```

### Formulario
```html
<form>
  <input type="text" class="input-quantum" placeholder="Dirección de wallet">
  <button type="submit" class="btn-quantum-primary">Enviar</button>
</form>
```

### Lista de Logs
```html
<div class="card-quantum">
  <div style="background: var(--quantum-bg-overlay); padding: 1rem; border-radius: 0.5rem;">
    <div class="text-quantum-orange">✅ Bloque minado exitosamente</div>
    <div class="text-quantum-cyan">💎 Transacción confirmada</div>
    <div class="text-quantum-orange">⚡ Sistema actualizado</div>
  </div>
</div>
```

## 🎨 Ejemplos de Combinaciones

### Combinación 1: Energético (Naranja + Cyan)
```css
.energetic {
  background: var(--quantum-gradient-orange-cyan);
  color: white;
  box-shadow: var(--quantum-shadow-orange);
}
```

### Combinación 2: Profundo (Azul + Cyan)
```css
.profound {
  background: var(--quantum-gradient-blue-cyan);
  border: 2px solid var(--quantum-cyan);
}
```

### Combinación 3: Intenso (Naranja + Azul)
```css
.intense {
  background: var(--quantum-gradient-orange-blue);
  box-shadow: var(--quantum-shadow-mixed);
}
```

## 🌓 Modo Oscuro (por defecto)

El tema está optimizado para modo oscuro por defecto. Los colores funcionan mejor sobre fondos oscuros:

```css
body {
  background: var(--quantum-bg-primary);
  color: var(--quantum-cyan);
  font-family: var(--quantum-font-primary);
}
```

## 📐 Espaciado y Tipografía

### Familias de Fuentes
```css
--quantum-font-primary: 'Exo 2', system-ui, sans-serif;
--quantum-font-heading: 'Orbitron', monospace;
--quantum-font-mono: 'Courier New', monospace;
```

### Uso
```html
<h1 style="font-family: var(--quantum-font-heading)">Título</h1>
<p style="font-family: var(--quantum-font-primary)">Texto</p>
<code style="font-family: var(--quantum-font-mono)">Código</code>
```

## 🎭 Estados Interactivos

### Hover
```css
.mi-boton:hover {
  transform: scale(1.05);
  box-shadow: var(--quantum-shadow-orange-strong);
}
```

### Focus
```css
.mi-input:focus {
  border-color: var(--quantum-orange);
  box-shadow: var(--quantum-shadow-cyan);
}
```

### Active
```css
.mi-elemento:active {
  transform: scale(0.95);
}
```

## ♿ Accesibilidad

- Todos los colores cumplen con WCAG 2.1 AA para contraste
- Las animaciones respetan `prefers-reduced-motion`
- Los focus states son claramente visibles

## 📱 Responsive

El tema incluye breakpoints para móviles:
```css
@media (max-width: 768px) {
  /* Los botones y cards se adaptan automáticamente */
}
```

## 🚀 Mejores Prácticas

1. **Usa las clases predefinidas** en lugar de colores hardcoded
2. **Combina gradientes** para efectos visuales impactantes
3. **Aplica animaciones** con moderación para mejor UX
4. **Mantén la consistencia** usando siempre los colores oficiales
5. **Prueba en modo oscuro** que es el tema principal

## 📚 Recursos Adicionales

- Ver `logo-showcase.html` para ejemplos visuales
- Revisar `quantum-token-logo.ts` para implementación en TS
- Consultar `token-config.json` para configuración completa

---

© 2025 Evolution Style - Quantum Blockchain Project
