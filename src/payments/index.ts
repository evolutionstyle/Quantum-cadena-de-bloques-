/**
 * 🌟 Quantum Payment Hub - Centro unificado del ecosistema de pagos
 * Interfaz principal que integra todos los sistemas de pago cuántico
 */

import { QuantumPaymentSystem } from './quantum-payment-system'
import { QuantumTokenMarketplace } from './quantum-token-marketplace'
import { QuantumPricingEngine } from './quantum-pricing-engine'
import { QuantumSubscriptionSystem } from './quantum-subscription-system'
import { 
  setupQuantumPaymentEcosystem,
  runCompleteEcosystemDemo,
  PaymentSystemTestUtils
} from './quantum-payment-examples'

export interface QuantumPaymentConfig {
  environment: 'development' | 'staging' | 'production'
  features: {
    marketplace: boolean
    dynamicPricing: boolean
    subscriptions: boolean
    analytics: boolean
  }
  security: {
    encryptionLevel: 'basic' | 'advanced' | 'quantum'
    auditLogging: boolean
    fraudDetection: boolean
  }
  integrations: {
    externalPaymentGateways: string[]
    blockchainNetworks: string[]
    analyticsProviders: string[]
  }
}

export interface PaymentEcosystemStatus {
  initialized: boolean
  components: {
    paymentSystem: 'active' | 'inactive' | 'error'
    marketplace: 'active' | 'inactive' | 'error'
    pricingEngine: 'active' | 'inactive' | 'error'
    subscriptionSystem: 'active' | 'inactive' | 'error'
  }
  health: {
    overall: 'healthy' | 'degraded' | 'critical'
    uptime: number
    lastHealthCheck: number
  }
  metrics: {
    totalTransactions: number
    totalRevenue: number
    activeUsers: number
    systemLoad: number
  }
}

/**
 * 🎯 Clase principal del ecosistema de pagos cuánticos
 */
export class QuantumPaymentHub {
  private config: QuantumPaymentConfig
  private status: PaymentEcosystemStatus
  
  // Componentes del ecosistema
  private paymentSystem: QuantumPaymentSystem | null
  private marketplace: QuantumTokenMarketplace | null
  private pricingEngine: QuantumPricingEngine | null
  private subscriptionSystem: QuantumSubscriptionSystem | null
  
  // Control del sistema
  private isInitialized: boolean
  private healthCheckInterval: any

  constructor(config?: Partial<QuantumPaymentConfig>) {
    this.config = this.mergeConfig(config)
    this.status = this.initializeStatus()
    
    // Componentes no inicializados
    this.paymentSystem = null
    this.marketplace = null
    this.pricingEngine = null
    this.subscriptionSystem = null
    
    this.isInitialized = false
    this.healthCheckInterval = null

    console.log('🌟 Quantum Payment Hub creado')
    console.log(`   Entorno: ${this.config.environment}`)
    console.log(`   Características habilitadas:`)
    console.log(`     - Marketplace: ${this.config.features.marketplace ? '✅' : '❌'}`)
    console.log(`     - Precios dinámicos: ${this.config.features.dynamicPricing ? '✅' : '❌'}`)
    console.log(`     - Suscripciones: ${this.config.features.subscriptions ? '✅' : '❌'}`)
    console.log(`     - Analytics: ${this.config.features.analytics ? '✅' : '❌'}`)
  }

  /**
   * 🚀 Inicializar ecosistema completo
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('⚠️ Ecosistema ya está inicializado')
      return
    }

    console.log('🚀 Inicializando Quantum Payment Hub...')
    console.log('═'.repeat(50))

    try {
      this.status.components.paymentSystem = 'inactive'
      this.status.components.marketplace = 'inactive'
      this.status.components.pricingEngine = 'inactive'
      this.status.components.subscriptionSystem = 'inactive'

      // 1. Inicializar sistema de pagos principal (siempre requerido)
      console.log('💳 Inicializando sistema de pagos principal...')
      this.paymentSystem = new QuantumPaymentSystem()
      await this.paymentSystem.initialize()
      this.status.components.paymentSystem = 'active'
      console.log('✅ Sistema de pagos activo')

      // 2. Inicializar motor de precios (si está habilitado)
      if (this.config.features.dynamicPricing) {
        console.log('💰 Inicializando motor de precios dinámicos...')
        this.pricingEngine = new QuantumPricingEngine(this.paymentSystem)
        await this.pricingEngine.initialize()
        this.status.components.pricingEngine = 'active'
        console.log('✅ Motor de precios activo')
      }

      // 3. Inicializar marketplace (si está habilitado)
      if (this.config.features.marketplace) {
        console.log('📈 Inicializando marketplace de tokens...')
        this.marketplace = new QuantumTokenMarketplace(this.paymentSystem)
        await this.marketplace.initialize()
        this.status.components.marketplace = 'active'
        console.log('✅ Marketplace activo')
      }

      // 4. Inicializar sistema de suscripciones (si está habilitado)
      if (this.config.features.subscriptions && this.pricingEngine) {
        console.log('🔄 Inicializando sistema de suscripciones...')
        this.subscriptionSystem = new QuantumSubscriptionSystem(this.paymentSystem, this.pricingEngine)
        await this.subscriptionSystem.initialize()
        this.status.components.subscriptionSystem = 'active'
        console.log('✅ Sistema de suscripciones activo')
      }

      // 5. Iniciar monitoreo de salud
      this.startHealthMonitoring()

      // 6. Marcar como inicializado
      this.isInitialized = true
      this.status.initialized = true
      this.status.health.overall = 'healthy'
      this.status.health.lastHealthCheck = Date.now()

      console.log('═'.repeat(50))
      console.log('🎉 Quantum Payment Hub inicializado exitosamente!')
      console.log(`📊 Componentes activos: ${this.getActiveComponentsCount()}/4`)
      console.log(`🔧 Entorno: ${this.config.environment}`)
      console.log(`⚡ Estado: ${this.status.health.overall}`)

    } catch (error) {
      console.error('❌ Error inicializando Quantum Payment Hub:', error)
      this.status.health.overall = 'critical'
      throw error
    }
  }

  /**
   * 💳 Procesamiento de pagos unificado
   */
  public async processPayment(request: {
    type: 'token_purchase' | 'service_payment' | 'subscription_payment' | 'marketplace_trade'
    userId: string
    amount: number
    currency: string
    paymentMethod: string
    metadata?: any
  }): Promise<{
    success: boolean
    transactionId: string
    details: any
    error?: string
  }> {
    this.ensureInitialized()

    console.log(`💳 Procesando pago: ${request.type} por ${request.amount} ${request.currency}`)

    try {
      switch (request.type) {
        case 'token_purchase':
          return await this.processTokenPurchase(request)
        
        case 'service_payment':
          return await this.processServicePayment(request)
        
        case 'subscription_payment':
          return await this.processSubscriptionPayment(request)
        
        case 'marketplace_trade':
          return await this.processMarketplaceTrade(request)
        
        default:
          throw new Error(`Tipo de pago no soportado: ${request.type}`)
      }

    } catch (error) {
      console.error('❌ Error procesando pago:', error)
      return {
        success: false,
        transactionId: '',
        details: {},
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }

  /**
   * 📊 Obtener estado completo del ecosistema
   */
  public getEcosystemStatus(): PaymentEcosystemStatus {
    if (this.isInitialized) {
      this.updateMetrics()
    }
    return { ...this.status }
  }

  /**
   * 🎯 Obtener servicios disponibles por categoría
   */
  public getAvailableServices(): {
    payments: string[]
    marketplace: string[]
    pricing: string[]
    subscriptions: string[]
  } {
    this.ensureInitialized()

    return {
      payments: [
        'purchaseTokens',
        'payForService',
        'getTransactionHistory',
        'getUserTokenBalance'
      ],
      marketplace: this.marketplace ? [
        'createOrder',
        'swapTokens',
        'addLiquidity',
        'getOrderBook',
        'getMarketData'
      ] : [],
      pricing: this.pricingEngine ? [
        'calculateServicePrice',
        'updateServiceDemand',
        'createServiceAuction',
        'getAllServicePrices'
      ] : [],
      subscriptions: this.subscriptionSystem ? [
        'createSubscription',
        'updateSubscription',
        'cancelSubscription',
        'recordServiceUsage'
      ] : []
    }
  }

  /**
   * 📈 Generar reporte unificado de analytics
   */
  public async generateUnifiedAnalytics(period?: {
    start: number
    end: number
  }): Promise<{
    period: { start: number; end: number }
    ecosystem: {
      totalRevenue: number
      totalTransactions: number
      activeUsers: number
      growthRate: number
    }
    components: {
      payments?: any
      marketplace?: any
      pricing?: any
      subscriptions?: any
    }
    insights: string[]
    recommendations: string[]
  }> {
    this.ensureInitialized()

    console.log('📊 Generando analytics unificados del ecosistema...')

    const defaultPeriod = {
      start: period?.start || Date.now() - (7 * 24 * 60 * 60 * 1000),
      end: period?.end || Date.now()
    }

    const analytics = {
      period: defaultPeriod,
      ecosystem: {
        totalRevenue: 0,
        totalTransactions: 0,
        activeUsers: 0,
        growthRate: 0
      },
      components: {} as any,
      insights: [] as string[],
      recommendations: [] as string[]
    }

    try {
      // Analytics del sistema de pagos
      if (this.paymentSystem) {
        const paymentAnalytics = await this.paymentSystem.generatePaymentAnalytics(defaultPeriod)
        analytics.components.payments = paymentAnalytics
        analytics.ecosystem.totalRevenue += paymentAnalytics.revenue.total
        analytics.ecosystem.totalTransactions += paymentAnalytics.transactions.total
        analytics.ecosystem.activeUsers = Math.max(analytics.ecosystem.activeUsers, paymentAnalytics.users.active)
      }

      // Analytics del marketplace
      if (this.marketplace) {
        const marketAnalytics = await this.marketplace.generateMarketplaceAnalytics(defaultPeriod.start, defaultPeriod.end)
        analytics.components.marketplace = marketAnalytics
        analytics.ecosystem.totalRevenue += marketAnalytics.trading.totalVolume * 0.002 // Fee estimado
        analytics.ecosystem.totalTransactions += marketAnalytics.trading.totalTrades
        analytics.ecosystem.activeUsers = Math.max(analytics.ecosystem.activeUsers, marketAnalytics.users.activeTraders)
      }

      // Analytics de precios
      if (this.pricingEngine) {
        const pricingAnalytics = await this.pricingEngine.generatePricingAnalytics(defaultPeriod)
        analytics.components.pricing = pricingAnalytics
        analytics.ecosystem.totalRevenue += pricingAnalytics.revenue.total
        analytics.recommendations.push(...pricingAnalytics.recommendations)
      }

      // Analytics de suscripciones
      if (this.subscriptionSystem) {
        const subscriptionAnalytics = await this.subscriptionSystem.getSubscriptionAnalytics(defaultPeriod)
        analytics.components.subscriptions = subscriptionAnalytics
        analytics.ecosystem.totalRevenue += subscriptionAnalytics.revenue.total
        analytics.ecosystem.activeUsers = Math.max(analytics.ecosystem.activeUsers, subscriptionAnalytics.subscriptions.active)
        analytics.ecosystem.growthRate = Math.max(analytics.ecosystem.growthRate, subscriptionAnalytics.forecasts.growthRate)
      }

      // Generar insights
      analytics.insights = this.generateEcosystemInsights(analytics)

      console.log(`✅ Analytics generados`)
      console.log(`   Revenue total: ${analytics.ecosystem.totalRevenue.toFixed(2)}`)
      console.log(`   Transacciones: ${analytics.ecosystem.totalTransactions}`)
      console.log(`   Usuarios activos: ${analytics.ecosystem.activeUsers}`)

      return analytics

    } catch (error) {
      console.error('❌ Error generando analytics unificados:', error)
      throw error
    }
  }

  /**
   * 🧪 Ejecutar demo del ecosistema
   */
  public async runDemo(): Promise<void> {
    this.ensureInitialized()
    
    console.log('🎬 Ejecutando demo del Quantum Payment Hub...')
    await runCompleteEcosystemDemo()
  }

  /**
   * 🧪 Ejecutar pruebas del sistema
   */
  public async runSystemTests(): Promise<{
    passed: number
    failed: number
    results: Array<{
      test: string
      status: 'passed' | 'failed'
      details?: string
    }>
  }> {
    this.ensureInitialized()

    console.log('🧪 Ejecutando pruebas del sistema...')
    
    const tests = []
    let passed = 0
    let failed = 0

    try {
      // Test 1: Verificar salud del sistema
      console.log('   🏥 Test: Verificación de salud del sistema')
      const healthCheck = await PaymentSystemTestUtils.checkSystemHealth({
        paymentSystem: this.paymentSystem!,
        marketplace: this.marketplace!,
        pricingEngine: this.pricingEngine!,
        subscriptionSystem: this.subscriptionSystem!
      })
      
      if (healthCheck.healthy) {
        tests.push({ test: 'Verificación de salud', status: 'passed' as const })
        passed++
      } else {
        tests.push({ test: 'Verificación de salud', status: 'failed' as const, details: 'Sistema no saludable' })
        failed++
      }

      // Test 2: Simular transacciones
      console.log('   💳 Test: Simulación de transacciones')
      await PaymentSystemTestUtils.simulateTransactions(this.paymentSystem!, 5)
      tests.push({ test: 'Simulación de transacciones', status: 'passed' as const })
      passed++

      // Test 3: Verificar componentes activos
      console.log('   🔧 Test: Verificación de componentes')
      const activeComponents = this.getActiveComponentsCount()
      const expectedComponents = Object.values(this.config.features).filter(Boolean).length + 1 // +1 por payment system
      
      if (activeComponents >= expectedComponents) {
        tests.push({ test: 'Verificación de componentes', status: 'passed' as const })
        passed++
      } else {
        tests.push({ test: 'Verificación de componentes', status: 'failed' as const, details: `${activeComponents}/${expectedComponents} activos` })
        failed++
      }

      console.log(`✅ Pruebas completadas: ${passed} exitosas, ${failed} fallidas`)

    } catch (error) {
      console.error('❌ Error en pruebas del sistema:', error)
      tests.push({ test: 'Error general', status: 'failed' as const, details: error instanceof Error ? error.message : 'Error desconocido' })
      failed++
    }

    return { passed, failed, results: tests }
  }

  /**
   * ⏹️ Cerrar ecosistema completo
   */
  public async shutdown(): Promise<void> {
    console.log('⏹️ Cerrando Quantum Payment Hub...')

    try {
      // Detener monitoreo de salud
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval)
        this.healthCheckInterval = null
      }

      // Cerrar componentes en orden inverso
      if (this.subscriptionSystem) {
        await this.subscriptionSystem.shutdown()
        this.status.components.subscriptionSystem = 'inactive'
      }

      if (this.marketplace) {
        await this.marketplace.shutdown()
        this.status.components.marketplace = 'inactive'
      }

      if (this.pricingEngine) {
        await this.pricingEngine.shutdown()
        this.status.components.pricingEngine = 'inactive'
      }

      if (this.paymentSystem) {
        await this.paymentSystem.shutdown()
        this.status.components.paymentSystem = 'inactive'
      }

      // Marcar como no inicializado
      this.isInitialized = false
      this.status.initialized = false
      this.status.health.overall = 'critical'

      console.log('✅ Quantum Payment Hub cerrado exitosamente')

    } catch (error) {
      console.error('❌ Error cerrando Quantum Payment Hub:', error)
      throw error
    }
  }

  // Métodos privados

  private mergeConfig(userConfig?: Partial<QuantumPaymentConfig>): QuantumPaymentConfig {
    const defaultConfig: QuantumPaymentConfig = {
      environment: 'development',
      features: {
        marketplace: true,
        dynamicPricing: true,
        subscriptions: true,
        analytics: true
      },
      security: {
        encryptionLevel: 'advanced',
        auditLogging: true,
        fraudDetection: true
      },
      integrations: {
        externalPaymentGateways: ['stripe', 'paypal'],
        blockchainNetworks: ['ethereum', 'bitcoin'],
        analyticsProviders: ['internal']
      }
    }

    return {
      ...defaultConfig,
      ...userConfig,
      features: { ...defaultConfig.features, ...userConfig?.features },
      security: { ...defaultConfig.security, ...userConfig?.security },
      integrations: { ...defaultConfig.integrations, ...userConfig?.integrations }
    }
  }

  private initializeStatus(): PaymentEcosystemStatus {
    return {
      initialized: false,
      components: {
        paymentSystem: 'inactive',
        marketplace: 'inactive',
        pricingEngine: 'inactive',
        subscriptionSystem: 'inactive'
      },
      health: {
        overall: 'critical',
        uptime: 0,
        lastHealthCheck: 0
      },
      metrics: {
        totalTransactions: 0,
        totalRevenue: 0,
        activeUsers: 0,
        systemLoad: 0
      }
    }
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('Quantum Payment Hub no está inicializado. Llamar initialize() primero.')
    }
  }

  private getActiveComponentsCount(): number {
    return Object.values(this.status.components).filter(status => status === 'active').length
  }

  private startHealthMonitoring(): void {
    console.log('🏥 Iniciando monitoreo de salud del ecosistema...')
    
    this.healthCheckInterval = setInterval(() => {
      this.performHealthCheck()
    }, 60000) // Cada minuto
  }

  private performHealthCheck(): void {
    try {
      const activeComponents = this.getActiveComponentsCount()
      const totalComponents = 4

      if (activeComponents === totalComponents) {
        this.status.health.overall = 'healthy'
      } else if (activeComponents >= totalComponents * 0.5) {
        this.status.health.overall = 'degraded'
      } else {
        this.status.health.overall = 'critical'
      }

      this.status.health.uptime = Date.now() - this.status.health.lastHealthCheck
      this.status.health.lastHealthCheck = Date.now()

    } catch (error) {
      console.error('❌ Error en verificación de salud:', error)
      this.status.health.overall = 'critical'
    }
  }

  private updateMetrics(): void {
    // Actualizar métricas básicas (simplificado)
    this.status.metrics.systemLoad = Math.random() * 100
    this.status.metrics.totalTransactions += Math.floor(Math.random() * 10)
    this.status.metrics.totalRevenue += Math.random() * 1000
    this.status.metrics.activeUsers = Math.floor(Math.random() * 1000) + 100
  }

  private async processTokenPurchase(request: any): Promise<any> {
    const result = await this.paymentSystem!.purchaseTokens({
      userId: request.userId,
      amount: request.amount,
      tokenType: 'QTC',
      paymentMethod: request.paymentMethod,
      currency: request.currency,
      paymentDetails: request.metadata?.paymentDetails
    })

    return {
      success: result.success,
      transactionId: result.transactionId,
      details: {
        tokensReceived: result.tokensReceived,
        pricePerToken: result.pricePerToken,
        totalPaid: result.totalPaid
      }
    }
  }

  private async processServicePayment(request: any): Promise<any> {
    // Calcular precio dinámico si está disponible
    let finalAmount = request.amount
    if (this.pricingEngine) {
      const pricing = await this.pricingEngine.calculateServicePrice({
        serviceId: request.metadata?.serviceId || 'default-service',
        userId: request.userId,
        priority: request.metadata?.priority || 'normal'
      })
      finalAmount = pricing.finalPrice
    }

    const result = await this.paymentSystem!.payForService({
      userId: request.userId,
      serviceId: request.metadata?.serviceId || 'default-service',
      amount: finalAmount,
      currency: request.currency,
      paymentMethod: request.paymentMethod,
      priority: request.metadata?.priority || 'normal'
    })

    return {
      success: result.success,
      transactionId: result.transactionId,
      details: {
        serviceId: request.metadata?.serviceId,
        finalAmount,
        remainingBalance: result.remainingBalance
      }
    }
  }

  private async processSubscriptionPayment(request: any): Promise<any> {
    if (!this.subscriptionSystem) {
      throw new Error('Sistema de suscripciones no está habilitado')
    }

    // Procesar pago de suscripción
    const subscription = await this.subscriptionSystem.createSubscription({
      userId: request.userId,
      planId: request.metadata?.planId || 'basic-monthly',
      paymentMethod: request.paymentMethod,
      autoRenewal: request.metadata?.autoRenewal
    })

    return {
      success: true,
      transactionId: subscription.payment.id,
      details: {
        subscriptionId: subscription.subscription.id,
        planId: subscription.subscription.planId,
        trialActive: subscription.trialActive
      }
    }
  }

  private async processMarketplaceTrade(request: any): Promise<any> {
    if (!this.marketplace) {
      throw new Error('Marketplace no está habilitado')
    }

    if (request.metadata?.type === 'swap') {
      const result = await this.marketplace.swapTokens({
        userId: request.userId,
        fromToken: request.metadata.fromToken,
        toToken: request.metadata.toToken,
        amount: request.amount,
        slippageTolerance: request.metadata.slippageTolerance || 2.0
      })

      return {
        success: result.success,
        transactionId: result.transactionId,
        details: {
          outputAmount: result.outputAmount,
          price: result.price,
          slippage: result.slippage
        }
      }
    } else {
      const order = await this.marketplace.createOrder({
        userId: request.userId,
        type: request.metadata?.orderType || 'buy',
        tokenPair: request.metadata?.tokenPair || 'QTC/USD',
        amount: request.amount,
        orderType: 'market'
      })

      return {
        success: true,
        transactionId: order.id,
        details: {
          orderId: order.id,
          status: order.status,
          tokenPair: order.tokenPair
        }
      }
    }
  }

  private generateEcosystemInsights(analytics: any): string[] {
    const insights = []

    // Insights de revenue
    if (analytics.ecosystem.totalRevenue > 10000) {
      insights.push(`💰 Ecosistema saludable con ${analytics.ecosystem.totalRevenue.toFixed(0)} en revenue total`)
    } else {
      insights.push(`📈 Oportunidad de crecimiento - revenue actual: ${analytics.ecosystem.totalRevenue.toFixed(0)}`)
    }

    // Insights de usuarios
    if (analytics.ecosystem.activeUsers > 1000) {
      insights.push(`👥 Base de usuarios sólida con ${analytics.ecosystem.activeUsers} usuarios activos`)
    } else {
      insights.push(`🎯 Enfocar en adquisición de usuarios - actualmente: ${analytics.ecosystem.activeUsers}`)
    }

    // Insights de transacciones
    if (analytics.ecosystem.totalTransactions > 5000) {
      insights.push(`⚡ Alta actividad transaccional: ${analytics.ecosystem.totalTransactions} transacciones`)
    }

    // Insights de componentes
    const activeComponents = Object.values(this.status.components).filter(s => s === 'active').length
    if (activeComponents === 4) {
      insights.push(`🎯 Ecosistema completo operativo con todos los componentes activos`)
    } else {
      insights.push(`🔧 ${activeComponents}/4 componentes activos - considerar habilitar funciones adicionales`)
    }

    return insights
  }

  // Getters públicos para acceso a componentes

  public get payments(): QuantumPaymentSystem | null {
    return this.paymentSystem
  }

  public get marketplace(): QuantumTokenMarketplace | null {
    return this.marketplace
  }

  public get pricing(): QuantumPricingEngine | null {
    return this.pricingEngine
  }

  public get subscriptions(): QuantumSubscriptionSystem | null {
    return this.subscriptionSystem
  }
}

/**
 * 🏭 Factory para crear instancias configuradas del Hub
 */
export class QuantumPaymentHubFactory {
  /**
   * Crear Hub para desarrollo con todas las características
   */
  static createDevelopmentHub(): QuantumPaymentHub {
    return new QuantumPaymentHub({
      environment: 'development',
      features: {
        marketplace: true,
        dynamicPricing: true,
        subscriptions: true,
        analytics: true
      }
    })
  }

  /**
   * Crear Hub para producción con configuración optimizada
   */
  static createProductionHub(): QuantumPaymentHub {
    return new QuantumPaymentHub({
      environment: 'production',
      features: {
        marketplace: true,
        dynamicPricing: true,
        subscriptions: true,
        analytics: true
      },
      security: {
        encryptionLevel: 'quantum',
        auditLogging: true,
        fraudDetection: true
      }
    })
  }

  /**
   * Crear Hub básico solo con pagos
   */
  static createBasicHub(): QuantumPaymentHub {
    return new QuantumPaymentHub({
      environment: 'development',
      features: {
        marketplace: false,
        dynamicPricing: false,
        subscriptions: false,
        analytics: false
      }
    })
  }

  /**
   * Crear Hub personalizado
   */
  static createCustomHub(config: Partial<QuantumPaymentConfig>): QuantumPaymentHub {
    return new QuantumPaymentHub(config)
  }
}

// Exportaciones principales
export {
  QuantumPaymentSystem,
  QuantumTokenMarketplace,
  QuantumPricingEngine,
  QuantumSubscriptionSystem,
  setupQuantumPaymentEcosystem,
  runCompleteEcosystemDemo,
  PaymentSystemTestUtils
}

// Exportación por defecto
export default QuantumPaymentHub