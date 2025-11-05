/**
 * 📺 Dashboard de Monitoreo AI - Interfaz visual para supervisión inteligente
 * Panel de control en tiempo real con métricas, alertas y análisis predictivo
 */

import { QuantumSmartMonitor, MonitoringDashboard, Alert, SystemHealth } from './quantum-smart-monitor'
import { QuantumAIAnalyzer } from './quantum-ai-analyzer'
import { QuantumAutoFixer } from './quantum-auto-fixer'

interface DashboardWidget {
  id: string
  type: 'metric' | 'chart' | 'alert' | 'status' | 'prediction' | 'quantum'
  title: string
  size: 'small' | 'medium' | 'large'
  position: { x: number; y: number }
  config: any
  data?: any
}

interface DashboardTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
    background: string
    text: string
    quantum: string
  }
}

export class QuantumDashboard {
  private monitor: QuantumSmartMonitor
  private widgets: Map<string, DashboardWidget>
  private theme: DashboardTheme
  private container: HTMLElement | null
  private updateInterval: NodeJS.Timeout | null
  private isInitialized: boolean

  constructor(monitor: QuantumSmartMonitor, container?: HTMLElement) {
    this.monitor = monitor
    this.widgets = new Map()
    this.theme = this.getDefaultTheme()
    this.container = container || null
    this.updateInterval = null
    this.isInitialized = false

    console.log('📺 Quantum Dashboard inicializado')
  }

  /**
   * 🚀 Inicializar dashboard
   */
  public async initialize(containerId?: string): Promise<void> {
    if (this.isInitialized) return

    console.log('🚀 Inicializando dashboard...')

    // Crear o encontrar contenedor
    if (containerId) {
      this.container = document.getElementById(containerId)
    }
    
    if (!this.container) {
      this.container = this.createContainer()
      document.body.appendChild(this.container)
    }

    // Aplicar estilos
    this.applyStyles()

    // Crear widgets por defecto
    this.createDefaultWidgets()

    // Iniciar actualizaciones automáticas
    this.startAutoUpdate()

    this.isInitialized = true
    console.log('✅ Dashboard inicializado')
  }

  /**
   * 📊 Crear widgets por defecto
   */
  private createDefaultWidgets(): void {
    const defaultWidgets: DashboardWidget[] = [
      // Widget de salud del sistema
      {
        id: 'system_health',
        type: 'status',
        title: 'Salud del Sistema',
        size: 'large',
        position: { x: 0, y: 0 },
        config: {
          showOverall: true,
          showCategories: true,
          showTrends: true
        }
      },
      
      // Métricas de rendimiento
      {
        id: 'performance_metrics',
        type: 'chart',
        title: 'Rendimiento en Tiempo Real',
        size: 'medium',
        position: { x: 1, y: 0 },
        config: {
          metrics: ['response_time', 'throughput', 'error_rate'],
          timeRange: 3600000, // 1 hora
          chartType: 'line'
        }
      },

      // Métricas cuánticas
      {
        id: 'quantum_metrics',
        type: 'quantum',
        title: 'Estado Cuántico',
        size: 'medium',
        position: { x: 0, y: 1 },
        config: {
          showCoherence: true,
          showEntanglement: true,
          showOperations: true,
          animation: true
        }
      },

      // Alertas activas
      {
        id: 'active_alerts',
        type: 'alert',
        title: 'Alertas Activas',
        size: 'medium',
        position: { x: 1, y: 1 },
        config: {
          maxAlerts: 10,
          groupBySeverity: true,
          showActions: true
        }
      },

      // Predicciones AI
      {
        id: 'ai_predictions',
        type: 'prediction',
        title: 'Predicciones AI',
        size: 'large',
        position: { x: 0, y: 2 },
        config: {
          showProbability: true,
          showTimeframe: true,
          showPreventive: true
        }
      },

      // Métricas de seguridad
      {
        id: 'security_status',
        type: 'metric',
        title: 'Estado de Seguridad',
        size: 'small',
        position: { x: 2, y: 0 },
        config: {
          metric: 'security_score',
          showTrend: true,
          threshold: { warning: 70, critical: 50 }
        }
      }
    ]

    for (const widget of defaultWidgets) {
      this.addWidget(widget)
    }
  }

  /**
   * ➕ Agregar widget al dashboard
   */
  public addWidget(widget: DashboardWidget): void {
    this.widgets.set(widget.id, widget)
    
    if (this.container) {
      const widgetElement = this.createWidgetElement(widget)
      this.container.appendChild(widgetElement)
    }
  }

  /**
   * 🖼️ Crear elemento visual del widget
   */
  private createWidgetElement(widget: DashboardWidget): HTMLElement {
    const element = document.createElement('div')
    element.id = `widget-${widget.id}`
    element.className = `dashboard-widget widget-${widget.type} widget-${widget.size}`
    
    // Header del widget
    const header = document.createElement('div')
    header.className = 'widget-header'
    header.innerHTML = `
      <h3>${widget.title}</h3>
      <div class="widget-actions">
        <button onclick="refreshWidget('${widget.id}')">🔄</button>
        <button onclick="configureWidget('${widget.id}')">⚙️</button>
      </div>
    `
    
    // Contenido del widget
    const content = document.createElement('div')
    content.className = 'widget-content'
    content.id = `widget-content-${widget.id}`
    
    element.appendChild(header)
    element.appendChild(content)
    
    // Aplicar posición del grid
    element.style.gridColumn = `${widget.position.x + 1}`
    element.style.gridRow = `${widget.position.y + 1}`
    
    // Renderizar contenido inicial
    this.renderWidget(widget)
    
    return element
  }

  /**
   * 🎨 Renderizar contenido del widget
   */
  private async renderWidget(widget: DashboardWidget): Promise<void> {
    const contentElement = document.getElementById(`widget-content-${widget.id}`)
    if (!contentElement) return

    try {
      switch (widget.type) {
        case 'status':
          await this.renderStatusWidget(contentElement, widget)
          break
        case 'chart':
          await this.renderChartWidget(contentElement, widget)
          break
        case 'alert':
          await this.renderAlertWidget(contentElement, widget)
          break
        case 'metric':
          await this.renderMetricWidget(contentElement, widget)
          break
        case 'prediction':
          await this.renderPredictionWidget(contentElement, widget)
          break
        case 'quantum':
          await this.renderQuantumWidget(contentElement, widget)
          break
      }
    } catch (error) {
      console.error(`Error renderizando widget ${widget.id}:`, error)
      contentElement.innerHTML = `<div class="error">Error cargando widget</div>`
    }
  }

  /**
   * 📊 Renderizar widget de estado del sistema
   */
  private async renderStatusWidget(element: HTMLElement, widget: DashboardWidget): Promise<void> {
    const health = this.monitor.getSystemHealth()
    
    const healthColor = this.getHealthColor(health.overall)
    
    element.innerHTML = `
      <div class="system-health">
        <div class="overall-health">
          <div class="health-circle" style="border-color: ${healthColor}">
            <span class="health-score">${health.overall.toFixed(0)}%</span>
            <span class="health-label">Salud General</span>
          </div>
        </div>
        
        <div class="category-health">
          ${Object.entries(health.categories).map(([category, score]) => `
            <div class="category-item">
              <span class="category-name">${this.getCategoryName(category)}</span>
              <div class="progress-bar">
                <div class="progress-fill" 
                     style="width: ${score}%; background-color: ${this.getHealthColor(score)}">
                </div>
              </div>
              <span class="category-score">${score.toFixed(0)}%</span>
            </div>
          `).join('')}
        </div>
        
        <div class="trends">
          <div class="trend-item">
            <span>24h:</span>
            <span class="trend ${health.trends.last24h}">${this.getTrendIcon(health.trends.last24h)} ${health.trends.last24h}</span>
          </div>
          <div class="trend-item">
            <span>7d:</span>
            <span class="trend ${health.trends.last7d}">${this.getTrendIcon(health.trends.last7d)} ${health.trends.last7d}</span>
          </div>
        </div>
        
        ${health.predictions.nextIssue ? `
          <div class="next-prediction">
            <strong>Próximo problema predicho:</strong>
            <span>${health.predictions.nextIssue.type} (${(health.predictions.nextIssue.probability * 100).toFixed(0)}%)</span>
          </div>
        ` : ''}
      </div>
    `
  }

  /**
   * 📈 Renderizar widget de gráfico
   */
  private async renderChartWidget(element: HTMLElement, widget: DashboardWidget): Promise<void> {
    const metrics = this.monitor.getMetrics('performance', widget.config.timeRange)
    
    // Crear gráfico simple con ASCII art para demostración
    element.innerHTML = `
      <div class="chart-container">
        <div class="chart-metrics">
          ${widget.config.metrics.map((metricId: string) => {
            const metricData = metrics.filter(m => m.id === metricId).slice(-20)
            const latest = metricData[metricData.length - 1]
            
            return `
              <div class="metric-row">
                <span class="metric-name">${this.getMetricName(metricId)}</span>
                <span class="metric-value">${latest ? latest.value.toFixed(1) : '---'} ${latest ? latest.unit : ''}</span>
                <div class="mini-chart">
                  ${this.createMiniChart(metricData)}
                </div>
              </div>
            `
          }).join('')}
        </div>
        
        <div class="chart-timeline">
          ${this.createTimelineChart(metrics, widget.config.metrics)}
        </div>
      </div>
    `
  }

  /**
   * 🚨 Renderizar widget de alertas
   */
  private async renderAlertWidget(element: HTMLElement, widget: DashboardWidget): Promise<void> {
    const alerts = this.monitor.getActiveAlerts().slice(0, widget.config.maxAlerts)
    
    if (alerts.length === 0) {
      element.innerHTML = `
        <div class="no-alerts">
          <span class="success-icon">✅</span>
          <p>No hay alertas activas</p>
        </div>
      `
      return
    }

    element.innerHTML = `
      <div class="alerts-container">
        ${alerts.map(alert => `
          <div class="alert-item alert-${alert.severity}">
            <div class="alert-header">
              <span class="alert-icon">${this.getAlertIcon(alert.severity)}</span>
              <span class="alert-title">${alert.title}</span>
              <span class="alert-time">${this.formatTime(alert.timestamp)}</span>
            </div>
            <div class="alert-description">${alert.description}</div>
            <div class="alert-source">Fuente: ${alert.source}</div>
            ${alert.recommendedActions.length > 0 ? `
              <div class="alert-actions">
                <strong>Acciones recomendadas:</strong>
                <ul>
                  ${alert.recommendedActions.map(action => `<li>${action}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <div class="alert-controls">
              <button onclick="resolveAlert('${alert.id}')" class="btn-resolve">Resolver</button>
              ${!alert.autoFixAttempted ? `
                <button onclick="autoFixAlert('${alert.id}')" class="btn-autofix">Auto-Fix</button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `
  }

  /**
   * 🔮 Renderizar widget de predicciones
   */
  private async renderPredictionWidget(element: HTMLElement, widget: DashboardWidget): Promise<void> {
    // Simular datos de predicción
    const predictions = [
      {
        type: 'Degradación de Rendimiento',
        probability: 0.73,
        timeframe: '2-4 horas',
        preventiveActions: ['Escalar recursos', 'Optimizar consultas DB'],
        confidence: 'Alta'
      },
      {
        type: 'Problema de Memoria',
        probability: 0.45,
        timeframe: '6-8 horas',
        preventiveActions: ['Revisar memory leaks', 'Reiniciar servicios'],
        confidence: 'Media'
      },
      {
        type: 'Vulnerabilidad de Seguridad',
        probability: 0.28,
        timeframe: '1-2 días',
        preventiveActions: ['Actualizar dependencias', 'Revisar configuración'],
        confidence: 'Baja'
      }
    ]

    element.innerHTML = `
      <div class="predictions-container">
        ${predictions.map((pred, index) => `
          <div class="prediction-item confidence-${pred.confidence.toLowerCase()}">
            <div class="prediction-header">
              <span class="prediction-type">${pred.type}</span>
              <span class="prediction-probability">${(pred.probability * 100).toFixed(0)}%</span>
            </div>
            <div class="prediction-details">
              <div class="prediction-timeframe">
                <strong>Tiempo estimado:</strong> ${pred.timeframe}
              </div>
              <div class="prediction-confidence">
                <strong>Confianza:</strong> ${pred.confidence}
              </div>
            </div>
            <div class="prediction-actions">
              <strong>Acciones preventivas:</strong>
              <ul>
                ${pred.preventiveActions.map(action => `<li>${action}</li>`).join('')}
              </ul>
            </div>
            <div class="prediction-controls">
              <button onclick="schedulePrevention(${index})" class="btn-schedule">Programar</button>
              <button onclick="dismissPrediction(${index})" class="btn-dismiss">Descartar</button>
            </div>
          </div>
        `).join('')}
      </div>
    `
  }

  /**
   * ⚛️ Renderizar widget cuántico
   */
  private async renderQuantumWidget(element: HTMLElement, widget: DashboardWidget): Promise<void> {
    const quantumMetrics = this.monitor.getMetrics('quantum', 300000) // Últimos 5 minutos
    
    const coherence = quantumMetrics.find(m => m.id === 'quantum_coherence')?.value || 0
    const entanglement = quantumMetrics.find(m => m.id === 'entanglement_pairs')?.value || 0
    const operations = quantumMetrics.find(m => m.id === 'quantum_operations')?.value || 0

    element.innerHTML = `
      <div class="quantum-container">
        <div class="quantum-visualization">
          <div class="quantum-particle" style="animation-duration: ${2 - (coherence / 100)}s">
            <div class="particle-core"></div>
            <div class="particle-orbit"></div>
          </div>
        </div>
        
        <div class="quantum-metrics">
          <div class="quantum-metric">
            <span class="metric-label">Coherencia</span>
            <div class="quantum-bar">
              <div class="quantum-fill" style="width: ${coherence}%; background: linear-gradient(90deg, #ff4081, #9c27b0)"></div>
            </div>
            <span class="metric-value">${coherence.toFixed(1)}%</span>
          </div>
          
          <div class="quantum-metric">
            <span class="metric-label">Entrelazamiento</span>
            <span class="metric-value">${entanglement} pares</span>
            <div class="entanglement-visual">
              ${Array.from({length: Math.min(entanglement, 10)}, (_, i) => `
                <span class="entangled-pair">⚛️</span>
              `).join('')}
            </div>
          </div>
          
          <div class="quantum-metric">
            <span class="metric-label">Operaciones/min</span>
            <span class="metric-value">${operations}</span>
            <div class="operations-chart">
              ${this.createQuantumOperationsChart(quantumMetrics)}
            </div>
          </div>
        </div>

        <div class="quantum-status">
          <div class="status-indicator ${this.getQuantumStatus(coherence)}">
            <span class="status-dot"></span>
            <span class="status-text">${this.getQuantumStatusText(coherence)}</span>
          </div>
        </div>
      </div>
    `
  }

  /**
   * 📊 Renderizar widget de métrica individual
   */
  private async renderMetricWidget(element: HTMLElement, widget: DashboardWidget): Promise<void> {
    const metrics = this.monitor.getMetrics(undefined, 3600000) // Última hora
    const metricData = metrics.filter(m => m.id === widget.config.metric)
    const latest = metricData[metricData.length - 1]
    
    if (!latest) {
      element.innerHTML = `<div class="no-data">No hay datos disponibles</div>`
      return
    }

    const trend = this.calculateTrend(metricData.slice(-10))
    const trendIcon = trend > 0 ? '📈' : trend < 0 ? '📉' : '➡️'
    const trendClass = trend > 0 ? 'trend-up' : trend < 0 ? 'trend-down' : 'trend-stable'

    element.innerHTML = `
      <div class="metric-widget">
        <div class="metric-value-large">
          ${latest.value.toFixed(1)}
          <span class="metric-unit">${latest.unit}</span>
        </div>
        
        <div class="metric-trend ${trendClass}">
          <span class="trend-icon">${trendIcon}</span>
          <span class="trend-text">${Math.abs(trend).toFixed(1)}% vs anterior</span>
        </div>
        
        <div class="metric-miniChart">
          ${this.createMiniChart(metricData.slice(-20))}
        </div>
        
        ${widget.config.threshold ? `
          <div class="metric-thresholds">
            <div class="threshold-bar">
              <div class="threshold-warning" style="left: ${widget.config.threshold.warning}%"></div>
              <div class="threshold-critical" style="left: ${widget.config.threshold.critical}%"></div>
              <div class="threshold-current" style="left: ${Math.min(latest.value, 100)}%"></div>
            </div>
          </div>
        ` : ''}
      </div>
    `
  }

  /**
   * 🔄 Actualizar todos los widgets
   */
  private async updateAllWidgets(): Promise<void> {
    for (const widget of this.widgets.values()) {
      await this.renderWidget(widget)
    }
  }

  /**
   * ⏰ Iniciar actualizaciones automáticas
   */
  private startAutoUpdate(): void {
    this.updateInterval = setInterval(() => {
      this.updateAllWidgets()
    }, 5000) // Actualizar cada 5 segundos
  }

  /**
   * ⏹️ Detener actualizaciones automáticas
   */
  public stopAutoUpdate(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  // Métodos auxiliares para renderizado

  private createContainer(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'quantum-dashboard'
    container.className = 'dashboard-container'
    return container
  }

  private applyStyles(): void {
    if (!document.getElementById('dashboard-styles')) {
      const styles = document.createElement('style')
      styles.id = 'dashboard-styles'
      styles.textContent = this.getDashboardCSS()
      document.head.appendChild(styles)
    }
  }

  private getDashboardCSS(): string {
    return `
      .dashboard-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 20px;
        padding: 20px;
        background: ${this.theme.colors.background};
        color: ${this.theme.colors.text};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        min-height: 100vh;
      }

      .dashboard-widget {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease;
      }

      .dashboard-widget:hover {
        transform: translateY(-5px);
      }

      .widget-small { grid-column: span 1; grid-row: span 1; }
      .widget-medium { grid-column: span 2; grid-row: span 1; }
      .widget-large { grid-column: span 3; grid-row: span 2; }

      .widget-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 8px;
      }

      .widget-header h3 {
        margin: 0;
        color: ${this.theme.colors.primary};
        font-size: 1.2em;
      }

      .widget-actions button {
        background: none;
        border: none;
        color: ${this.theme.colors.text};
        cursor: pointer;
        margin-left: 8px;
        opacity: 0.7;
        transition: opacity 0.3s;
      }

      .widget-actions button:hover {
        opacity: 1;
      }

      .system-health {
        text-align: center;
      }

      .health-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 4px solid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto 20px;
        position: relative;
      }

      .health-score {
        font-size: 2em;
        font-weight: bold;
      }

      .health-label {
        font-size: 0.8em;
        opacity: 0.8;
      }

      .category-health {
        margin: 20px 0;
      }

      .category-item {
        display: flex;
        align-items: center;
        margin: 8px 0;
        gap: 10px;
      }

      .category-name {
        width: 100px;
        text-align: left;
        font-size: 0.9em;
      }

      .progress-bar {
        flex: 1;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        transition: width 0.5s ease;
      }

      .category-score {
        width: 40px;
        text-align: right;
        font-size: 0.9em;
      }

      .alert-item {
        margin: 10px 0;
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid;
      }

      .alert-critical { border-left-color: ${this.theme.colors.error}; background: rgba(244, 67, 54, 0.1); }
      .alert-high { border-left-color: #ff9800; background: rgba(255, 152, 0, 0.1); }
      .alert-medium { border-left-color: ${this.theme.colors.warning}; background: rgba(255, 193, 7, 0.1); }
      .alert-low { border-left-color: #2196f3; background: rgba(33, 150, 243, 0.1); }

      .alert-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .alert-title {
        font-weight: bold;
        flex: 1;
        margin-left: 8px;
      }

      .alert-time {
        font-size: 0.8em;
        opacity: 0.7;
      }

      .quantum-container {
        text-align: center;
      }

      .quantum-visualization {
        margin: 20px 0;
        height: 100px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .quantum-particle {
        width: 60px;
        height: 60px;
        position: relative;
        animation: quantum-spin 2s linear infinite;
      }

      .particle-core {
        width: 20px;
        height: 20px;
        background: ${this.theme.colors.quantum};
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px ${this.theme.colors.quantum};
      }

      .particle-orbit {
        width: 100%;
        height: 100%;
        border: 2px solid rgba(156, 39, 176, 0.3);
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
      }

      @keyframes quantum-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .quantum-metric {
        margin: 15px 0;
        text-align: left;
      }

      .metric-label {
        display: block;
        font-size: 0.9em;
        opacity: 0.8;
        margin-bottom: 5px;
      }

      .quantum-bar {
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin: 5px 0;
      }

      .quantum-fill {
        height: 100%;
        transition: width 0.5s ease;
      }

      .btn-resolve, .btn-autofix, .btn-schedule, .btn-dismiss {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 4px;
        font-size: 0.8em;
        transition: all 0.3s;
      }

      .btn-resolve {
        background: ${this.theme.colors.success};
        color: white;
      }

      .btn-autofix {
        background: ${this.theme.colors.primary};
        color: white;
      }

      .btn-schedule {
        background: ${this.theme.colors.warning};
        color: black;
      }

      .btn-dismiss {
        background: rgba(255, 255, 255, 0.1);
        color: ${this.theme.colors.text};
      }

      .trend-up { color: ${this.theme.colors.success}; }
      .trend-down { color: ${this.theme.colors.error}; }
      .trend-stable { color: ${this.theme.colors.text}; }

      .no-alerts {
        text-align: center;
        padding: 40px;
        opacity: 0.7;
      }

      .success-icon {
        font-size: 3em;
        display: block;
        margin-bottom: 10px;
      }
    `
  }

  private getDefaultTheme(): DashboardTheme {
    return {
      name: 'Quantum Dark',
      colors: {
        primary: '#bb86fc',
        secondary: '#03dac6',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        text: '#ffffff',
        quantum: '#9c27b0'
      }
    }
  }

  // Métodos auxiliares
  private getHealthColor(health: number): string {
    if (health >= 80) return this.theme.colors.success
    if (health >= 60) return this.theme.colors.warning
    return this.theme.colors.error
  }

  private getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
      performance: 'Rendimiento',
      quantum: 'Cuántico',
      security: 'Seguridad',
      quality: 'Calidad'
    }
    return names[category] || category
  }

  private getTrendIcon(trend: string): string {
    switch (trend) {
      case 'improving': return '📈'
      case 'declining': return '📉'
      default: return '➡️'
    }
  }

  private getAlertIcon(severity: string): string {
    switch (severity) {
      case 'critical': return '🔴'
      case 'high': return '🟠'
      case 'medium': return '🟡'
      default: return '🔵'
    }
  }

  private getMetricName(metricId: string): string {
    const names: { [key: string]: string } = {
      response_time: 'Tiempo Respuesta',
      throughput: 'Throughput',
      error_rate: 'Tasa Error',
      memory_usage: 'Uso Memoria',
      cpu_usage: 'Uso CPU'
    }
    return names[metricId] || metricId
  }

  private createMiniChart(data: any[]): string {
    if (data.length === 0) return '<span class="no-data">---</span>'
    
    const values = data.map(d => d.value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    const range = max - min || 1
    
    return values.map(value => {
      const height = ((value - min) / range) * 20 + 5
      return `<span class="chart-bar" style="height: ${height}px"></span>`
    }).join('')
  }

  private createTimelineChart(metrics: any[], metricIds: string[]): string {
    return '<div class="timeline-placeholder">📊 Gráfico de timeline aquí</div>'
  }

  private createQuantumOperationsChart(metrics: any[]): string {
    return '<div class="quantum-chart-placeholder">⚛️ Operaciones cuánticas</div>'
  }

  private formatTime(timestamp: number): string {
    const now = Date.now()
    const diff = now - timestamp
    
    if (diff < 60000) return 'hace instantes'
    if (diff < 3600000) return `hace ${Math.floor(diff / 60000)}m`
    if (diff < 86400000) return `hace ${Math.floor(diff / 3600000)}h`
    return `hace ${Math.floor(diff / 86400000)}d`
  }

  private getQuantumStatus(coherence: number): string {
    if (coherence >= 80) return 'optimal'
    if (coherence >= 50) return 'stable'
    if (coherence >= 20) return 'degraded'
    return 'critical'
  }

  private getQuantumStatusText(coherence: number): string {
    if (coherence >= 80) return 'Óptimo'
    if (coherence >= 50) return 'Estable'
    if (coherence >= 20) return 'Degradado'
    return 'Crítico'
  }

  private calculateTrend(data: any[]): number {
    if (data.length < 2) return 0
    
    const recent = data.slice(-3)
    const older = data.slice(-6, -3)
    
    if (older.length === 0) return 0
    
    const recentAvg = recent.reduce((sum, d) => sum + d.value, 0) / recent.length
    const olderAvg = older.reduce((sum, d) => sum + d.value, 0) / older.length
    
    return ((recentAvg - olderAvg) / olderAvg) * 100
  }

  // Métodos públicos para interacción
  public refreshWidget(widgetId: string): void {
    const widget = this.widgets.get(widgetId)
    if (widget) {
      this.renderWidget(widget)
    }
  }

  public configureWidget(widgetId: string): void {
    console.log(`Configurando widget: ${widgetId}`)
    // Implementar modal de configuración
  }

  public setTheme(theme: DashboardTheme): void {
    this.theme = theme
    this.applyStyles()
  }

  public exportDashboard(): string {
    return JSON.stringify({
      widgets: Array.from(this.widgets.values()),
      theme: this.theme
    }, null, 2)
  }

  public importDashboard(data: string): void {
    try {
      const imported = JSON.parse(data)
      this.widgets.clear()
      
      for (const widget of imported.widgets) {
        this.addWidget(widget)
      }
      
      if (imported.theme) {
        this.setTheme(imported.theme)
      }
      
    } catch (error) {
      console.error('Error importando dashboard:', error)
    }
  }
}

// Funciones globales para interacción desde HTML
declare global {
  interface Window {
    refreshWidget: (widgetId: string) => void
    configureWidget: (widgetId: string) => void
    resolveAlert: (alertId: string) => void
    autoFixAlert: (alertId: string) => void
    schedulePrevention: (index: number) => void
    dismissPrediction: (index: number) => void
  }
}

// Exportar funciones globales
if (typeof window !== 'undefined') {
  window.refreshWidget = (widgetId: string) => {
    console.log(`Refrescando widget: ${widgetId}`)
  }
  
  window.configureWidget = (widgetId: string) => {
    console.log(`Configurando widget: ${widgetId}`)
  }
  
  window.resolveAlert = (alertId: string) => {
    console.log(`Resolviendo alerta: ${alertId}`)
  }
  
  window.autoFixAlert = (alertId: string) => {
    console.log(`Auto-fix para alerta: ${alertId}`)
  }
  
  window.schedulePrevention = (index: number) => {
    console.log(`Programando prevención: ${index}`)
  }
  
  window.dismissPrediction = (index: number) => {
    console.log(`Descartando predicción: ${index}`)
  }
}

export { DashboardWidget, DashboardTheme }