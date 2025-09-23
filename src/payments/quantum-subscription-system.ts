/**
 * 🔄 Quantum Subscription System - Sistema de suscripciones cuánticas
 * Sistema completo de suscripciones para servicios de blockchain cuántico
 */

import { QuantumPaymentSystem } from './quantum-payment-system'
import { QuantumPricingEngine } from './quantum-pricing-engine'

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  type: 'basic' | 'premium' | 'enterprise' | 'quantum_unlimited'
  billing: {
    cycle: 'monthly' | 'quarterly' | 'yearly'
    price: number
    currency: 'QTC' | 'USD' | 'BTC' | 'ETH'
    setupFee?: number
    discountPercent?: number // Descuento por pago anual
  }
  
  // Límites de uso
  limits: {
    quantumComputations: number // -1 para ilimitado
    quantumEncryptions: number
    quantumSimulations: number
    storageGB: number
    bandwidthGB: number
    apiCallsPerDay: number
    maxConcurrentJobs: number
    dataRetentionDays: number
  }
  
  // Características incluidas
  features: {
    prioritySupport: boolean
    advancedAnalytics: boolean
    customQuantumAlgorithms: boolean
    whiteLabel: boolean
    apiAccess: boolean
    bulkOperations: boolean
    enterpriseIntegration: boolean
    dedicatedResources: boolean
    slaGuarantee?: string // Ej: "99.9%"
  }
  
  // Precios por uso excedente
  overage: {
    quantumComputations: number
    quantumEncryptions: number
    quantumSimulations: number
    storageGB: number
    bandwidthGB: number
    apiCalls: number
  }
  
  // Configuración
  config: {
    active: boolean
    availableForSignup: boolean
    featured: boolean
    trialDays: number
    minCommitmentMonths: number
    autoRenewal: boolean
    cancellationPolicy: 'immediate' | 'end_of_cycle'
  }
}

interface UserSubscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'paused' | 'cancelled' | 'expired' | 'trial' | 'pending_payment'
  
  // Fechas
  startDate: number
  endDate: number
  trialEndDate?: number
  nextBillingDate: number
  cancelledAt?: number
  pausedAt?: number
  
  // Facturación
  billing: {
    amount: number
    currency: string
    cycle: string
    lastPayment?: number
    nextPayment: number
    failedPayments: number
    paymentMethod: string
  }
  
  // Uso actual
  usage: {
    period: { start: number; end: number }
    quantumComputations: number
    quantumEncryptions: number
    quantumSimulations: number
    storageGB: number
    bandwidthGB: number
    apiCalls: number
    concurrentJobs: number
  }
  
  // Histórico de pagos
  paymentHistory: SubscriptionPayment[]
  
  // Configuración
  settings: {
    autoRenewal: boolean
    upgradePending?: string // Plan ID pendiente de upgrade
    downgradePending?: string // Plan ID pendiente de downgrade
    cancellationReason?: string
    notificationsEnabled: boolean
  }
}

interface SubscriptionPayment {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'successful' | 'failed' | 'pending' | 'refunded'
  transactionId: string
  timestamp: number
  period: { start: number; end: number }
  overage?: {
    amount: number
    breakdown: any
  }
  paymentMethod: string
  failureReason?: string
}

interface SubscriptionUsageAlert {
  id: string
  subscriptionId: string
  type: 'approaching_limit' | 'limit_exceeded' | 'overage_charges'
  resource: string
  threshold: number
  currentUsage: number
  timestamp: number
  acknowledged: boolean
  actions: string[]
}

interface SubscriptionAnalytics {
  period: { start: number; end: number }
  
  // Métricas de suscripciones
  subscriptions: {
    total: number
    active: number
    trial: number
    cancelled: number
    newSignups: number
    churnRate: number
    upgradeRate: number
    downgradeRate: number
  }
  
  // Métricas de revenue
  revenue: {
    total: number
    recurring: number
    overage: number
    byPlan: Map<string, number>
    arpu: number // Average Revenue Per User
    mrr: number // Monthly Recurring Revenue
    arr: number // Annual Recurring Revenue
  }
  
  // Métricas de uso
  usage: {
    totalComputations: number
    totalEncryptions: number
    totalSimulations: number
    averageUsagePerUser: number
    topUsageService: string
    utilizationRate: number
  }
  
  // Predicciones
  forecasts: {
    nextMonthRevenue: number
    churnPrediction: number
    growthRate: number
    capacityNeeded: number
  }
}

export class QuantumSubscriptionSystem {
  private paymentSystem: QuantumPaymentSystem
  private pricingEngine: QuantumPricingEngine
  private subscriptionPlans: Map<string, SubscriptionPlan>
  private userSubscriptions: Map<string, UserSubscription>
  private paymentHistory: Map<string, SubscriptionPayment>
  private usageAlerts: Map<string, SubscriptionUsageAlert>
  
  private isActive: boolean
  private billingInterval: any
  private usageMonitoringInterval: any

  constructor(paymentSystem: QuantumPaymentSystem, pricingEngine: QuantumPricingEngine) {
    this.paymentSystem = paymentSystem
    this.pricingEngine = pricingEngine
    this.subscriptionPlans = new Map()
    this.userSubscriptions = new Map()
    this.paymentHistory = new Map()
    this.usageAlerts = new Map()
    
    this.isActive = false
    this.billingInterval = null
    this.usageMonitoringInterval = null

    console.log('🔄 Quantum Subscription System inicializado')
  }

  /**
   * 🚀 Inicializar sistema de suscripciones
   */
  public async initialize(): Promise<void> {
    if (this.isActive) {
      console.log('⚠️ Sistema de suscripciones ya está activo')
      return
    }

    console.log('🚀 Iniciando Quantum Subscription System...')

    try {
      // Configurar planes por defecto
      await this.setupDefaultPlans()

      // Iniciar procesamiento de facturación automática
      this.startBillingProcessor()

      // Iniciar monitoreo de uso
      this.startUsageMonitoring()

      this.isActive = true
      console.log('✅ Sistema de suscripciones iniciado exitosamente')

    } catch (error) {
      console.error('❌ Error iniciando sistema de suscripciones:', error)
      throw error
    }
  }

  /**
   * 📋 Crear nueva suscripción
   */
  public async createSubscription(request: {
    userId: string
    planId: string
    paymentMethod: string
    promoCode?: string
    startDate?: number
    autoRenewal?: boolean
  }): Promise<{
    subscription: UserSubscription
    payment: SubscriptionPayment
    trialActive: boolean
  }> {
    console.log(`📋 Creando suscripción para usuario ${request.userId}, plan ${request.planId}`)

    try {
      // Validar plan
      const plan = this.subscriptionPlans.get(request.planId)
      if (!plan || !plan.config.active) {
        throw new Error('Plan de suscripción no válido o inactivo')
      }

      // Verificar si el usuario ya tiene una suscripción activa
      const existingSubscription = await this.getUserActiveSubscription(request.userId)
      if (existingSubscription) {
        throw new Error('Usuario ya tiene una suscripción activa')
      }

      // Calcular fechas
      const startDate = request.startDate || Date.now()
      const trialEndDate = plan.config.trialDays > 0 ? 
        startDate + (plan.config.trialDays * 24 * 60 * 60 * 1000) : undefined
      
      let endDate: number
      switch (plan.billing.cycle) {
        case 'monthly':
          endDate = startDate + (30 * 24 * 60 * 60 * 1000)
          break
        case 'quarterly':
          endDate = startDate + (90 * 24 * 60 * 60 * 1000)
          break
        case 'yearly':
          endDate = startDate + (365 * 24 * 60 * 60 * 1000)
          break
        default:
          endDate = startDate + (30 * 24 * 60 * 60 * 1000)
      }

      // Aplicar descuentos y promociones
      const pricing = await this.calculateSubscriptionPricing(plan, request.promoCode)

      // Crear suscripción
      const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const subscription: UserSubscription = {
        id: subscriptionId,
        userId: request.userId,
        planId: request.planId,
        status: trialEndDate ? 'trial' : 'active',
        startDate,
        endDate,
        trialEndDate,
        nextBillingDate: trialEndDate || startDate,
        billing: {
          amount: pricing.finalAmount,
          currency: plan.billing.currency,
          cycle: plan.billing.cycle,
          nextPayment: trialEndDate || startDate,
          failedPayments: 0,
          paymentMethod: request.paymentMethod
        },
        usage: {
          period: { start: startDate, end: endDate },
          quantumComputations: 0,
          quantumEncryptions: 0,
          quantumSimulations: 0,
          storageGB: 0,
          bandwidthGB: 0,
          apiCalls: 0,
          concurrentJobs: 0
        },
        paymentHistory: [],
        settings: {
          autoRenewal: request.autoRenewal ?? plan.config.autoRenewal,
          notificationsEnabled: true
        }
      }

      // Almacenar suscripción
      this.userSubscriptions.set(subscriptionId, subscription)

      // Procesar pago inicial (si no es trial)
      let payment: SubscriptionPayment
      if (!trialEndDate || pricing.finalAmount > 0) {
        payment = await this.processSubscriptionPayment(subscription, pricing.finalAmount)
      } else {
        // Crear registro de pago para trial
        payment = {
          id: `pay_trial_${Date.now()}`,
          subscriptionId,
          amount: 0,
          currency: plan.billing.currency,
          status: 'successful',
          transactionId: 'trial',
          timestamp: Date.now(),
          period: { start: startDate, end: trialEndDate || endDate },
          paymentMethod: 'trial'
        }
      }

      subscription.paymentHistory.push(payment)
      this.paymentHistory.set(payment.id, payment)

      console.log(`✅ Suscripción creada: ${subscriptionId}`)
      console.log(`   Plan: ${plan.name}`)
      console.log(`   Estado: ${subscription.status}`)
      console.log(`   Precio: ${pricing.finalAmount} ${plan.billing.currency}`)

      return {
        subscription,
        payment,
        trialActive: !!trialEndDate
      }

    } catch (error) {
      console.error('❌ Error creando suscripción:', error)
      throw error
    }
  }

  /**
   * ⬆️ Actualizar suscripción (upgrade/downgrade)
   */
  public async updateSubscription(request: {
    subscriptionId: string
    newPlanId?: string
    immediateChange?: boolean
    promoCode?: string
  }): Promise<{
    success: boolean
    proration?: {
      credit: number
      charge: number
      netAmount: number
    }
    newSubscription?: UserSubscription
    effectiveDate: number
  }> {
    console.log(`⬆️ Actualizando suscripción ${request.subscriptionId}`)

    try {
      const subscription = this.userSubscriptions.get(request.subscriptionId)
      if (!subscription) {
        throw new Error('Suscripción no encontrada')
      }

      if (subscription.status !== 'active' && subscription.status !== 'trial') {
        throw new Error('Solo se pueden actualizar suscripciones activas')
      }

      // Si se especifica nuevo plan
      if (request.newPlanId) {
        const newPlan = this.subscriptionPlans.get(request.newPlanId)
        if (!newPlan || !newPlan.config.active) {
          throw new Error('Nuevo plan no válido')
        }

        const currentPlan = this.subscriptionPlans.get(subscription.planId)!
        
        // Calcular prorateo
        const proration = await this.calculateProration(subscription, newPlan, currentPlan)
        
        if (request.immediateChange) {
          // Cambio inmediato
          subscription.planId = request.newPlanId
          
          // Procesar pago de prorateo si es necesario
          if (proration.netAmount > 0) {
            await this.processSubscriptionPayment(subscription, proration.netAmount)
          }
          
          // Resetear límites de uso si es upgrade
          if (newPlan.billing.price > currentPlan.billing.price) {
            await this.resetUsageLimits(subscription)
          }

          const effectiveDate = Date.now()
          
          console.log(`✅ Suscripción actualizada inmediatamente`)
          console.log(`   Nuevo plan: ${newPlan.name}`)
          console.log(`   Monto neto: ${proration.netAmount} ${newPlan.billing.currency}`)

          return {
            success: true,
            proration,
            newSubscription: subscription,
            effectiveDate
          }
        } else {
          // Cambio al final del ciclo
          subscription.settings.upgradePending = request.newPlanId
          const effectiveDate = subscription.endDate

          console.log(`✅ Cambio de plan programado para: ${new Date(effectiveDate).toISOString()}`)
          
          return {
            success: true,
            effectiveDate
          }
        }
      }

      return {
        success: false,
        effectiveDate: Date.now()
      }

    } catch (error) {
      console.error('❌ Error actualizando suscripción:', error)
      throw error
    }
  }

  /**
   * ❌ Cancelar suscripción
   */
  public async cancelSubscription(request: {
    subscriptionId: string
    reason?: string
    immediate?: boolean
    refundRequested?: boolean
  }): Promise<{
    success: boolean
    effectiveDate: number
    refundAmount?: number
    refundId?: string
  }> {
    console.log(`❌ Cancelando suscripción ${request.subscriptionId}`)

    try {
      const subscription = this.userSubscriptions.get(request.subscriptionId)
      if (!subscription) {
        throw new Error('Suscripción no encontrada')
      }

      if (subscription.status === 'cancelled') {
        throw new Error('Suscripción ya está cancelada')
      }

      const plan = this.subscriptionPlans.get(subscription.planId)!
      let effectiveDate: number
      let refundAmount = 0
      let refundId: string | undefined

      if (request.immediate || plan.config.cancellationPolicy === 'immediate') {
        // Cancelación inmediata
        subscription.status = 'cancelled'
        subscription.cancelledAt = Date.now()
        effectiveDate = Date.now()

        // Calcular reembolso si es solicitado
        if (request.refundRequested) {
          const refund = await this.calculateCancellationRefund(subscription)
          if (refund.amount > 0) {
            refundAmount = refund.amount
            refundId = await this.processRefund(subscription, refund.amount)
          }
        }
      } else {
        // Cancelación al final del ciclo
        subscription.settings.cancellationReason = request.reason
        subscription.settings.autoRenewal = false
        effectiveDate = subscription.endDate
      }

      if (request.reason) {
        subscription.settings.cancellationReason = request.reason
      }

      console.log(`✅ Suscripción ${request.immediate ? 'cancelada inmediatamente' : 'programada para cancelación'}`)
      console.log(`   Fecha efectiva: ${new Date(effectiveDate).toISOString()}`)
      if (refundAmount > 0) {
        console.log(`   Reembolso: ${refundAmount} ${subscription.billing.currency}`)
      }

      return {
        success: true,
        effectiveDate,
        refundAmount: refundAmount > 0 ? refundAmount : undefined,
        refundId
      }

    } catch (error) {
      console.error('❌ Error cancelando suscripción:', error)
      throw error
    }
  }

  /**
   * 📊 Registrar uso de servicio
   */
  public async recordServiceUsage(request: {
    userId: string
    serviceType: 'quantumComputations' | 'quantumEncryptions' | 'quantumSimulations' | 'storageGB' | 'bandwidthGB' | 'apiCalls'
    amount: number
    timestamp?: number
  }): Promise<{
    allowed: boolean
    remaining: number
    overageCharge?: number
    alertGenerated?: boolean
  }> {
    const subscription = await this.getUserActiveSubscription(request.userId)
    if (!subscription) {
      throw new Error('Usuario sin suscripción activa')
    }

    const plan = this.subscriptionPlans.get(subscription.planId)!
    const currentUsage = subscription.usage[request.serviceType]
    const limit = plan.limits[request.serviceType]
    
    // Verificar límite (-1 = ilimitado)
    if (limit !== -1 && currentUsage + request.amount > limit) {
      // Calcular sobrecargo
      const overage = (currentUsage + request.amount) - limit
      const overageCharge = overage * plan.overage[request.serviceType]

      // Generar alerta si es necesario
      const alertGenerated = await this.checkAndCreateUsageAlert(subscription, request.serviceType, currentUsage + request.amount, limit)

      console.log(`⚠️ Límite excedido para ${request.serviceType}: ${currentUsage + request.amount}/${limit}`)
      console.log(`   Sobrecargo: ${overageCharge} ${plan.billing.currency}`)

      // Registrar el uso de todos modos
      subscription.usage[request.serviceType] += request.amount

      return {
        allowed: true, // Permitir pero con sobrecargo
        remaining: 0,
        overageCharge,
        alertGenerated
      }
    }

    // Uso dentro del límite
    subscription.usage[request.serviceType] += request.amount
    const remaining = limit === -1 ? -1 : limit - subscription.usage[request.serviceType]

    // Verificar si se acerca al límite
    const alertGenerated = limit !== -1 && remaining <= limit * 0.1 ? // 10% restante
      await this.checkAndCreateUsageAlert(subscription, request.serviceType, subscription.usage[request.serviceType], limit) :
      false

    return {
      allowed: true,
      remaining,
      alertGenerated
    }
  }

  /**
   * 📈 Obtener analytics de suscripciones
   */
  public async getSubscriptionAnalytics(period?: {
    start: number
    end: number
  }): Promise<SubscriptionAnalytics> {
    console.log('📈 Generando analytics de suscripciones...')

    const start = period?.start || Date.now() - (30 * 24 * 60 * 60 * 1000) // 30 días
    const end = period?.end || Date.now()

    // Filtrar suscripciones por período
    const subscriptions = Array.from(this.userSubscriptions.values())
    const periodSubscriptions = subscriptions.filter(sub => 
      sub.startDate >= start && sub.startDate <= end
    )

    // Métricas de suscripciones
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length
    const trialSubscriptions = subscriptions.filter(sub => sub.status === 'trial').length
    const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled').length
    const newSignups = periodSubscriptions.length

    // Calcular churn rate
    const churnRate = cancelledSubscriptions / (activeSubscriptions + cancelledSubscriptions) * 100

    // Métricas de revenue
    const payments = Array.from(this.paymentHistory.values())
      .filter(payment => payment.timestamp >= start && payment.timestamp <= end && payment.status === 'successful')
    
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0)
    const recurringRevenue = payments.filter(p => !p.overage).reduce((sum, payment) => sum + payment.amount, 0)
    const overageRevenue = payments.filter(p => p.overage).reduce((sum, payment) => sum + (p.overage?.amount || 0), 0)

    // Revenue por plan
    const revenueByPlan = new Map<string, number>()
    for (const payment of payments) {
      const subscription = this.userSubscriptions.get(payment.subscriptionId)
      if (subscription) {
        const current = revenueByPlan.get(subscription.planId) || 0
        revenueByPlan.set(subscription.planId, current + payment.amount)
      }
    }

    // ARPU y MRR
    const arpu = activeSubscriptions > 0 ? totalRevenue / activeSubscriptions : 0
    const mrr = recurringRevenue // Simplificado
    const arr = mrr * 12

    // Métricas de uso
    const totalComputations = subscriptions.reduce((sum, sub) => sum + sub.usage.quantumComputations, 0)
    const totalEncryptions = subscriptions.reduce((sum, sub) => sum + sub.usage.quantumEncryptions, 0)
    const totalSimulations = subscriptions.reduce((sum, sub) => sum + sub.usage.quantumSimulations, 0)

    const analytics: SubscriptionAnalytics = {
      period: { start, end },
      subscriptions: {
        total: subscriptions.length,
        active: activeSubscriptions,
        trial: trialSubscriptions,
        cancelled: cancelledSubscriptions,
        newSignups,
        churnRate,
        upgradeRate: Math.random() * 10, // Simplificado
        downgradeRate: Math.random() * 5
      },
      revenue: {
        total: totalRevenue,
        recurring: recurringRevenue,
        overage: overageRevenue,
        byPlan: revenueByPlan,
        arpu,
        mrr,
        arr
      },
      usage: {
        totalComputations,
        totalEncryptions,
        totalSimulations,
        averageUsagePerUser: activeSubscriptions > 0 ? totalComputations / activeSubscriptions : 0,
        topUsageService: 'quantumComputations',
        utilizationRate: 75.5 // Simplificado
      },
      forecasts: {
        nextMonthRevenue: mrr * 1.1, // Crecimiento estimado 10%
        churnPrediction: churnRate * 0.9,
        growthRate: Math.random() * 15 + 5, // 5-20%
        capacityNeeded: totalComputations * 1.2
      }
    }

    console.log(`✅ Analytics generados`)
    console.log(`   Suscripciones activas: ${analytics.subscriptions.active}`)
    console.log(`   Revenue total: ${analytics.revenue.total}`)
    console.log(`   MRR: ${analytics.revenue.mrr}`)
    console.log(`   Churn rate: ${analytics.subscriptions.churnRate.toFixed(2)}%`)

    return analytics
  }

  /**
   * 👤 Obtener suscripción activa del usuario
   */
  public async getUserActiveSubscription(userId: string): Promise<UserSubscription | null> {
    for (const subscription of this.userSubscriptions.values()) {
      if (subscription.userId === userId && 
          (subscription.status === 'active' || subscription.status === 'trial')) {
        return subscription
      }
    }
    return null
  }

  /**
   * 📋 Obtener todos los planes disponibles
   */
  public getAvailablePlans(): SubscriptionPlan[] {
    return Array.from(this.subscriptionPlans.values())
      .filter(plan => plan.config.active && plan.config.availableForSignup)
      .sort((a, b) => a.billing.price - b.billing.price)
  }

  // Métodos privados

  private async setupDefaultPlans(): Promise<void> {
    console.log('📋 Configurando planes de suscripción por defecto...')

    const defaultPlans: SubscriptionPlan[] = [
      {
        id: 'basic-monthly',
        name: 'Quantum Basic',
        description: 'Plan básico para comenzar con computación cuántica',
        type: 'basic',
        billing: {
          cycle: 'monthly',
          price: 29.99,
          currency: 'QTC',
          discountPercent: 0
        },
        limits: {
          quantumComputations: 100,
          quantumEncryptions: 500,
          quantumSimulations: 10,
          storageGB: 10,
          bandwidthGB: 100,
          apiCallsPerDay: 1000,
          maxConcurrentJobs: 2,
          dataRetentionDays: 30
        },
        features: {
          prioritySupport: false,
          advancedAnalytics: false,
          customQuantumAlgorithms: false,
          whiteLabel: false,
          apiAccess: true,
          bulkOperations: false,
          enterpriseIntegration: false,
          dedicatedResources: false
        },
        overage: {
          quantumComputations: 0.50,
          quantumEncryptions: 0.10,
          quantumSimulations: 5.00,
          storageGB: 2.00,
          bandwidthGB: 0.50,
          apiCalls: 0.001
        },
        config: {
          active: true,
          availableForSignup: true,
          featured: false,
          trialDays: 14,
          minCommitmentMonths: 1,
          autoRenewal: true,
          cancellationPolicy: 'end_of_cycle'
        }
      },
      {
        id: 'premium-monthly',
        name: 'Quantum Premium',
        description: 'Plan avanzado para empresas en crecimiento',
        type: 'premium',
        billing: {
          cycle: 'monthly',
          price: 99.99,
          currency: 'QTC',
          discountPercent: 0
        },
        limits: {
          quantumComputations: 1000,
          quantumEncryptions: 5000,
          quantumSimulations: 100,
          storageGB: 100,
          bandwidthGB: 1000,
          apiCallsPerDay: 10000,
          maxConcurrentJobs: 10,
          dataRetentionDays: 90
        },
        features: {
          prioritySupport: true,
          advancedAnalytics: true,
          customQuantumAlgorithms: false,
          whiteLabel: false,
          apiAccess: true,
          bulkOperations: true,
          enterpriseIntegration: false,
          dedicatedResources: false,
          slaGuarantee: '99.5%'
        },
        overage: {
          quantumComputations: 0.30,
          quantumEncryptions: 0.05,
          quantumSimulations: 3.00,
          storageGB: 1.50,
          bandwidthGB: 0.30,
          apiCalls: 0.0005
        },
        config: {
          active: true,
          availableForSignup: true,
          featured: true,
          trialDays: 7,
          minCommitmentMonths: 1,
          autoRenewal: true,
          cancellationPolicy: 'end_of_cycle'
        }
      },
      {
        id: 'enterprise-yearly',
        name: 'Quantum Enterprise',
        description: 'Solución empresarial completa con recursos dedicados',
        type: 'enterprise',
        billing: {
          cycle: 'yearly',
          price: 2999.99,
          currency: 'QTC',
          discountPercent: 20 // 20% descuento por pago anual
        },
        limits: {
          quantumComputations: 50000,
          quantumEncryptions: 100000,
          quantumSimulations: 5000,
          storageGB: 1000,
          bandwidthGB: 10000,
          apiCallsPerDay: 100000,
          maxConcurrentJobs: 50,
          dataRetentionDays: 365
        },
        features: {
          prioritySupport: true,
          advancedAnalytics: true,
          customQuantumAlgorithms: true,
          whiteLabel: true,
          apiAccess: true,
          bulkOperations: true,
          enterpriseIntegration: true,
          dedicatedResources: true,
          slaGuarantee: '99.9%'
        },
        overage: {
          quantumComputations: 0.10,
          quantumEncryptions: 0.02,
          quantumSimulations: 1.00,
          storageGB: 0.50,
          bandwidthGB: 0.10,
          apiCalls: 0.0001
        },
        config: {
          active: true,
          availableForSignup: true,
          featured: false,
          trialDays: 30,
          minCommitmentMonths: 12,
          autoRenewal: true,
          cancellationPolicy: 'end_of_cycle'
        }
      },
      {
        id: 'quantum-unlimited',
        name: 'Quantum Unlimited',
        description: 'Acceso ilimitado a todos los recursos cuánticos',
        type: 'quantum_unlimited',
        billing: {
          cycle: 'monthly',
          price: 999.99,
          currency: 'QTC',
          setupFee: 500.00
        },
        limits: {
          quantumComputations: -1, // Ilimitado
          quantumEncryptions: -1,
          quantumSimulations: -1,
          storageGB: -1,
          bandwidthGB: -1,
          apiCallsPerDay: -1,
          maxConcurrentJobs: -1,
          dataRetentionDays: -1
        },
        features: {
          prioritySupport: true,
          advancedAnalytics: true,
          customQuantumAlgorithms: true,
          whiteLabel: true,
          apiAccess: true,
          bulkOperations: true,
          enterpriseIntegration: true,
          dedicatedResources: true,
          slaGuarantee: '99.99%'
        },
        overage: {
          quantumComputations: 0,
          quantumEncryptions: 0,
          quantumSimulations: 0,
          storageGB: 0,
          bandwidthGB: 0,
          apiCalls: 0
        },
        config: {
          active: true,
          availableForSignup: false, // Solo por invitación
          featured: false,
          trialDays: 0,
          minCommitmentMonths: 3,
          autoRenewal: true,
          cancellationPolicy: 'end_of_cycle'
        }
      }
    ]

    for (const plan of defaultPlans) {
      this.subscriptionPlans.set(plan.id, plan)
    }

    console.log(`✅ ${defaultPlans.length} planes de suscripción configurados`)
  }

  private startBillingProcessor(): void {
    console.log('💳 Iniciando procesador de facturación automática...')
    
    this.billingInterval = setInterval(() => {
      if (this.isActive) {
        this.processPendingBillings()
      }
    }, 60000) // Cada minuto
  }

  private startUsageMonitoring(): void {
    console.log('📊 Iniciando monitoreo de uso...')
    
    this.usageMonitoringInterval = setInterval(() => {
      if (this.isActive) {
        this.checkUsageLimits()
      }
    }, 300000) // Cada 5 minutos
  }

  private async processPendingBillings(): Promise<void> {
    const now = Date.now()
    
    for (const subscription of this.userSubscriptions.values()) {
      if (subscription.status === 'active' && 
          subscription.billing.nextPayment <= now &&
          subscription.settings.autoRenewal) {
        
        try {
          await this.processRenewalPayment(subscription)
        } catch (error) {
          console.error(`❌ Error procesando pago de renovación para ${subscription.id}:`, error)
          
          // Incrementar contador de fallos
          subscription.billing.failedPayments++
          
          // Pausar suscripción después de 3 fallos
          if (subscription.billing.failedPayments >= 3) {
            subscription.status = 'pending_payment'
          }
        }
      }
    }
  }

  private async processRenewalPayment(subscription: UserSubscription): Promise<void> {
    const plan = this.subscriptionPlans.get(subscription.planId)!
    
    // Calcular monto total incluyendo overages
    const baseAmount = subscription.billing.amount
    const overageAmount = await this.calculateOverageCharges(subscription)
    const totalAmount = baseAmount + overageAmount
    
    // Procesar pago
    const payment = await this.processSubscriptionPayment(subscription, totalAmount)
    
    if (payment.status === 'successful') {
      // Renovar suscripción
      const currentEnd = subscription.endDate
      let newEnd: number
      
      switch (plan.billing.cycle) {
        case 'monthly':
          newEnd = currentEnd + (30 * 24 * 60 * 60 * 1000)
          break
        case 'quarterly':
          newEnd = currentEnd + (90 * 24 * 60 * 60 * 1000)
          break
        case 'yearly':
          newEnd = currentEnd + (365 * 24 * 60 * 60 * 1000)
          break
        default:
          newEnd = currentEnd + (30 * 24 * 60 * 60 * 1000)
      }
      
      subscription.endDate = newEnd
      subscription.billing.nextPayment = newEnd
      subscription.billing.lastPayment = Date.now()
      subscription.billing.failedPayments = 0
      
      // Resetear uso para el nuevo período
      await this.resetUsageLimits(subscription)
      
      console.log(`✅ Suscripción renovada: ${subscription.id} hasta ${new Date(newEnd).toISOString()}`)
    }
  }

  private async calculateSubscriptionPricing(plan: SubscriptionPlan, promoCode?: string): Promise<{
    baseAmount: number
    discount: number
    finalAmount: number
    promoApplied?: string
  }> {
    let baseAmount = plan.billing.price
    let discount = 0
    let promoApplied: string | undefined

    // Aplicar descuento por ciclo anual
    if (plan.billing.discountPercent && plan.billing.cycle === 'yearly') {
      discount += baseAmount * (plan.billing.discountPercent / 100)
    }

    // Aplicar código promocional (simplificado)
    if (promoCode) {
      // Simular validación de código promocional
      if (promoCode === 'WELCOME20') {
        discount += baseAmount * 0.20 // 20% descuento
        promoApplied = promoCode
      }
    }

    const finalAmount = Math.max(0, baseAmount - discount)

    return { baseAmount, discount, finalAmount, promoApplied }
  }

  private async processSubscriptionPayment(subscription: UserSubscription, amount: number): Promise<SubscriptionPayment> {
    // Procesar pago a través del sistema de pagos
    const paymentResult = await this.paymentSystem.payForService({
      userId: subscription.userId,
      serviceId: `subscription-${subscription.planId}`,
      amount,
      currency: subscription.billing.currency as any,
      paymentMethod: subscription.billing.paymentMethod,
      priority: 'normal'
    })

    // Crear registro de pago
    const payment: SubscriptionPayment = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      subscriptionId: subscription.id,
      amount,
      currency: subscription.billing.currency,
      status: paymentResult.success ? 'successful' : 'failed',
      transactionId: paymentResult.transactionId,
      timestamp: Date.now(),
      period: {
        start: subscription.usage.period.start,
        end: subscription.usage.period.end
      },
      paymentMethod: subscription.billing.paymentMethod,
      failureReason: paymentResult.success ? undefined : 'Payment processing failed'
    }

    this.paymentHistory.set(payment.id, payment)
    return payment
  }

  private async calculateProration(subscription: UserSubscription, newPlan: SubscriptionPlan, currentPlan: SubscriptionPlan): Promise<{
    credit: number
    charge: number
    netAmount: number
  }> {
    // Calcular crédito por tiempo restante del plan actual
    const now = Date.now()
    const timeRemaining = subscription.endDate - now
    const totalCycleDuration = subscription.endDate - subscription.startDate
    const remainingPercentage = timeRemaining / totalCycleDuration
    
    const credit = currentPlan.billing.price * remainingPercentage
    
    // Calcular cargo por el nuevo plan (proporcional)
    const charge = newPlan.billing.price * remainingPercentage
    
    const netAmount = Math.max(0, charge - credit)

    return { credit, charge, netAmount }
  }

  private async resetUsageLimits(subscription: UserSubscription): Promise<void> {
    // Resetear contadores de uso para el nuevo período
    subscription.usage = {
      period: {
        start: Date.now(),
        end: subscription.endDate
      },
      quantumComputations: 0,
      quantumEncryptions: 0,
      quantumSimulations: 0,
      storageGB: 0,
      bandwidthGB: 0,
      apiCalls: 0,
      concurrentJobs: 0
    }

    console.log(`🔄 Límites de uso reseteados para suscripción ${subscription.id}`)
  }

  private async checkAndCreateUsageAlert(subscription: UserSubscription, resourceType: string, currentUsage: number, limit: number): Promise<boolean> {
    const alertId = `alert_${subscription.id}_${resourceType}_${Date.now()}`
    
    let alertType: 'approaching_limit' | 'limit_exceeded' | 'overage_charges'
    let threshold: number

    if (currentUsage >= limit) {
      alertType = 'limit_exceeded'
      threshold = limit
    } else if (currentUsage >= limit * 0.9) {
      alertType = 'approaching_limit'
      threshold = limit * 0.9
    } else {
      return false // No crear alerta
    }

    const alert: SubscriptionUsageAlert = {
      id: alertId,
      subscriptionId: subscription.id,
      type: alertType,
      resource: resourceType,
      threshold,
      currentUsage,
      timestamp: Date.now(),
      acknowledged: false,
      actions: this.generateAlertActions(alertType, resourceType)
    }

    this.usageAlerts.set(alertId, alert)

    console.log(`⚠️ Alerta de uso generada: ${alertType} para ${resourceType}`)
    console.log(`   Uso actual: ${currentUsage}/${limit}`)

    return true
  }

  private generateAlertActions(alertType: string, resourceType: string): string[] {
    const actions = []
    
    if (alertType === 'approaching_limit') {
      actions.push(`Considerar upgrade del plan para aumentar límite de ${resourceType}`)
      actions.push('Optimizar uso del servicio')
    } else if (alertType === 'limit_exceeded') {
      actions.push('Upgrade inmediato recomendado')
      actions.push('Se aplicarán cargos por sobrecarga')
    }
    
    return actions
  }

  private async calculateOverageCharges(subscription: UserSubscription): Promise<number> {
    const plan = this.subscriptionPlans.get(subscription.planId)!
    let totalOverage = 0

    // Calcular sobrecargos para cada recurso
    for (const [resource, usage] of Object.entries(subscription.usage)) {
      if (resource === 'period') continue
      
      const limit = plan.limits[resource as keyof typeof plan.limits]
      if (limit !== -1 && usage > limit) {
        const overage = usage - limit
        const rate = plan.overage[resource as keyof typeof plan.overage]
        totalOverage += overage * rate
      }
    }

    return totalOverage
  }

  private async calculateCancellationRefund(subscription: UserSubscription): Promise<{ amount: number; reason: string }> {
    // Calcular reembolso proporcional basado en tiempo restante
    const now = Date.now()
    const timeRemaining = subscription.endDate - now
    const totalCycleDuration = subscription.endDate - subscription.startDate
    
    if (timeRemaining <= 0) {
      return { amount: 0, reason: 'Período de facturación ya transcurrido' }
    }
    
    const remainingPercentage = timeRemaining / totalCycleDuration
    const refundAmount = subscription.billing.amount * remainingPercentage * 0.8 // 80% del proporcional
    
    return {
      amount: Math.max(0, refundAmount),
      reason: `Reembolso proporcional por ${(remainingPercentage * 100).toFixed(1)}% del período restante`
    }
  }

  private async processRefund(subscription: UserSubscription, amount: number): Promise<string> {
    // Procesar reembolso a través del sistema de pagos
    const refundId = `refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Simular procesamiento de reembolso
    console.log(`💰 Procesando reembolso: ${amount} ${subscription.billing.currency} para suscripción ${subscription.id}`)
    
    return refundId
  }

  private checkUsageLimits(): void {
    // Verificar límites de uso para todas las suscripciones activas
    for (const subscription of this.userSubscriptions.values()) {
      if (subscription.status === 'active' || subscription.status === 'trial') {
        const plan = this.subscriptionPlans.get(subscription.planId)!
        
        // Verificar cada tipo de recurso
        for (const [resource, usage] of Object.entries(subscription.usage)) {
          if (resource === 'period') continue
          
          const limit = plan.limits[resource as keyof typeof plan.limits]
          if (limit !== -1 && usage >= limit * 0.8) { // 80% del límite
            this.checkAndCreateUsageAlert(subscription, resource, usage, limit)
          }
        }
      }
    }
  }

  // Métodos públicos de control

  public async shutdown(): Promise<void> {
    console.log('⏹️ Cerrando sistema de suscripciones...')
    
    this.isActive = false
    
    if (this.billingInterval) {
      clearInterval(this.billingInterval)
      this.billingInterval = null
    }
    
    if (this.usageMonitoringInterval) {
      clearInterval(this.usageMonitoringInterval)
      this.usageMonitoringInterval = null
    }
    
    console.log('✅ Sistema de suscripciones cerrado')
  }

  public getSubscription(subscriptionId: string): UserSubscription | undefined {
    return this.userSubscriptions.get(subscriptionId)
  }

  public getUserSubscriptions(userId: string): UserSubscription[] {
    return Array.from(this.userSubscriptions.values())
      .filter(sub => sub.userId === userId)
      .sort((a, b) => b.startDate - a.startDate)
  }

  public getUsageAlerts(subscriptionId?: string): SubscriptionUsageAlert[] {
    let alerts = Array.from(this.usageAlerts.values())
    
    if (subscriptionId) {
      alerts = alerts.filter(alert => alert.subscriptionId === subscriptionId)
    }
    
    return alerts.sort((a, b) => b.timestamp - a.timestamp)
  }
}

export type {
  SubscriptionPlan,
  UserSubscription,
  SubscriptionPayment,
  SubscriptionUsageAlert,
  SubscriptionAnalytics
}