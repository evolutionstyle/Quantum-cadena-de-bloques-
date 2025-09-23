/**
 * 📊 Quantum Smart Monitor - Sistema de monitoreo inteligente en tiempo real
 * Supervisión AI que analiza rendimiento, detecta anomalías y predice problemas
 */

import { QuantumAIAnalyzer, AnalysisResult } from './quantum-ai-analyzer'
import { QuantumAutoFixer } from './quantum-auto-fixer'
import { SimpleHash } from '../utils/simple-hash'

interface MonitoringMetric {
  id: string
  name: string
  category: 'performance' | 'quantum' | 'security' | 'quality' | 'business'
  value: number
  unit: string
  timestamp: number
  trend: 'up' | 'down' | 'stable'
  threshold?: {
    warning: number
    critical: number
  }
}

interface Alert {
  id: string
  type: 'performance' | 'security' | 'quantum' | 'anomaly' | 'prediction'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  timestamp: number
  source: string
  resolved: boolean
  autoFixAttempted: boolean
  recommendedActions: string[]
  impact: {
    systems: string[]
    estimatedDowntime?: number
    usersAffected?: number
  }
}

interface AnomalyDetection {
  pattern: string
  confidence: number
  timeframe: number
  description: string
  possibleCauses: string[]
  predictedImpact: string
}

interface SystemHealth {
  overall: number // 0-100
  categories: {
    performance: number
    quantum: number
    security: number
    quality: number
  }
  trends: {
    last24h: 'improving' | 'declining' | 'stable'
    last7d: 'improving' | 'declining' | 'stable'
  }
  predictions: {
    nextIssue?: {
      type: string
      probability: number
      timeframe: string
    }
  }
}

export class QuantumSmartMonitor {
  private analyzer: QuantumAIAnalyzer
  private autoFixer: QuantumAutoFixer
  private metrics: Map<string, MonitoringMetric[]>
  private alerts: Map<string, Alert>
  private anomalies: AnomalyDetection[]
  private isMonitoring: boolean
  private monitoringInterval: NodeJS.Timeout | null
  private watchers: Map<string, FileSystemWatcher>
  private aiPredictor: QuantumAIPredictor

  constructor(analyzer: QuantumAIAnalyzer, autoFixer: QuantumAutoFixer) {
    this.analyzer = analyzer
    this.autoFixer = autoFixer
    this.metrics = new Map()
    this.alerts = new Map()
    this.anomalies = []
    this.isMonitoring = false
    this.monitoringInterval = null
    this.watchers = new Map()
    this.aiPredictor = new QuantumAIPredictor()

    this.initializeMetrics()
    console.log('📊 Quantum Smart Monitor inicializado')
  }

  /**
   * 🚀 Iniciar monitoreo en tiempo real
   */
  public startMonitoring(options: MonitoringOptions = {}): void {
    if (this.isMonitoring) {
      console.log('⚠️ Monitoreo ya está activo')
      return
    }

    console.log('🚀 Iniciando monitoreo inteligente...')
    
    this.isMonitoring = true
    const interval = options.interval || 5000 // 5 segundos por defecto

    // Monitoreo periódico
    this.monitoringInterval = setInterval(() => {
      this.collectMetrics()
      this.detectAnomalies()
      this.predictIssues()
      this.processAlerts()
    }, interval)

    // Monitoreo de archivos
    if (options.watchFiles) {
      this.startFileWatching(options.watchPaths || ['./src'])
    }

    // Monitoreo de sistema
    this.startSystemMonitoring()

    console.log('✅ Monitoreo iniciado')
    this.createAlert({
      type: 'anomaly',
      severity: 'low',
      title: 'Monitoreo Iniciado',
      description: 'Sistema de monitoreo inteligente activo',
      source: 'monitor',
      recommendedActions: ['Revisar dashboard de métricas'],
      impact: { systems: ['monitoring'] }
    })
  }

  /**
   * ⏹️ Detener monitoreo
   */
  public stopMonitoring(): void {
    if (!this.isMonitoring) return

    console.log('⏹️ Deteniendo monitoreo...')
    
    this.isMonitoring = false
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }

    // Detener watchers de archivos
    for (const watcher of this.watchers.values()) {
      watcher.stop()
    }
    this.watchers.clear()

    console.log('✅ Monitoreo detenido')
  }

  /**
   * 📈 Recopilar métricas del sistema
   */
  private async collectMetrics(): Promise<void> {
    const timestamp = Date.now()

    // Métricas de rendimiento
    const performanceMetrics = await this.collectPerformanceMetrics()
    this.addMetrics('performance', performanceMetrics, timestamp)

    // Métricas cuánticas
    const quantumMetrics = await this.collectQuantumMetrics()
    this.addMetrics('quantum', quantumMetrics, timestamp)

    // Métricas de calidad de código
    const qualityMetrics = await this.collectQualityMetrics()
    this.addMetrics('quality', qualityMetrics, timestamp)

    // Métricas de seguridad
    const securityMetrics = await this.collectSecurityMetrics()
    this.addMetrics('security', securityMetrics, timestamp)

    // Métricas de negocio
    const businessMetrics = await this.collectBusinessMetrics()
    this.addMetrics('business', businessMetrics, timestamp)
  }

  /**
   * 🔍 Detectar anomalías usando AI
   */
  private async detectAnomalies(): Promise<void> {
    const recentMetrics = this.getRecentMetrics(300000) // Últimos 5 minutos
    
    for (const [category, metrics] of recentMetrics) {
      const anomalies = await this.aiPredictor.detectAnomalies(metrics)
      
      for (const anomaly of anomalies) {
        this.anomalies.push(anomaly)
        
        // Crear alerta si es significativa
        if (anomaly.confidence > 0.7) {
          this.createAlert({
            type: 'anomaly',
            severity: this.calculateSeverity(anomaly.confidence),
            title: `Anomalía detectada en ${category}`,
            description: anomaly.description,
            source: 'ai_detector',
            recommendedActions: [`Investigar patrón: ${anomaly.pattern}`],
            impact: {
              systems: [category],
              estimatedDowntime: anomaly.confidence > 0.9 ? 15 : undefined
            }
          })
        }
      }
    }

    // Limpiar anomalías antiguas
    const oneHourAgo = Date.now() - 3600000
    this.anomalies = this.anomalies.filter(a => 
      Date.now() - oneHourAgo < 3600000
    )
  }

  /**
   * 🔮 Predecir problemas futuros
   */
  private async predictIssues(): Promise<void> {
    const allMetrics = Array.from(this.metrics.values()).flat()
    const predictions = await this.aiPredictor.predictIssues(allMetrics)

    for (const prediction of predictions) {
      if (prediction.probability > 0.6) {
        this.createAlert({
          type: 'prediction',
          severity: prediction.probability > 0.8 ? 'high' : 'medium',
          title: `Problema predicho: ${prediction.type}`,
          description: `AI predice ${prediction.type} con ${(prediction.probability * 100).toFixed(1)}% de probabilidad en ${prediction.timeframe}`,
          source: 'ai_predictor',
          recommendedActions: prediction.preventiveActions || ['Monitorear de cerca'],
          impact: {
            systems: prediction.affectedSystems || ['unknown'],
            estimatedDowntime: prediction.estimatedImpact
          }
        })
      }
    }
  }

  /**
   * 🚨 Procesar alertas y tomar acciones
   */
  private async processAlerts(): Promise<void> {
    const activeAlerts = Array.from(this.alerts.values()).filter(a => !a.resolved)
    
    for (const alert of activeAlerts) {
      // Auto-corrección para alertas críticas
      if (alert.severity === 'critical' && !alert.autoFixAttempted) {
        await this.attemptAutoFix(alert)
      }

      // Escalado automático
      if (alert.severity === 'critical' && Date.now() - alert.timestamp > 300000) {
        this.escalateAlert(alert)
      }

      // Auto-resolución de alertas de predicción si la métrica mejora
      if (alert.type === 'prediction') {
        const shouldResolve = await this.checkPredictionResolution(alert)
        if (shouldResolve) {
          this.resolveAlert(alert.id, 'Condiciones mejoradas, predicción ya no aplica')
        }
      }
    }
  }

  /**
   * 📁 Monitoreo de archivos
   */
  private startFileWatching(paths: string[]): void {
    for (const path of paths) {
      const watcher = new FileSystemWatcher(path, {
        onChange: (filePath, content) => this.onFileChange(filePath, content),
        onError: (error) => this.onFileWatchError(error)
      })
      
      this.watchers.set(path, watcher)
      watcher.start()
    }
  }

  private async onFileChange(filePath: string, content: string): Promise<void> {
    console.log(`📝 Archivo modificado: ${filePath}`)
    
    try {
      // Análisis inmediato del archivo
      const analysis = await this.analyzer.analyzeFile(filePath, content)
      
      // Verificar si introdujo problemas críticos
      const criticalIssues = analysis.issues.filter(i => i.rule.severity === 'critical')
      
      if (criticalIssues.length > 0) {
        this.createAlert({
          type: 'security',
          severity: 'critical',
          title: `Problemas críticos en ${filePath}`,
          description: `${criticalIssues.length} problemas críticos detectados`,
          source: 'file_watcher',
          recommendedActions: ['Revisar cambios inmediatamente', 'Ejecutar auto-corrección'],
          impact: {
            systems: ['codebase'],
            usersAffected: criticalIssues.some(i => i.rule.category === 'security') ? 1000 : undefined
          }
        })

        // Intentar auto-corrección inmediata
        const fixResult = await this.autoFixer.autoFixFile(filePath, content)
        if (fixResult.session.successfulFixes > 0) {
          console.log(`🔧 Auto-corregidos ${fixResult.session.successfulFixes} problemas en ${filePath}`)
        }
      }

      // Actualizar métricas de calidad
      this.updateQualityMetrics(analysis)

    } catch (error) {
      console.error(`❌ Error analizando archivo ${filePath}:`, error)
    }
  }

  /**
   * 💻 Monitoreo de sistema
   */
  private startSystemMonitoring(): void {
    // Simular métricas de sistema (en una app real sería más complejo)
    setInterval(() => {
      this.collectSystemMetrics()
    }, 10000) // Cada 10 segundos
  }

  private async collectSystemMetrics(): Promise<void> {
    const timestamp = Date.now()
    
    // Simular métricas de memoria, CPU, etc.
    const systemMetrics = [
      {
        id: 'memory_usage',
        name: 'Uso de Memoria',
        category: 'performance' as const,
        value: Math.random() * 100,
        unit: '%',
        timestamp,
        trend: 'stable' as const,
        threshold: { warning: 80, critical: 95 }
      },
      {
        id: 'cpu_usage',
        name: 'Uso de CPU',
        category: 'performance' as const,
        value: Math.random() * 100,
        unit: '%',
        timestamp,
        trend: 'stable' as const,
        threshold: { warning: 70, critical: 90 }
      },
      {
        id: 'quantum_coherence',
        name: 'Coherencia Cuántica',
        category: 'quantum' as const,
        value: Math.random() * 100,
        unit: '%',
        timestamp,
        trend: 'stable' as const,
        threshold: { warning: 30, critical: 10 }
      }
    ]

    for (const metric of systemMetrics) {
      this.addMetric(metric)
      
      // Verificar umbrales
      if (metric.threshold) {
        if (metric.value >= metric.threshold.critical) {
          this.createAlert({
            type: 'performance',
            severity: 'critical',
            title: `${metric.name} crítico`,
            description: `${metric.name} alcanzó ${metric.value.toFixed(1)}${metric.unit}`,
            source: 'system_monitor',
            recommendedActions: [`Investigar uso de ${metric.name.toLowerCase()}`],
            impact: { systems: ['system'] }
          })
        } else if (metric.value >= metric.threshold.warning) {
          this.createAlert({
            type: 'performance',
            severity: 'medium',
            title: `${metric.name} elevado`,
            description: `${metric.name} alcanzó ${metric.value.toFixed(1)}${metric.unit}`,
            source: 'system_monitor',
            recommendedActions: [`Monitorear ${metric.name.toLowerCase()}`],
            impact: { systems: ['system'] }
          })
        }
      }
    }
  }

  // Métodos de recopilación de métricas específicas
  private async collectPerformanceMetrics(): Promise<Partial<MonitoringMetric>[]> {
    return [
      {
        id: 'response_time',
        name: 'Tiempo de Respuesta',
        value: Math.random() * 1000,
        unit: 'ms'
      },
      {
        id: 'throughput',
        name: 'Throughput',
        value: Math.random() * 1000,
        unit: 'req/s'
      },
      {
        id: 'error_rate',
        name: 'Tasa de Error',
        value: Math.random() * 5,
        unit: '%'
      }
    ]
  }

  private async collectQuantumMetrics(): Promise<Partial<MonitoringMetric>[]> {
    return [
      {
        id: 'quantum_operations',
        name: 'Operaciones Cuánticas',
        value: Math.floor(Math.random() * 100),
        unit: 'ops/min'
      },
      {
        id: 'entanglement_pairs',
        name: 'Pares Entrelazados',
        value: Math.floor(Math.random() * 50),
        unit: 'pairs'
      },
      {
        id: 'decoherence_rate',
        name: 'Tasa de Decoherencia',
        value: Math.random() * 10,
        unit: '%'
      }
    ]
  }

  private async collectQualityMetrics(): Promise<Partial<MonitoringMetric>[]> {
    // En una implementación real, esto analizaría todo el codebase
    return [
      {
        id: 'code_coverage',
        name: 'Cobertura de Código',
        value: Math.random() * 100,
        unit: '%'
      },
      {
        id: 'technical_debt',
        name: 'Deuda Técnica',
        value: Math.random() * 20,
        unit: 'hours'
      },
      {
        id: 'bugs_found',
        name: 'Bugs Encontrados',
        value: Math.floor(Math.random() * 10),
        unit: 'count'
      }
    ]
  }

  private async collectSecurityMetrics(): Promise<Partial<MonitoringMetric>[]> {
    return [
      {
        id: 'vulnerabilities',
        name: 'Vulnerabilidades',
        value: Math.floor(Math.random() * 5),
        unit: 'count'
      },
      {
        id: 'security_score',
        name: 'Puntuación de Seguridad',
        value: Math.random() * 100,
        unit: 'score'
      }
    ]
  }

  private async collectBusinessMetrics(): Promise<Partial<MonitoringMetric>[]> {
    return [
      {
        id: 'active_users',
        name: 'Usuarios Activos',
        value: Math.floor(Math.random() * 1000),
        unit: 'users'
      },
      {
        id: 'transactions',
        name: 'Transacciones',
        value: Math.floor(Math.random() * 500),
        unit: 'tx/hour'
      }
    ]
  }

  // Métodos auxiliares
  private addMetrics(category: string, metrics: Partial<MonitoringMetric>[], timestamp: number): void {
    if (!this.metrics.has(category)) {
      this.metrics.set(category, [])
    }

    const categoryMetrics = this.metrics.get(category)!
    
    for (const metric of metrics) {
      const fullMetric: MonitoringMetric = {
        id: metric.id || `metric_${Date.now()}`,
        name: metric.name || 'Unknown Metric',
        category: category as any,
        value: metric.value || 0,
        unit: metric.unit || '',
        timestamp,
        trend: metric.trend || 'stable'
      }
      
      categoryMetrics.push(fullMetric)
    }

    // Mantener solo los últimos 1000 puntos por categoría
    if (categoryMetrics.length > 1000) {
      categoryMetrics.splice(0, categoryMetrics.length - 1000)
    }
  }

  private addMetric(metric: MonitoringMetric): void {
    const category = metric.category
    if (!this.metrics.has(category)) {
      this.metrics.set(category, [])
    }
    
    this.metrics.get(category)!.push(metric)
  }

  private createAlert(alertData: Omit<Alert, 'id' | 'timestamp' | 'resolved' | 'autoFixAttempted'>): string {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      resolved: false,
      autoFixAttempted: false,
      ...alertData
    }

    this.alerts.set(alert.id, alert)
    
    console.log(`🚨 Nueva alerta: ${alert.title} (${alert.severity})`)
    
    return alert.id
  }

  private async attemptAutoFix(alert: Alert): Promise<void> {
    alert.autoFixAttempted = true
    
    try {
      // Lógica de auto-corrección basada en el tipo de alerta
      console.log(`🔧 Intentando auto-corrección para: ${alert.title}`)
      
      // Simular corrección
      const success = Math.random() > 0.3 // 70% de éxito
      
      if (success) {
        this.resolveAlert(alert.id, 'Corregido automáticamente por AI')
        console.log(`✅ Alerta ${alert.id} corregida automáticamente`)
      } else {
        console.log(`❌ Auto-corrección falló para alerta ${alert.id}`)
      }
      
    } catch (error) {
      console.error(`❌ Error en auto-corrección:`, error)
    }
  }

  private escalateAlert(alert: Alert): void {
    console.log(`📢 Escalando alerta crítica: ${alert.title}`)
    
    // En una implementación real, esto enviaría notificaciones
    // Slack, email, SMS, etc.
  }

  private async checkPredictionResolution(alert: Alert): Promise<boolean> {
    // Verificar si las condiciones que llevaron a la predicción han mejorado
    return Math.random() > 0.8 // 20% de probabilidad de resolución automática
  }

  private resolveAlert(alertId: string, reason: string): void {
    const alert = this.alerts.get(alertId)
    if (alert) {
      alert.resolved = true
      console.log(`✅ Alerta resuelta: ${alert.title} - ${reason}`)
    }
  }

  private calculateSeverity(confidence: number): 'low' | 'medium' | 'high' | 'critical' {
    if (confidence >= 0.9) return 'critical'
    if (confidence >= 0.8) return 'high'
    if (confidence >= 0.6) return 'medium'
    return 'low'
  }

  private getRecentMetrics(timeWindow: number): Map<string, MonitoringMetric[]> {
    const cutoff = Date.now() - timeWindow
    const recentMetrics = new Map<string, MonitoringMetric[]>()
    
    for (const [category, metrics] of this.metrics) {
      const recent = metrics.filter(m => m.timestamp >= cutoff)
      if (recent.length > 0) {
        recentMetrics.set(category, recent)
      }
    }
    
    return recentMetrics
  }

  private updateQualityMetrics(analysis: any): void {
    // Actualizar métricas basadas en análisis de código
    const timestamp = Date.now()
    
    this.addMetric({
      id: 'issues_count',
      name: 'Problemas de Código',
      category: 'quality',
      value: analysis.issues?.length || 0,
      unit: 'count',
      timestamp,
      trend: 'stable'
    })
  }

  private initializeMetrics(): void {
    // Inicializar categorías de métricas
    this.metrics.set('performance', [])
    this.metrics.set('quantum', [])
    this.metrics.set('quality', [])
    this.metrics.set('security', [])
    this.metrics.set('business', [])
  }

  // Métodos públicos para obtener información
  public getSystemHealth(): SystemHealth {
    const now = Date.now()
    const oneHourAgo = now - 3600000
    const oneDayAgo = now - 86400000
    const oneWeekAgo = now - 604800000

    // Calcular salud por categoría
    const categories = {
      performance: this.calculateCategoryHealth('performance'),
      quantum: this.calculateCategoryHealth('quantum'),
      security: this.calculateCategoryHealth('security'),
      quality: this.calculateCategoryHealth('quality')
    }

    const overall = Object.values(categories).reduce((sum, health) => sum + health, 0) / 4

    return {
      overall,
      categories,
      trends: {
        last24h: this.calculateTrend(oneDayAgo),
        last7d: this.calculateTrend(oneWeekAgo)
      },
      predictions: {
        nextIssue: this.getNextPredictedIssue()
      }
    }
  }

  public getActiveAlerts(): Alert[] {
    return Array.from(this.alerts.values()).filter(a => !a.resolved)
  }

  public getMetrics(category?: string, timeRange?: number): MonitoringMetric[] {
    if (category) {
      const metrics = this.metrics.get(category) || []
      if (timeRange) {
        const cutoff = Date.now() - timeRange
        return metrics.filter(m => m.timestamp >= cutoff)
      }
      return metrics
    }
    
    const allMetrics = Array.from(this.metrics.values()).flat()
    if (timeRange) {
      const cutoff = Date.now() - timeRange
      return allMetrics.filter(m => m.timestamp >= cutoff)
    }
    
    return allMetrics
  }

  public getDashboardData(): MonitoringDashboard {
    return {
      systemHealth: this.getSystemHealth(),
      activeAlerts: this.getActiveAlerts(),
      recentMetrics: this.getRecentMetrics(3600000), // Última hora
      anomalies: this.anomalies.slice(-10), // Últimas 10 anomalías
      predictions: this.aiPredictor.getRecentPredictions(),
      performance: this.getPerformanceSummary()
    }
  }

  private calculateCategoryHealth(category: string): number {
    const metrics = this.metrics.get(category) || []
    if (metrics.length === 0) return 100

    const recentMetrics = metrics.slice(-10) // Últimas 10 métricas
    const alerts = Array.from(this.alerts.values()).filter(a => 
      !a.resolved && a.impact.systems.includes(category)
    )

    let health = 100
    
    // Reducir salud por alertas activas
    health -= alerts.length * 10
    
    // Reducir salud por alertas críticas
    const criticalAlerts = alerts.filter(a => a.severity === 'critical')
    health -= criticalAlerts.length * 20

    return Math.max(0, health)
  }

  private calculateTrend(fromTime: number): 'improving' | 'declining' | 'stable' {
    const alerts = Array.from(this.alerts.values()).filter(a => 
      a.timestamp >= fromTime
    )
    
    const criticalCount = alerts.filter(a => a.severity === 'critical').length
    
    if (criticalCount > 5) return 'declining'
    if (criticalCount === 0) return 'improving'
    return 'stable'
  }

  private getNextPredictedIssue(): any {
    // Simular predicción del próximo problema
    const types = ['performance', 'security', 'quantum', 'quality']
    const randomType = types[Math.floor(Math.random() * types.length)]
    
    return {
      type: randomType,
      probability: Math.random(),
      timeframe: '2-4 horas'
    }
  }

  private getPerformanceSummary(): any {
    const perfMetrics = this.metrics.get('performance') || []
    const recent = perfMetrics.slice(-10)
    
    if (recent.length === 0) return null
    
    return {
      avgResponseTime: recent.filter(m => m.id === 'response_time')
        .reduce((sum, m) => sum + m.value, 0) / recent.length || 0,
      throughput: recent.filter(m => m.id === 'throughput')
        .reduce((sum, m) => sum + m.value, 0) / recent.length || 0,
      errorRate: recent.filter(m => m.id === 'error_rate')
        .reduce((sum, m) => sum + m.value, 0) / recent.length || 0
    }
  }
}

/**
 * 🔮 Predictor AI para problemas futuros
 */
class QuantumAIPredictor {
  private predictions: any[]
  private models: Map<string, any>

  constructor() {
    this.predictions = []
    this.models = new Map()
  }

  async detectAnomalies(metrics: MonitoringMetric[]): Promise<AnomalyDetection[]> {
    const anomalies: AnomalyDetection[] = []
    
    // Detectar picos anómalos
    for (let i = 1; i < metrics.length; i++) {
      const current = metrics[i]
      const previous = metrics[i - 1]
      
      if (current.value > previous.value * 2) {
        anomalies.push({
          pattern: 'sudden_spike',
          confidence: 0.8,
          timeframe: current.timestamp - previous.timestamp,
          description: `Pico súbito en ${current.name}`,
          possibleCauses: ['Carga inesperada', 'Error en sistema', 'Ataque'],
          predictedImpact: 'Degradación de rendimiento'
        })
      }
    }
    
    return anomalies
  }

  async predictIssues(metrics: MonitoringMetric[]): Promise<any[]> {
    const predictions = []
    
    // Predicción simple basada en tendencias
    const performanceMetrics = metrics.filter(m => m.category === 'performance')
    if (performanceMetrics.length > 5) {
      const trend = this.calculateMetricTrend(performanceMetrics)
      if (trend > 0.1) {
        predictions.push({
          type: 'performance_degradation',
          probability: 0.7,
          timeframe: '1-2 horas',
          preventiveActions: ['Escalar recursos', 'Revisar logs'],
          affectedSystems: ['api', 'database'],
          estimatedImpact: 30
        })
      }
    }
    
    return predictions
  }

  getRecentPredictions(): any[] {
    return this.predictions.slice(-5)
  }

  private calculateMetricTrend(metrics: MonitoringMetric[]): number {
    if (metrics.length < 2) return 0
    
    const recent = metrics.slice(-5)
    const older = metrics.slice(-10, -5)
    
    if (older.length === 0) return 0
    
    const recentAvg = recent.reduce((sum, m) => sum + m.value, 0) / recent.length
    const olderAvg = older.reduce((sum, m) => sum + m.value, 0) / older.length
    
    return (recentAvg - olderAvg) / olderAvg
  }
}

/**
 * 📁 Simulador de FileSystemWatcher
 */
class FileSystemWatcher {
  private path: string
  private options: any
  private active: boolean

  constructor(path: string, options: any) {
    this.path = path
    this.options = options
    this.active = false
  }

  start(): void {
    this.active = true
    console.log(`👁️ Watching ${this.path}`)
  }

  stop(): void {
    this.active = false
    console.log(`👁️ Stopped watching ${this.path}`)
  }
}

// Interfaces adicionales
interface MonitoringOptions {
  interval?: number
  watchFiles?: boolean
  watchPaths?: string[]
}

interface MonitoringDashboard {
  systemHealth: SystemHealth
  activeAlerts: Alert[]
  recentMetrics: Map<string, MonitoringMetric[]>
  anomalies: AnomalyDetection[]
  predictions: any[]
  performance: any
}

export { 
  MonitoringMetric, 
  Alert, 
  AnomalyDetection, 
  SystemHealth, 
  MonitoringOptions,
  MonitoringDashboard
}