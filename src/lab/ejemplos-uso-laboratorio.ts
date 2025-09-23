/**
 * 🎯 Ejemplos de uso del Laboratorio de Pruebas Cuánticas
 * Demostraciones prácticas de todas las funcionalidades del laboratorio
 */

import { QuantumTestingLab } from './quantum-testing-lab'
import { QuantumChainAnalyzer } from './quantum-chain-analyzer'
import { QuantumLearningEngine } from './quantum-learning-engine'
import { QuantumLabDashboard } from './quantum-lab-dashboard'

/**
 * 🧪 Ejemplo 1: Configuración y pruebas básicas del laboratorio
 */
export async function ejemplo1_ConfiguracionBasica(): Promise<void> {
  console.log('\n🧪 EJEMPLO 1: CONFIGURACIÓN BÁSICA DEL LABORATORIO')
  console.log('==================================================')

  try {
    // Inicializar laboratorio
    const lab = new QuantumTestingLab()
    
    console.log('🚀 Iniciando laboratorio de pruebas cuánticas...')
    await lab.startLaboratory()

    // Configurar modos de operación
    lab.setContinuousTesting(true)
    lab.setLearningMode(true)
    lab.setAutoOptimization(false) // Por seguridad en ejemplos

    // Ejecutar suite de pruebas básica
    console.log('\n📋 Ejecutando suite de pruebas de coherencia...')
    const testResults = await lab.runTestSuite('suite_0') // Suite de coherencia cuántica

    // Mostrar resultados
    console.log(`✅ Suite completada: ${testResults.length} pruebas ejecutadas`)
    testResults.forEach((result, index) => {
      console.log(`   Prueba ${index + 1}: ${result.status} - Coherencia: ${result.metrics.quantum.coherence.toFixed(3)}`)
    })

    // Prueba de estrés específica
    console.log('\n⚡ Ejecutando prueba de estrés cuántica...')
    const stressResult = await lab.runQuantumStressTest({
      duration: 30, // 30 segundos
      qubits: 20,
      operationsPerSecond: 50,
      noiseLevel: 0.03
    })

    console.log(`   Resultado: ${stressResult.status}`)
    console.log(`   Throughput alcanzado: ${stressResult.metrics.performance.throughput.toFixed(2)} ops/s`)
    console.log(`   Fidelidad promedio: ${stressResult.metrics.quantum.fidelity.toFixed(3)}`)

    // Análisis de coherencia en tiempo real
    console.log('\n🔬 Analizando coherencia cuántica en tiempo real (30s)...')
    const coherenceAnalysis = await lab.analyzeQuantumCoherence(30)

    console.log(`   Coherencia promedio: ${coherenceAnalysis.averageCoherence.toFixed(3)}`)
    console.log(`   Tendencia: ${coherenceAnalysis.coherenceTrend}`)
    console.log(`   Factores de decoherencia: ${coherenceAnalysis.primaryDecoherenceFactors.join(', ')}`)

    // Generar reporte del laboratorio
    console.log('\n📊 Generando reporte completo...')
    const labReport = await lab.generateLabReport()

    console.log(`   Tests totales: ${labReport.summary.totalTests}`)
    console.log(`   Tasa de éxito: ${labReport.summary.successRate.toFixed(2)}%`)
    console.log(`   Coherencia promedio: ${labReport.quantumMetrics.averageCoherence.toFixed(3)}`)
    console.log(`   Estabilidad: ${labReport.summary.systemStability}%`)

    console.log('\n✅ Ejemplo 1 completado exitosamente')

  } catch (error) {
    console.error('❌ Error en ejemplo 1:', error)
  }
}

/**
 * 🔬 Ejemplo 2: Análisis avanzado de la cadena cuántica
 */
export async function ejemplo2_AnalisisCadena(): Promise<void> {
  console.log('\n🔬 EJEMPLO 2: ANÁLISIS AVANZADO DE LA CADENA')
  console.log('============================================')

  try {
    // Inicializar analizador de cadena
    const analyzer = new QuantumChainAnalyzer()
    
    console.log('🚀 Iniciando análisis de cadena cuántica...')
    await analyzer.startAnalysis()

    // Configurar análisis continuo y aprendizaje adaptivo
    analyzer.setContinuousAnalysis(true)
    analyzer.setAdaptiveLearning(true)

    // Análisis completo de la cadena
    console.log('\n🔍 Ejecutando análisis completo...')
    const analysisReport = await analyzer.performComprehensiveAnalysis()

    console.log(`   Altura de bloque analizada: ${analysisReport.blockHeight}`)
    console.log(`   Salud general: ${analysisReport.health.overall}%`)
    console.log(`     - Rendimiento: ${analysisReport.health.performance}%`)
    console.log(`     - Seguridad: ${analysisReport.health.security}%`)
    console.log(`     - Cuántico: ${analysisReport.health.quantum}%`)
    console.log(`     - Estabilidad: ${analysisReport.health.stability}%`)

    // Mostrar análisis detallado de rendimiento
    console.log('\n⚡ Análisis de rendimiento:')
    const perfAnalysis = analysisReport.analysis.performance
    console.log(`   TPS actual: ${perfAnalysis.throughput.current.toFixed(2)}`)
    console.log(`   Latencia promedio: ${perfAnalysis.latency.average.toFixed(2)}ms`)
    console.log(`   Utilización: ${(perfAnalysis.capacity.utilizationRate * 100).toFixed(1)}%`)
    console.log(`   Tendencia de throughput: ${perfAnalysis.throughput.trend}`)

    // Análisis de aspectos cuánticos
    console.log('\n🌌 Análisis cuántico:')
    const quantumAnalysis = analysisReport.analysis.quantum
    console.log(`   Coherencia promedio: ${quantumAnalysis.coherence.averageCoherence.toFixed(3)}`)
    console.log(`   Entrelazamiento de red: ${quantumAnalysis.entanglement.networkEntanglement.toFixed(3)}`)
    console.log(`   Fidelidad operacional: ${quantumAnalysis.fidelity.operationalFidelity.toFixed(3)}`)
    console.log(`   Estados cuánticos activos: ${quantumAnalysis.quantumStates.activeStates}`)

    // Mostrar recomendaciones principales
    console.log('\n💡 Recomendaciones principales:')
    analysisReport.recommendations.slice(0, 3).forEach((rec, index) => {
      console.log(`   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`)
      console.log(`      Impacto: ${rec.impact}% | Esfuerzo: ${rec.effort}% | Timeline: ${rec.timeline}`)
    })

    // Análisis específico de consenso
    console.log('\n🤝 Análisis de consenso:')
    const consensusAnalysis = await analyzer.analyzeConsensus()
    console.log(`   Algoritmo: ${consensusAnalysis.algorithm}`)
    console.log(`   Eficiencia: ${consensusAnalysis.efficiency}%`)
    console.log(`   Tiempo de finalidad: ${consensusAnalysis.finality.averageTime.toFixed(2)}s`)
    console.log(`   Ventaja cuántica: ${consensusAnalysis.quantumAdvantage.advantage.toFixed(2)}x`)

    // Análisis de red
    console.log('\n🌐 Análisis de red:')
    const networkAnalysis = await analyzer.analyzeNetwork()
    console.log(`   Nodos conectados: ${networkAnalysis.topology.nodeCount}`)
    console.log(`   Canales cuánticos: ${networkAnalysis.communication.quantumChannels}`)
    console.log(`   Tolerancia a fallos: ${networkAnalysis.resilience.faultTolerance}%`)

    console.log('\n✅ Ejemplo 2 completado exitosamente')

  } catch (error) {
    console.error('❌ Error en ejemplo 2:', error)
  }
}

/**
 * 🧬 Ejemplo 3: Motor de aprendizaje e IA adaptiva
 */
export async function ejemplo3_AprendizajeIA(): Promise<void> {
  console.log('\n🧬 EJEMPLO 3: MOTOR DE APRENDIZAJE E IA ADAPTIVA')
  console.log('===============================================')

  try {
    // Inicializar motor de aprendizaje
    const learningEngine = new QuantumLearningEngine()
    
    console.log('🚀 Iniciando motor de aprendizaje cuántico...')
    await learningEngine.startLearning()

    // Configurar modos adaptativos
    learningEngine.setAdaptiveMode(true)
    learningEngine.setAutomationEnabled(false) // Por seguridad en ejemplos

    // Simular datos de entrenamiento
    console.log('\n📚 Generando datos de entrenamiento simulados...')
    const trainingData = generateSimulatedTrainingData(100)

    // Detección de patrones
    console.log('\n🔍 Detectando patrones en datos...')
    const patterns = await learningEngine.detectPatterns(trainingData)

    console.log(`   Patrones detectados: ${patterns.length}`)
    patterns.slice(0, 3).forEach((pattern, index) => {
      console.log(`   ${index + 1}. ${pattern.pattern}`)
      console.log(`      Tipo: ${pattern.type} | Confianza: ${pattern.confidence.toFixed(3)} | Impacto: ${pattern.impact.toFixed(2)}`)
    })

    // Entrenamiento de modelos adaptativos
    console.log('\n🤖 Entrenando modelos adaptativos...')
    const trainedModels = await learningEngine.trainAdaptiveModels(trainingData)

    console.log(`   Modelos entrenados: ${trainedModels.size}`)
    for (const [modelId, model] of trainedModels) {
      console.log(`   ${modelId}: Precisión ${model.accuracy.toFixed(3)}, F1 ${model.performance.f1Score.toFixed(3)}`)
    }

    // Generación de predicciones
    console.log('\n🔮 Generando predicciones...')
    const predictions = await learningEngine.generatePredictions({
      currentMetrics: {
        throughput: 85,
        latency: 50,
        coherence: 0.88,
        fidelity: 0.92
      }
    }, 3600000) // 1 hora

    console.log(`   Predicciones generadas: ${predictions.length}`)
    predictions.slice(0, 3).forEach((pred, index) => {
      console.log(`   ${index + 1}. Modelo ${pred.modelId}: Confianza ${pred.confidence.toFixed(3)}`)
      console.log(`      Predicción: ${JSON.stringify(pred.prediction)}`)
    })

    // Optimización adaptiva
    console.log('\n🎯 Ejecutando optimización adaptiva...')
    const optimization = await learningEngine.performAdaptiveOptimization('performance', {
      maxImpact: 20,
      preserveStability: true
    })

    console.log(`   Estrategia aplicada: ${optimization.strategy}`)
    console.log(`   Mejora obtenida: ${optimization.improvement.toFixed(2)}%`)
    console.log(`   Recomendaciones: ${optimization.recommendations.slice(0, 2).join(', ')}`)

    // Reporte de aprendizaje
    console.log('\n📊 Generando reporte de aprendizaje...')
    const learningReport = await learningEngine.generateLearningReport()

    console.log(`   Patrones descubiertos: ${learningReport.summary.patternsDiscovered}`)
    console.log(`   Modelos activos: ${learningReport.summary.modelsActive}`)
    console.log(`   Precisión promedio: ${learningReport.predictions.accuracy_rate.toFixed(3)}`)
    console.log(`   Insights clave: ${learningReport.insights.key_learnings.join(', ')}`)

    console.log('\n✅ Ejemplo 3 completado exitosamente')

  } catch (error) {
    console.error('❌ Error en ejemplo 3:', error)
  }
}

/**
 * 🎮 Ejemplo 4: Dashboard completo y monitoreo en tiempo real
 */
export async function ejemplo4_DashboardCompleto(): Promise<void> {
  console.log('\n🎮 EJEMPLO 4: DASHBOARD COMPLETO Y MONITOREO')
  console.log('===========================================')

  try {
    // Inicializar dashboard
    const dashboard = new QuantumLabDashboard()
    
    console.log('🚀 Iniciando dashboard del laboratorio...')
    await dashboard.startDashboard()

    // Configurar auto-refresh
    dashboard.setAutoRefresh(true)
    dashboard.setRefreshInterval(5000) // 5 segundos

    // Obtener métricas iniciales
    console.log('\n📊 Recopilando métricas iniciales...')
    const initialMetrics = await dashboard.getCurrentMetrics()

    console.log('   Estado de componentes:')
    console.log(`     Laboratorio: ${initialMetrics.laboratory.status}`)
    console.log(`     Analizador: ${initialMetrics.analyzer.status}`)
    console.log(`     Aprendizaje: ${initialMetrics.learning.status}`)

    console.log('   Métricas cuánticas:')
    console.log(`     Coherencia: ${initialMetrics.quantum.coherence.toFixed(3)}`)
    console.log(`     Fidelidad: ${initialMetrics.quantum.fidelity.toFixed(3)}`)
    console.log(`     Entrelazamiento: ${initialMetrics.quantum.entanglement.toFixed(3)}`)

    console.log('   Rendimiento:')
    console.log(`     Throughput: ${initialMetrics.performance.throughput.toFixed(2)} TPS`)
    console.log(`     Latencia: ${initialMetrics.performance.latency.toFixed(2)}ms`)

    // Prueba de estrés completa
    console.log('\n🔥 Ejecutando prueba de estrés completa...')
    const stressTestResult = await dashboard.runFullStressTest()

    console.log(`   Duración: ${stressTestResult.duration}ms`)
    console.log(`   Tests ejecutados: ${stressTestResult.tests}`)
    console.log(`   Estabilidad post-estrés: ${stressTestResult.systemStability}%`)

    // Optimización automática del sistema
    console.log('\n🎯 Ejecutando optimización automática...')
    const optimization = await dashboard.performSystemOptimization()

    console.log(`   Optimizaciones identificadas: ${optimization.optimizations.identified}`)
    console.log(`   Implementadas exitosamente: ${optimization.optimizations.implemented}`)
    console.log(`   Mejora general: ${optimization.improvement.overall.toFixed(2)}%`)

    // Análisis de tendencias en tiempo real
    console.log('\n📈 Analizando tendencias en tiempo real (60s)...')
    const trendAnalysis = await dashboard.analyzeRealTimeTrends(60)

    console.log(`   Muestras analizadas: ${trendAnalysis.samples.length}`)
    console.log('   Tendencias detectadas:')
    Object.entries(trendAnalysis.trends).forEach(([key, trend]) => {
      console.log(`     ${key}: ${trend}`)
    })
    console.log(`   Insights: ${trendAnalysis.insights.join(', ')}`)

    // Iniciar monitoreo de seguridad
    console.log('\n🛡️ Iniciando monitoreo de seguridad en tiempo real...')
    await dashboard.startSecurityMonitoring()

    // Esperar un poco para ver el monitoreo en acción
    console.log('   Ejecutando monitoreo por 30 segundos...')
    await new Promise(resolve => setTimeout(resolve, 30000))

    // Verificar alertas generadas
    const alerts = dashboard.getAlerts()
    console.log(`   Alertas generadas: ${alerts.length}`)
    alerts.slice(0, 3).forEach((alert, index) => {
      console.log(`     ${index + 1}. [${alert.type.toUpperCase()}] ${alert.title}`)
    })

    // Generar reporte completo del dashboard
    console.log('\n📊 Generando reporte completo del dashboard...')
    const dashboardReport = await dashboard.generateDashboardReport()

    console.log(`   Salud general: ${dashboardReport.executive_summary.overall_health}%`)
    console.log(`   Insights clave: ${dashboardReport.executive_summary.key_insights.slice(0, 2).join(', ')}`)
    console.log(`   Alertas activas: ${dashboardReport.alerts_and_incidents.active_alerts.length}`)
    console.log(`   Optimizaciones completadas: ${dashboardReport.optimizations.completed.length}`)

    console.log('\n✅ Ejemplo 4 completado exitosamente')

  } catch (error) {
    console.error('❌ Error en ejemplo 4:', error)
  }
}

/**
 * 🌟 Ejemplo 5: Integración completa y casos de uso avanzados
 */
export async function ejemplo5_IntegracionCompleta(): Promise<void> {
  console.log('\n🌟 EJEMPLO 5: INTEGRACIÓN COMPLETA Y CASOS AVANZADOS')
  console.log('===================================================')

  try {
    // Inicializar todos los componentes
    const lab = new QuantumTestingLab()
    const analyzer = new QuantumChainAnalyzer()
    const learningEngine = new QuantumLearningEngine()
    const dashboard = new QuantumLabDashboard()

    console.log('🚀 Iniciando ecosistema completo del laboratorio...')
    
    // Inicialización coordinada
    await Promise.all([
      lab.startLaboratory(),
      analyzer.startAnalysis(),
      learningEngine.startLearning(),
      dashboard.startDashboard()
    ])

    // Configuración avanzada
    lab.setContinuousTesting(true)
    lab.setLearningMode(true)
    lab.setAutoOptimization(true)
    
    analyzer.setContinuousAnalysis(true)
    analyzer.setAdaptiveLearning(true)
    
    learningEngine.setAdaptiveMode(true)
    learningEngine.setAutomationEnabled(true)
    
    dashboard.setAutoRefresh(true)

    // Caso de uso 1: Detección y corrección automática de problemas
    console.log('\n🔧 CASO DE USO 1: Detección y corrección automática')
    console.log('   Simulando degradación de coherencia cuántica...')
    
    // Simular problema y observar respuesta automática
    await new Promise(resolve => setTimeout(resolve, 15000)) // Esperar 15s para ver automatización
    
    const metricsAfterAuto = await dashboard.getCurrentMetrics()
    console.log(`   Coherencia después de auto-corrección: ${metricsAfterAuto.quantum.coherence.toFixed(3)}`)

    // Caso de uso 2: Optimización basada en ML
    console.log('\n🤖 CASO DE USO 2: Optimización basada en Machine Learning')
    
    // Generar datos históricos simulados
    const historicalData = generateHistoricalPerformanceData(200)
    
    // Entrenar modelos con datos históricos
    await learningEngine.trainAdaptiveModels(historicalData)
    
    // Aplicar optimizaciones sugeridas por ML
    const mlOptimization = await learningEngine.performAdaptiveOptimization('throughput')
    console.log(`   Mejora de throughput por ML: ${mlOptimization.improvement.toFixed(2)}%`)

    // Caso de uso 3: Análisis predictivo avanzado
    console.log('\n🔮 CASO DE USO 3: Análisis predictivo avanzado')
    
    const currentState = await dashboard.getCurrentMetrics()
    const predictions = await learningEngine.generatePredictions(currentState, 7200000) // 2 horas
    
    console.log(`   Predicciones generadas para 2 horas: ${predictions.length}`)
    predictions.slice(0, 2).forEach((pred, index) => {
      console.log(`     ${index + 1}. ${pred.modelId}: ${JSON.stringify(pred.prediction)} (conf: ${pred.confidence.toFixed(3)})`)
    })

    // Caso de uso 4: Respuesta coordinada a crisis
    console.log('\n🚨 CASO DE USO 4: Respuesta coordinada a crisis')
    console.log('   Simulando escenario de estrés extremo...')
    
    // Ejecutar múltiples pruebas de estrés simultáneas
    const crisisResponse = await Promise.all([
      lab.runQuantumStressTest({
        duration: 45,
        qubits: 35,
        operationsPerSecond: 150,
        noiseLevel: 0.08
      }),
      analyzer.analyzeQuantumCoherence(45),
      dashboard.runFullStressTest()
    ])

    console.log('   Respuesta del sistema:')
    console.log(`     Tests de laboratorio: ${crisisResponse[0].status}`)
    console.log(`     Coherencia mantenida: ${crisisResponse[1].coherenceTrend}`)
    console.log(`     Estabilidad general: ${crisisResponse[2].systemStability}%`)

    // Caso de uso 5: Reporte ejecutivo integrado
    console.log('\n📊 CASO DE USO 5: Reporte ejecutivo integrado')
    
    const [labReport, chainReport, learningReport, dashboardReport] = await Promise.all([
      lab.generateLabReport(),
      analyzer.performComprehensiveAnalysis(),
      learningEngine.generateLearningReport(),
      dashboard.generateDashboardReport()
    ])

    console.log('   RESUMEN EJECUTIVO INTEGRADO:')
    console.log(`   ════════════════════════════`)
    console.log(`   Salud del Laboratorio: ${labReport.summary.systemStability}%`)
    console.log(`   Salud de la Cadena: ${chainReport.health.overall}%`)
    console.log(`   Eficiencia de IA: ${(learningReport.predictions.accuracy_rate * 100).toFixed(1)}%`)
    console.log(`   Estado General: ${dashboardReport.executive_summary.overall_health}%`)
    
    console.log('\n   MÉTRICAS CLAVE INTEGRADAS:')
    console.log(`   Tests Ejecutados: ${labReport.summary.totalTests}`)
    console.log(`   Análisis Completados: ${chainReport.blockHeight}`)
    console.log(`   Patrones IA Descubiertos: ${learningReport.summary.patternsDiscovered}`)
    console.log(`   Optimizaciones Aplicadas: ${dashboardReport.optimizations.completed.length}`)
    
    console.log('\n   RECOMENDACIONES PRIORITARIAS:')
    const allRecommendations = [
      ...chainReport.recommendations.slice(0, 2),
      ...learningReport.insights.recommendations.slice(0, 2)
    ]
    allRecommendations.forEach((rec, index) => {
      console.log(`     ${index + 1}. ${typeof rec === 'string' ? rec : rec.title}`)
    })

    // Métricas finales del ecosistema
    console.log('\n🌟 MÉTRICAS FINALES DEL ECOSISTEMA:')
    const finalMetrics = await dashboard.getCurrentMetrics()
    console.log(`   Coherencia Cuántica: ${finalMetrics.quantum.coherence.toFixed(3)}`)
    console.log(`   Fidelidad del Sistema: ${finalMetrics.quantum.fidelity.toFixed(3)}`)
    console.log(`   Throughput: ${finalMetrics.performance.throughput.toFixed(2)} TPS`)
    console.log(`   Latencia: ${finalMetrics.performance.latency.toFixed(2)}ms`)
    console.log(`   Estabilidad: ${finalMetrics.laboratory.successRate.toFixed(1)}%`)

    console.log('\n✅ Ejemplo 5 - Integración completa exitosa')
    console.log('🎉 TODOS LOS EJEMPLOS COMPLETADOS EXITOSAMENTE')

  } catch (error) {
    console.error('❌ Error en ejemplo 5:', error)
  }
}

/**
 * 🏃‍♂️ Ejecutar todos los ejemplos secuencialmente
 */
export async function ejecutarTodosLosEjemplos(): Promise<void> {
  console.log('\n🏃‍♂️ EJECUTANDO TODOS LOS EJEMPLOS DEL LABORATORIO CUÁNTICO')
  console.log('============================================================')
  
  const startTime = Date.now()

  try {
    await ejemplo1_ConfiguracionBasica()
    await ejemplo2_AnalisisCadena()
    await ejemplo3_AprendizajeIA()
    await ejemplo4_DashboardCompleto()
    await ejemplo5_IntegracionCompleta()

    const totalTime = Date.now() - startTime
    console.log(`\n🎉 TODOS LOS EJEMPLOS COMPLETADOS EN ${totalTime}ms`)
    console.log('====================================================')

  } catch (error) {
    console.error('❌ Error ejecutando ejemplos:', error)
  }
}

// Funciones auxiliares para generar datos simulados

function generateSimulatedTrainingData(samples: number): any[] {
  const data = []
  
  for (let i = 0; i < samples; i++) {
    data.push({
      timestamp: Date.now() - (samples - i) * 60000, // 1 minuto entre muestras
      metrics: {
        throughput: 70 + Math.random() * 60,
        latency: 30 + Math.random() * 40,
        coherence: 0.8 + Math.random() * 0.15,
        fidelity: 0.85 + Math.random() * 0.12,
        errorRate: Math.random() * 0.1,
        noiseLevel: Math.random() * 0.08
      },
      events: [
        { type: 'transaction', count: Math.floor(Math.random() * 100) },
        { type: 'quantum_operation', count: Math.floor(Math.random() * 50) }
      ],
      environment: {
        temperature: 0.01 + Math.random() * 0.005, // Kelvin
        vibration: Math.random() * 0.001,
        electromagnetic: Math.random() * 0.01
      }
    })
  }
  
  return data
}

function generateHistoricalPerformanceData(samples: number): any[] {
  const data = []
  let basePerformance = 80
  
  for (let i = 0; i < samples; i++) {
    // Simular tendencia de mejora gradual con variación
    basePerformance += (Math.random() - 0.45) * 2
    basePerformance = Math.max(50, Math.min(120, basePerformance))
    
    data.push({
      timestamp: Date.now() - (samples - i) * 300000, // 5 minutos entre muestras
      performance: {
        throughput: basePerformance + Math.random() * 20 - 10,
        latency: 100 - basePerformance/2 + Math.random() * 15,
        cpu: Math.random() * 100,
        memory: Math.random() * 100
      },
      quantum: {
        coherence: 0.7 + (basePerformance - 50) / 200 + Math.random() * 0.1,
        fidelity: 0.8 + (basePerformance - 50) / 250 + Math.random() * 0.08,
        entanglement: 0.75 + Math.random() * 0.15
      },
      outcomes: {
        success: Math.random() > 0.15,
        improvement: (Math.random() - 0.5) * 10
      }
    })
  }
  
  return data
}

// Exportar función principal para uso externo
export { ejecutarTodosLosEjemplos as default }