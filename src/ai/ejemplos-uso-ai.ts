/**
 * 🚀 Ejemplo de Uso del Sistema AI Cuántico
 * Demostración completa de todas las capacidades del sistema de IA
 */

import { 
  QuantumAISystem, 
  createQuantumAISystem, 
  AISystemPresets,
  type AISystemConfig 
} from './quantum-ai-system'

/**
 * 🎯 Ejemplo 1: Configuración básica y inicio del sistema
 */
async function ejemploBasico() {
  console.log('\n🎯 === EJEMPLO 1: Configuración Básica ===')
  
  // Crear sistema con configuración de desarrollo
  const aiSystem = createQuantumAISystem(AISystemPresets.development)
  
  try {
    // Iniciar el sistema completo
    await aiSystem.start()
    
    // Verificar estado
    console.log(`Sistema activo: ${aiSystem.isSystemRunning()}`)
    
    // Obtener estadísticas iniciales
    const stats = aiSystem.getStats()
    console.log('📊 Estadísticas iniciales:', stats)
    
    // Simular trabajo por 30 segundos
    console.log('⏳ Simulando trabajo del sistema por 30 segundos...')
    await new Promise(resolve => setTimeout(resolve, 30000))
    
    // Detener sistema
    await aiSystem.stop()
    
  } catch (error) {
    console.error('❌ Error en ejemplo básico:', error)
  }
}

/**
 * 🔬 Ejemplo 2: Análisis de código con AI
 */
async function ejemploAnalisisCodeo() {
  console.log('\n🔬 === EJEMPLO 2: Análisis de Código con AI ===')
  
  const aiSystem = createQuantumAISystem({
    analysis: {
      enabled: true,
      realTimeAnalysis: true,
      autoFixCritical: true,
      learningMode: true
    }
  })
  
  await aiSystem.start()
  
  // Código de ejemplo para analizar
  const codigoEjemplo = `
    import { QuantumState } from './quantum-state'
    
    class ProblematicQuantumCode {
      private state: QuantumState
      
      constructor() {
        // ❌ Problema: No inicialización de estado cuántico
        this.state = null
      }
      
      public processQuantumOperation(data: any): any {
        // ❌ Problema: Falta validación de entrada
        // ❌ Problema: Operación cuántica sin protección de coherencia
        return this.state.apply(data)
      }
      
      public async performEntanglement(): Promise<void> {
        // ❌ Problema: Async sin manejo de errores
        const result = await this.quantumNetwork.entangle()
        // ❌ Problema: Falta verificación de resultado
      }
      
      private quantumNetwork: any // ❌ Problema: Tipo any
    }
  `
  
  try {
    // Analizar el código problemático
    console.log('🔍 Analizando código con problemas...')
    const resultado = await aiSystem.analyzeFile('ejemplo-problematico.ts', codigoEjemplo)
    
    console.log(`📊 Análisis completado:`)
    console.log(`   - Problemas encontrados: ${resultado.issues.length}`)
    console.log(`   - Puntuación de calidad: ${resultado.metrics.qualityScore}`)
    console.log(`   - Complejidad: ${resultado.metrics.complexity}`)
    
    // Mostrar problemas encontrados
    console.log('\n🚨 Problemas detectados:')
    resultado.issues.forEach((issue: any, index: number) => {
      console.log(`   ${index + 1}. ${issue.rule.name} (${issue.rule.severity})`)
      console.log(`      Línea ${issue.location.line}: ${issue.description}`)
      if (issue.suggestion) {
        console.log(`      💡 Sugerencia: ${issue.suggestion}`)
      }
    })
    
    // El auto-fixer debería haber intentado corregir problemas críticos
    const stats = aiSystem.getStats()
    console.log(`\n🔧 Auto-correcciones aplicadas: ${stats.autoFixesApplied}`)
    
  } catch (error) {
    console.error('❌ Error en análisis de código:', error)
  }
  
  await aiSystem.stop()
}

/**
 * 📊 Ejemplo 3: Monitoreo en tiempo real
 */
async function ejemploMonitoreoTiempoReal() {
  console.log('\n📊 === EJEMPLO 3: Monitoreo en Tiempo Real ===')
  
  const aiSystem = createQuantumAISystem({
    monitoring: {
      enabled: true,
      interval: 2000, // Monitoreo cada 2 segundos
      predictiveMode: true,
      alertThresholds: {
        performance: 80,
        security: 90,
        quantum: 70
      }
    },
    dashboard: {
      enabled: true,
      autoUpdate: true,
      theme: 'quantum',
      widgets: ['system_health', 'performance_metrics', 'quantum_metrics', 'active_alerts', 'ai_predictions']
    }
  })
  
  await aiSystem.start()
  
  try {
    console.log('📈 Monitoreo iniciado. Simulando actividad del sistema...')
    
    // Simular actividad por 2 minutos
    const tiempoSimulacion = 120000 // 2 minutos
    const inicioSimulacion = Date.now()
    
    const intervaloDatos = setInterval(() => {
      const tiempoTranscurrido = Date.now() - inicioSimulacion
      
      if (tiempoTranscurrido >= tiempoSimulacion) {
        clearInterval(intervaloDatos)
        return
      }
      
      // Obtener estado del sistema
      const salud = aiSystem.getMonitor().getSystemHealth()
      const alertas = aiSystem.getMonitor().getActiveAlerts()
      
      console.log(`\n⏰ Tiempo: ${Math.floor(tiempoTranscurrido / 1000)}s`)
      console.log(`💚 Salud general: ${salud.overall.toFixed(1)}%`)
      console.log(`📊 Rendimiento: ${salud.categories.performance.toFixed(1)}%`)
      console.log(`⚛️  Cuántico: ${salud.categories.quantum.toFixed(1)}%`)
      console.log(`🔒 Seguridad: ${salud.categories.security.toFixed(1)}%`)
      console.log(`🚨 Alertas activas: ${alertas.length}`)
      
      if (alertas.length > 0) {
        console.log('   Alertas:')
        alertas.forEach(alerta => {
          console.log(`   - ${alerta.severity.toUpperCase()}: ${alerta.title}`)
        })
      }
      
    }, 10000) // Mostrar información cada 10 segundos
    
    // Esperar a que termine la simulación
    await new Promise(resolve => setTimeout(resolve, tiempoSimulacion))
    
    clearInterval(intervaloDatos)
    
    // Mostrar estadísticas finales
    const statsFinales = aiSystem.getStats()
    console.log('\n📊 === ESTADÍSTICAS FINALES ===')
    console.log(`Análisis totales: ${statsFinales.totalAnalyses}`)
    console.log(`Problemas detectados: ${statsFinales.issuesDetected}`)
    console.log(`Auto-correcciones: ${statsFinales.autoFixesApplied}`)
    console.log(`Alertas generadas: ${statsFinales.alertsGenerated}`)
    console.log(`Tiempo promedio análisis: ${statsFinales.performance.avgAnalysisTime.toFixed(2)}ms`)
    console.log(`Tasa de éxito: ${statsFinales.performance.successRate.toFixed(1)}%`)
    
  } catch (error) {
    console.error('❌ Error en monitoreo:', error)
  }
  
  await aiSystem.stop()
}

/**
 * 🏥 Ejemplo 4: Análisis de salud del sistema
 */
async function ejemploAnalisisSalud() {
  console.log('\n🏥 === EJEMPLO 4: Análisis de Salud del Sistema ===')
  
  const aiSystem = createQuantumAISystem(AISystemPresets.production)
  
  await aiSystem.start()
  
  try {
    // Dejar que el sistema funcione un poco
    console.log('⏳ Sistema funcionando por 1 minuto...')
    await new Promise(resolve => setTimeout(resolve, 60000))
    
    // Realizar análisis de salud completo
    console.log('🏥 Realizando análisis de salud completo...')
    const reporteSalud = await aiSystem.performHealthCheck()
    
    console.log('\n📋 === REPORTE DE SALUD ===')
    console.log(`Timestamp: ${new Date(reporteSalud.timestamp).toLocaleString()}`)
    console.log(`Salud general: ${reporteSalud.systemHealth.overall.toFixed(1)}%`)
    
    console.log('\n🔧 Estado de componentes:')
    Object.entries(reporteSalud.components).forEach(([nombre, estado]: [string, any]) => {
      console.log(`   ${nombre}: ${estado.status}`)
      if (estado.rulesLoaded) console.log(`      Reglas cargadas: ${estado.rulesLoaded}`)
      if (estado.strategiesLoaded) console.log(`      Estrategias: ${estado.strategiesLoaded}`)
      if (estado.widgetsActive) console.log(`      Widgets activos: ${estado.widgetsActive}`)
    })
    
    console.log('\n🚨 Alertas activas:')
    if (reporteSalud.activeAlerts.length === 0) {
      console.log('   ✅ No hay alertas activas')
    } else {
      reporteSalud.activeAlerts.forEach((alerta: any) => {
        console.log(`   - ${alerta.severity.toUpperCase()}: ${alerta.title}`)
      })
    }
    
    console.log('\n💡 Recomendaciones:')
    reporteSalud.recommendations.forEach((rec: string, index: number) => {
      console.log(`   ${index + 1}. ${rec}`)
    })
    
    console.log('\n📊 Estadísticas de rendimiento:')
    const stats = reporteSalud.stats
    console.log(`   Tiempo de actividad: ${stats.systemUptimeHours.toFixed(2)} horas`)
    console.log(`   Análisis realizados: ${stats.totalAnalyses}`)
    console.log(`   Tasa de éxito: ${stats.performance.successRate.toFixed(1)}%`)
    console.log(`   Tiempo promedio: ${stats.performance.avgAnalysisTime.toFixed(2)}ms`)
    
  } catch (error) {
    console.error('❌ Error en análisis de salud:', error)
  }
  
  await aiSystem.stop()
}

/**
 * 🎛️ Ejemplo 5: Configuración avanzada y personalización
 */
async function ejemploConfiguracionAvanzada() {
  console.log('\n🎛️ === EJEMPLO 5: Configuración Avanzada ===')
  
  // Configuración personalizada
  const configPersonalizada: AISystemConfig = {
    analysis: {
      enabled: true,
      realTimeAnalysis: true,
      autoFixCritical: true,
      learningMode: true
    },
    monitoring: {
      enabled: true,
      interval: 3000,
      predictiveMode: true,
      alertThresholds: {
        performance: 75,
        security: 85,
        quantum: 65
      }
    },
    dashboard: {
      enabled: true,
      autoUpdate: true,
      theme: 'quantum',
      widgets: ['system_health', 'performance_metrics', 'quantum_metrics', 'active_alerts', 'ai_predictions', 'security_status']
    },
    notifications: {
      email: 'admin@quantumdapp.com',
      webhook: 'https://hooks.slack.com/quantum-alerts'
    }
  }
  
  const aiSystem = createQuantumAISystem(configPersonalizada)
  
  try {
    await aiSystem.start()
    
    console.log('⚙️ Sistema iniciado con configuración personalizada')
    console.log('Configuración actual:', JSON.stringify(aiSystem.getSystemConfig(), null, 2))
    
    // Actualizar configuración en caliente
    console.log('\n🔄 Actualizando configuración en caliente...')
    aiSystem.updateConfig({
      monitoring: {
        ...configPersonalizada.monitoring,
        interval: 1000 // Cambiar a 1 segundo
      }
    })
    
    console.log('✅ Configuración actualizada')
    
    // Exportar datos del sistema
    console.log('\n📤 Exportando datos del sistema...')
    const datosExportados = aiSystem.exportSystemData()
    console.log(`Datos exportados (${datosExportados.length} caracteres)`)
    
    // Realizar diagnósticos
    console.log('\n🔍 Ejecutando diagnósticos completos...')
    const diagnosticos = await aiSystem.runDiagnostics()
    
    console.log('📋 Resumen de diagnósticos:')
    console.log(`   Memoria del sistema: ${JSON.stringify(diagnosticos.system.memory)}`)
    console.log(`   Tiempo de actividad: ${diagnosticos.system.uptime.toFixed(2)} horas`)
    console.log(`   Plataforma: ${diagnosticos.system.platform}`)
    
    // Simular trabajo y mostrar progreso
    console.log('\n📈 Monitoreando sistema por 30 segundos...')
    for (let i = 0; i < 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      const salud = aiSystem.getMonitor().getSystemHealth()
      console.log(`   ${(i + 1) * 5}s - Salud: ${salud.overall.toFixed(1)}%`)
    }
    
  } catch (error) {
    console.error('❌ Error en configuración avanzada:', error)
  }
  
  await aiSystem.stop()
}

/**
 * 🚀 Función principal para ejecutar todos los ejemplos
 */
async function ejecutarEjemplos() {
  console.log('🤖 === QUANTUM AI SYSTEM - EJEMPLOS DE USO ===\n')
  
  try {
    // Ejecutar ejemplos en secuencia
    await ejemploBasico()
    await new Promise(resolve => setTimeout(resolve, 2000)) // Pausa entre ejemplos
    
    await ejemploAnalisisCodeo()
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await ejemploMonitoreoTiempoReal()
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await ejemploAnalisisSalud()
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await ejemploConfiguracionAvanzada()
    
    console.log('\n✅ === TODOS LOS EJEMPLOS COMPLETADOS ===')
    
  } catch (error) {
    console.error('❌ Error ejecutando ejemplos:', error)
  }
}

/**
 * 🎮 Ejemplo interactivo (para uso en navegador)
 */
function ejemploInteractivo() {
  console.log('\n🎮 === EJEMPLO INTERACTIVO ===')
  console.log('Este ejemplo puede ejecutarse en un navegador web')
  
  // Crear interfaz simple
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Quantum AI System Demo</title>
        <style>
            body { 
                font-family: 'Courier New', monospace; 
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                color: white;
                padding: 20px;
            }
            .container { max-width: 1200px; margin: 0 auto; }
            .button { 
                background: #bb86fc; 
                color: black; 
                border: none; 
                padding: 10px 20px; 
                margin: 10px; 
                border-radius: 5px; 
                cursor: pointer; 
            }
            .output { 
                background: rgba(255, 255, 255, 0.1); 
                padding: 15px; 
                border-radius: 10px; 
                margin: 10px 0; 
                min-height: 200px;
                font-family: monospace;
            }
            .status { 
                display: inline-block; 
                padding: 5px 10px; 
                border-radius: 15px; 
                margin: 5px;
            }
            .status.active { background: #4caf50; }
            .status.inactive { background: #f44336; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 Quantum AI System - Demo Interactivo</h1>
            
            <div>
                <button class="button" onclick="iniciarSistema()">🚀 Iniciar Sistema</button>
                <button class="button" onclick="analizarCodigo()">🔬 Analizar Código</button>
                <button class="button" onclick="mostrarSalud()">🏥 Salud del Sistema</button>
                <button class="button" onclick="mostrarDashboard()">📊 Dashboard</button>
                <button class="button" onclick="detenerSistema()">⏹️ Detener Sistema</button>
            </div>
            
            <div id="status">
                <span class="status inactive">Sistema: Detenido</span>
                <span class="status inactive">Monitoreo: Inactivo</span>
                <span class="status inactive">Dashboard: Oculto</span>
            </div>
            
            <div id="output" class="output">
                <p>👋 Bienvenido al Quantum AI System</p>
                <p>Presiona "Iniciar Sistema" para comenzar...</p>
            </div>
            
            <div id="quantum-ai-dashboard"></div>
        </div>
        
        <script>
            let aiSystem = null;
            
            async function iniciarSistema() {
                log('🚀 Iniciando Quantum AI System...');
                try {
                    // En una implementación real, importaríamos el módulo aquí
                    log('✅ Sistema iniciado correctamente');
                    updateStatus('sistema', true);
                    updateStatus('monitoreo', true);
                } catch (error) {
                    log('❌ Error: ' + error.message);
                }
            }
            
            async function analizarCodigo() {
                log('🔬 Analizando código de ejemplo...');
                // Simular análisis
                setTimeout(() => {
                    log('📊 Análisis completado:');
                    log('   - 5 problemas encontrados');
                    log('   - 2 correcciones aplicadas');
                    log('   - Puntuación: 78/100');
                }, 1000);
            }
            
            async function mostrarSalud() {
                log('🏥 Obteniendo salud del sistema...');
                setTimeout(() => {
                    log('💚 Salud General: 89%');
                    log('📊 Rendimiento: 85%');
                    log('⚛️  Cuántico: 92%');
                    log('🔒 Seguridad: 88%');
                    log('🚨 0 alertas activas');
                }, 500);
            }
            
            async function mostrarDashboard() {
                log('📺 Mostrando dashboard...');
                updateStatus('dashboard', true);
                document.getElementById('quantum-ai-dashboard').style.display = 'block';
                // En una implementación real, inicializaríamos el dashboard aquí
            }
            
            async function detenerSistema() {
                log('⏹️ Deteniendo sistema...');
                updateStatus('sistema', false);
                updateStatus('monitoreo', false);
                updateStatus('dashboard', false);
                log('✅ Sistema detenido');
            }
            
            function log(message) {
                const output = document.getElementById('output');
                output.innerHTML += '<p>' + message + '</p>';
                output.scrollTop = output.scrollHeight;
            }
            
            function updateStatus(component, active) {
                const statusMap = {
                    'sistema': 'Sistema: ' + (active ? 'Activo' : 'Detenido'),
                    'monitoreo': 'Monitoreo: ' + (active ? 'Activo' : 'Inactivo'),
                    'dashboard': 'Dashboard: ' + (active ? 'Visible' : 'Oculto')
                };
                
                // Actualizar elementos de estado
            }
        </script>
    </body>
    </html>
  `
  
  console.log('🌐 HTML generado para demo interactivo')
  console.log('📝 Guarda el contenido en un archivo .html y ábrelo en un navegador')
  
  return html
}

// Exportar ejemplos para uso externo
export {
  ejemploBasico,
  ejemploAnalisisCodeo,
  ejemploMonitoreoTiempoReal,
  ejemploAnalisisSalud,
  ejemploConfiguracionAvanzada,
  ejecutarEjemplos,
  ejemploInteractivo
}

// Si se ejecuta directamente, ejecutar todos los ejemplos
if (require.main === module) {
  ejecutarEjemplos().catch(console.error)
}

/**
 * 📚 Documentación de uso rápido
 */
export const documentacionRapida = `
🤖 QUANTUM AI SYSTEM - Guía de Uso Rápido

1. 🚀 Inicio Básico:
   import { createQuantumAISystem, AISystemPresets } from './quantum-ai-system'
   const ai = createQuantumAISystem(AISystemPresets.development)
   await ai.start()

2. 🔬 Análisis de Código:
   const resultado = await ai.analyzeFile('mi-archivo.ts', contenido)
   console.log('Problemas:', resultado.issues.length)

3. 📊 Monitoreo:
   const salud = ai.getMonitor().getSystemHealth()
   console.log('Salud general:', salud.overall + '%')

4. 🏥 Diagnósticos:
   const reporte = await ai.performHealthCheck()
   console.log('Recomendaciones:', reporte.recommendations)

5. ⚙️ Configuración:
   ai.updateConfig({
     analysis: { autoFixCritical: true },
     monitoring: { interval: 1000 }
   })

6. 📺 Dashboard:
   await ai.showDashboard()

7. ⏹️ Detener:
   await ai.stop()

📖 Más ejemplos en los archivos de ejemplo incluidos.
`

console.log(documentacionRapida)