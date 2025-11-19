/**
 * 🏦 Quantum DeFi Protocol - Sistema DeFi completo con staking, farming y gobernanza
 * Finanzas descentralizadas cuánticas con yields automáticos y DAO governance
 */

import { 
  StakingPool, 
  YieldFarm, 
  GovernanceProposal, 
  Vote,
  LiquidityPool
} from '../types/token-types'
import { SimpleHash } from '../utils/simple-hash'

export class QuantumDeFiProtocol {
  private stakingPools: Map<string, StakingPool>
  private yieldFarms: Map<string, YieldFarm>
  private liquidityPools: Map<string, LiquidityPool>
  private proposals: Map<string, GovernanceProposal>
  private votes: Map<string, Vote[]>
  private userStakes: Map<string, UserStakeInfo[]>
  private protocolStats: ProtocolStats
  private lastProposalId: number

  constructor() {
    this.stakingPools = new Map()
    this.yieldFarms = new Map()
    this.liquidityPools = new Map()
    this.proposals = new Map()
    this.votes = new Map()
    this.userStakes = new Map()
    this.lastProposalId = 0

    this.protocolStats = {
      totalValueLocked: 0,
      totalStakers: 0,
      totalRewardsDistributed: 0,
      averageAPY: 0,
      protocolFees: 0
    }

    this.initializeDefaultPools()
    console.log('🏦 Protocolo DeFi cuántico inicializado')
  }

  /**
   * 🏊 Inicializar pools por defecto
   */
  private initializeDefaultPools(): void {
    // Pool de staking QC básico
    this.stakingPools.set('qc_basic', {
      id: 'qc_basic',
      name: 'Quantum Coin Staking',
      token: 'QC',
      totalStaked: 0,
      rewardRate: 0.12, // 12% APY
      lockPeriod: 0, // Sin lock
      minStake: 10,
      maxStake: 1000000,
      active: true,
      createdAt: Date.now(),
      lastRewardUpdate: Date.now()
    })

    // Pool de staking QC con lock (mayor recompensa)
    this.stakingPools.set('qc_locked', {
      id: 'qc_locked',
      name: 'Quantum Coin Locked Staking',
      token: 'QC',
      totalStaked: 0,
      rewardRate: 0.25, // 25% APY
      lockPeriod: 2592000000, // 30 días
      minStake: 100,
      maxStake: 1000000,
      active: true,
      createdAt: Date.now(),
      lastRewardUpdate: Date.now()
    })

    // Yield Farm QC-ETH
    this.yieldFarms.set('qc_eth_farm', {
      id: 'qc_eth_farm',
      name: 'QC-ETH Liquidity Farm',
      poolId: 'qc_eth_lp',
      rewardToken: 'QC',
      totalLiquidity: 0,
      rewardRate: 0.35, // 35% APY
      multiplier: 2.0,
      active: true,
      createdAt: Date.now(),
      lastRewardUpdate: Date.now()
    })

    // Pool de liquidez QC-ETH
    this.liquidityPools.set('qc_eth_lp', {
      id: 'qc_eth_lp',
      name: 'QC-ETH Liquidity Pool',
      token0: 'QC',
      token1: 'ETH',
      reserve0: 0,
      reserve1: 0,
      totalSupply: 0,
      fee: 0.003, // 0.3%
      active: true,
      createdAt: Date.now()
    })

    console.log('🏊 Pools por defecto inicializados')
  }

  /**
   * 🔒 Stake tokens en un pool
   */
  public stakeTokens(
    poolId: string,
    user: string,
    amount: number
  ): StakeResult {
    const pool = this.stakingPools.get(poolId)
    if (!pool) throw new Error('Pool no encontrado')
    if (!pool.active) throw new Error('Pool inactivo')
    if (amount < pool.minStake) throw new Error(`Stake mínimo: ${pool.minStake}`)
    if (amount > pool.maxStake) throw new Error(`Stake máximo: ${pool.maxStake}`)

    // Actualizar recompensas antes del stake
    this.updatePoolRewards(pool)

    // Calcular recompensas pendientes del usuario
    const userStakeInfo = this.getUserStakeInfo(user, poolId)
    const pendingRewards = this.calculatePendingRewards(userStakeInfo, pool)

    // Crear o actualizar stake del usuario
    if (!this.userStakes.has(user)) {
      this.userStakes.set(user, [])
    }

    const userStakes = this.userStakes.get(user)!
    let existingStake = userStakes.find(s => s.poolId === poolId)

    if (!existingStake) {
      existingStake = {
        poolId,
        amount: 0,
        rewardDebt: 0,
        stakedAt: Date.now(),
        unlocksAt: pool.lockPeriod > 0 ? Date.now() + pool.lockPeriod : 0,
        pendingRewards: 0
      }
      userStakes.push(existingStake)
    }

    existingStake.amount += amount
    existingStake.rewardDebt = (existingStake.amount * pool.rewardRate) / 100
    existingStake.pendingRewards += pendingRewards

    // Actualizar pool
    pool.totalStaked += amount
    pool.lastRewardUpdate = Date.now()

    // Actualizar estadísticas del protocolo
    this.protocolStats.totalValueLocked += amount
    this.protocolStats.totalStakers = new Set(Array.from(this.userStakes.keys())).size

    const result: StakeResult = {
      poolId,
      user,
      amount,
      totalStaked: existingStake.amount,
      pendingRewards,
      unlocksAt: existingStake.unlocksAt,
      estimatedDailyReward: this.calculateDailyReward(existingStake.amount, pool.rewardRate),
      transactionHash: SimpleHash.sha256(`stake_${poolId}_${user}_${Date.now()}`)
    }

    console.log(`🔒 ${user} stakeó ${amount} ${pool.token} en ${pool.name}`)
    return result
  }

  /**
   * 🔓 Unstake tokens de un pool
   */
  public unstakeTokens(
    poolId: string,
    user: string,
    amount: number
  ): UnstakeResult {
    const pool = this.stakingPools.get(poolId)
    if (!pool) throw new Error('Pool no encontrado')

    const userStakes = this.userStakes.get(user)
    if (!userStakes) throw new Error('Usuario no tiene stakes')

    const userStake = userStakes.find(s => s.poolId === poolId)
    if (!userStake) throw new Error('Usuario no tiene stake en este pool')
    if (userStake.amount < amount) throw new Error('Cantidad insuficiente stakeada')

    // Verificar período de lock
    if (userStake.unlocksAt > Date.now()) {
      throw new Error(`Tokens bloqueados hasta ${new Date(userStake.unlocksAt)}`)
    }

    // Actualizar recompensas antes del unstake
    this.updatePoolRewards(pool)

    // Calcular recompensas pendientes
    const pendingRewards = this.calculatePendingRewards(userStake, pool)

    // Aplicar fee por unstake temprano si aplica
    let fee = 0
    if (pool.lockPeriod > 0 && Date.now() - userStake.stakedAt < pool.lockPeriod / 2) {
      fee = amount * 0.05 // 5% fee por unstake temprano
    }

    const amountAfterFee = amount - fee

    // Actualizar stake del usuario
    userStake.amount -= amount
    userStake.rewardDebt = (userStake.amount * pool.rewardRate) / 100
    userStake.pendingRewards += pendingRewards

    // Actualizar pool
    pool.totalStaked -= amount

    // Actualizar estadísticas del protocolo
    this.protocolStats.totalValueLocked -= amount
    this.protocolStats.protocolFees += fee

    const result: UnstakeResult = {
      poolId,
      user,
      amountRequested: amount,
      amountReceived: amountAfterFee,
      fee,
      pendingRewards,
      remainingStaked: userStake.amount,
      transactionHash: SimpleHash.sha256(`unstake_${poolId}_${user}_${Date.now()}`)
    }

    console.log(`🔓 ${user} unstakeó ${amount} ${pool.token} (recibió ${amountAfterFee} después de fees)`)
    return result
  }

  /**
   * 🎁 Reclamar recompensas
   */
  public claimRewards(user: string, poolId?: string): ClaimResult {
    const userStakes = this.userStakes.get(user)
    if (!userStakes) throw new Error('Usuario no tiene stakes')

    let totalRewards = 0
    const claimedPools: string[] = []

    const stakesToProcess = poolId 
      ? userStakes.filter(s => s.poolId === poolId)
      : userStakes

    for (const userStake of stakesToProcess) {
      const pool = this.stakingPools.get(userStake.poolId)
      if (!pool) continue

      this.updatePoolRewards(pool)
      const rewards = this.calculatePendingRewards(userStake, pool)
      
      totalRewards += rewards + userStake.pendingRewards
      userStake.pendingRewards = 0
      userStake.rewardDebt = (userStake.amount * pool.rewardRate) / 100
      
      claimedPools.push(userStake.poolId)
    }

    // Actualizar estadísticas del protocolo
    this.protocolStats.totalRewardsDistributed += totalRewards

    const result: ClaimResult = {
      user,
      totalRewards,
      claimedPools,
      transactionHash: SimpleHash.sha256(`claim_${user}_${Date.now()}`)
    }

    console.log(`🎁 ${user} reclamó ${totalRewards} QC en recompensas`)
    return result
  }

  /**
   * 🚜 Depositar en yield farm
   */
  public depositToFarm(
    farmId: string,
    user: string,
    lpTokenAmount: number
  ): FarmDepositResult {
    const farm = this.yieldFarms.get(farmId)
    if (!farm) throw new Error('Farm no encontrado')
    if (!farm.active) throw new Error('Farm inactivo')

    // Actualizar recompensas del farm
    this.updateFarmRewards(farm)

    // Crear o actualizar posición del usuario en el farm
    if (!this.userStakes.has(user)) {
      this.userStakes.set(user, [])
    }

    const userStakes = this.userStakes.get(user)!
    let existingFarmStake = userStakes.find(s => s.poolId === farmId)

    if (!existingFarmStake) {
      existingFarmStake = {
        poolId: farmId,
        amount: 0,
        rewardDebt: 0,
        stakedAt: Date.now(),
        unlocksAt: 0,
        pendingRewards: 0
      }
      userStakes.push(existingFarmStake)
    }

    const pendingRewards = this.calculateFarmPendingRewards(existingFarmStake, farm)
    
    existingFarmStake.amount += lpTokenAmount
    existingFarmStake.rewardDebt = (existingFarmStake.amount * farm.rewardRate * farm.multiplier) / 100
    existingFarmStake.pendingRewards += pendingRewards

    // Actualizar farm
    farm.totalLiquidity += lpTokenAmount
    farm.lastRewardUpdate = Date.now()

    const result: FarmDepositResult = {
      farmId,
      user,
      lpTokenAmount,
      totalDeposited: existingFarmStake.amount,
      pendingRewards,
      estimatedDailyReward: this.calculateDailyReward(
        existingFarmStake.amount, 
        farm.rewardRate * farm.multiplier
      ),
      transactionHash: SimpleHash.sha256(`farm_deposit_${farmId}_${user}_${Date.now()}`)
    }

    console.log(`🚜 ${user} depositó ${lpTokenAmount} LP tokens en ${farm.name}`)
    return result
  }

  /**
   * 🗳️ Crear propuesta de gobernanza
   */
  public createProposal(
    creator: string,
    title: string,
    description: string,
    actions: ProposalAction[],
    votingPeriod: number = 604800000 // 7 días
  ): string {
    const proposalId = `prop_${++this.lastProposalId}`
    const endsAt = Date.now() + votingPeriod

    const proposal: GovernanceProposal = {
      id: proposalId,
      title,
      description,
      proposer: creator,
      actions,
      votesFor: 0,
      votesAgainst: 0,
      status: 'active',
      createdAt: Date.now(),
      endsAt,
      executed: false,
      quorumRequired: 100000, // 100k QC stakeados
      passThreshold: 0.6 // 60% a favor
    }

    this.proposals.set(proposalId, proposal)
    this.votes.set(proposalId, [])

    console.log(`🗳️ Propuesta creada: ${title} (${proposalId})`)
    return proposalId
  }

  /**
   * ✅ Votar en propuesta
   */
  public voteOnProposal(
    proposalId: string,
    voter: string,
    support: boolean,
    votingPower?: number
  ): VoteResult {
    const proposal = this.proposals.get(proposalId)
    if (!proposal) throw new Error('Propuesta no encontrada')
    if (proposal.status !== 'active') throw new Error('Propuesta no está activa')
    if (Date.now() > proposal.endsAt) throw new Error('Período de votación terminado')

    const proposalVotes = this.votes.get(proposalId)!
    
    // Verificar si ya votó
    const existingVote = proposalVotes.find(v => v.voter === voter)
    if (existingVote) throw new Error('Usuario ya votó en esta propuesta')

    // Calcular poder de voto basado en tokens stakeados
    const userVotingPower = votingPower || this.calculateVotingPower(voter)
    
    const vote: Vote = {
      voter,
      support,
      power: userVotingPower,
      timestamp: Date.now(),
      transactionHash: SimpleHash.sha256(`vote_${proposalId}_${voter}_${Date.now()}`)
    }

    proposalVotes.push(vote)

    // Actualizar conteos de votos
    if (support) {
      proposal.votesFor += userVotingPower
    } else {
      proposal.votesAgainst += userVotingPower
    }

    const result: VoteResult = {
      proposalId,
      voter,
      support,
      votingPower: userVotingPower,
      currentVotesFor: proposal.votesFor,
      currentVotesAgainst: proposal.votesAgainst,
      transactionHash: vote.transactionHash
    }

    console.log(`✅ ${voter} votó ${support ? 'A FAVOR' : 'EN CONTRA'} de ${proposal.title}`)
    return result
  }

  /**
   * ⚡ Ejecutar propuesta aprobada
   */
  public executeProposal(proposalId: string, executor: string): ExecutionResult {
    const proposal = this.proposals.get(proposalId)
    if (!proposal) throw new Error('Propuesta no encontrada')
    if (proposal.executed) throw new Error('Propuesta ya ejecutada')
    if (Date.now() < proposal.endsAt) throw new Error('Período de votación aún activo')

    const totalVotes = proposal.votesFor + proposal.votesAgainst
    
    // Verificar quórum
    if (totalVotes < proposal.quorumRequired) {
      proposal.status = 'failed'
      throw new Error('No se alcanzó el quórum requerido')
    }

    // Verificar umbral de aprobación
    const supportRatio = proposal.votesFor / totalVotes
    if (supportRatio < proposal.passThreshold) {
      proposal.status = 'rejected'
      throw new Error('Propuesta rechazada por votación')
    }

    // Ejecutar acciones de la propuesta
    const executedActions: string[] = []
    
    for (const action of proposal.actions) {
      try {
        this.executeProposalAction(action)
        executedActions.push(action.type)
      } catch (error) {
        console.error(`Error ejecutando acción ${action.type}:`, error)
      }
    }

    proposal.status = 'executed'
    proposal.executed = true

    const result: ExecutionResult = {
      proposalId,
      executor,
      executedActions,
      totalVotes,
      supportRatio,
      transactionHash: SimpleHash.sha256(`execute_${proposalId}_${Date.now()}`)
    }

    console.log(`⚡ Propuesta ${proposal.title} ejecutada exitosamente`)
    return result
  }

  /**
   * 🔄 Ejecutar acción de propuesta
   */
  private executeProposalAction(action: ProposalAction): void {
    switch (action.type) {
      case 'update_reward_rate':
        const pool = this.stakingPools.get(action.targetPool!)
        if (pool) {
          pool.rewardRate = action.newValue!
          console.log(`Tasa de recompensa actualizada para ${action.targetPool}: ${action.newValue}%`)
        }
        break

      case 'create_pool':
        // Crear nuevo pool de staking
        console.log(`Creando nuevo pool: ${action.description}`)
        break

      case 'pause_pool':
        const poolToPause = this.stakingPools.get(action.targetPool!)
        if (poolToPause) {
          poolToPause.active = false
          console.log(`Pool pausado: ${action.targetPool}`)
        }
        break

      case 'update_fee':
        // Actualizar fees del protocolo
        console.log(`Actualizando fees: ${action.description}`)
        break

      default:
        console.log(`Acción no reconocida: ${action.type}`)
    }
  }

  /**
   * 🔢 Calcular poder de voto
   */
  private calculateVotingPower(user: string): number {
    const userStakes = this.userStakes.get(user)
    if (!userStakes) return 0

    let totalPower = 0

    for (const stake of userStakes) {
      const pool = this.stakingPools.get(stake.poolId)
      if (pool) {
        // El poder de voto es proporcional al stake, con multiplicador por tiempo de lock
        const timeMultiplier = pool.lockPeriod > 0 ? 1.5 : 1.0
        totalPower += stake.amount * timeMultiplier
      }
    }

    return totalPower
  }

  /**
   * 🔄 Actualizar recompensas de pool
   */
  private updatePoolRewards(pool: StakingPool): void {
    const timeElapsed = Date.now() - pool.lastRewardUpdate
    // Actualizar acumuladores de recompensas
    pool.lastRewardUpdate = Date.now()
  }

  /**
   * 🚜 Actualizar recompensas de farm
   */
  private updateFarmRewards(farm: YieldFarm): void {
    const timeElapsed = Date.now() - farm.lastRewardUpdate
    // Actualizar acumuladores de recompensas del farm
    farm.lastRewardUpdate = Date.now()
  }

  /**
   * 💰 Calcular recompensas pendientes
   */
  private calculatePendingRewards(userStake: UserStakeInfo, pool: StakingPool): number {
    const timeElapsed = Date.now() - pool.lastRewardUpdate
    const secondsPerYear = 365 * 24 * 60 * 60 * 1000
    
    return (userStake.amount * pool.rewardRate * timeElapsed) / secondsPerYear / 100
  }

  /**
   * 🚜 Calcular recompensas pendientes de farm
   */
  private calculateFarmPendingRewards(userStake: UserStakeInfo, farm: YieldFarm): number {
    const timeElapsed = Date.now() - farm.lastRewardUpdate
    const secondsPerYear = 365 * 24 * 60 * 60 * 1000
    
    return (userStake.amount * farm.rewardRate * farm.multiplier * timeElapsed) / secondsPerYear / 100
  }

  /**
   * 📊 Calcular recompensa diaria estimada
   */
  private calculateDailyReward(amount: number, apy: number): number {
    return (amount * apy) / 365 / 100
  }

  /**
   * 👤 Obtener información de stake del usuario
   */
  private getUserStakeInfo(user: string, poolId: string): UserStakeInfo {
    const userStakes = this.userStakes.get(user)
    if (!userStakes) {
      return {
        poolId,
        amount: 0,
        rewardDebt: 0,
        stakedAt: Date.now(),
        unlocksAt: 0,
        pendingRewards: 0
      }
    }

    return userStakes.find(s => s.poolId === poolId) || {
      poolId,
      amount: 0,
      rewardDebt: 0,
      stakedAt: Date.now(),
      unlocksAt: 0,
      pendingRewards: 0
    }
  }

  /**
   * 📊 Obtener estadísticas del protocolo
   */
  public getProtocolStats(): ProtocolStats {
    // Recalcular APY promedio
    const activePools = Array.from(this.stakingPools.values()).filter(p => p.active)
    const totalTVL = activePools.reduce((sum, pool) => sum + pool.totalStaked, 0)
    
    if (totalTVL > 0) {
      this.protocolStats.averageAPY = activePools.reduce((sum, pool) => 
        sum + (pool.rewardRate * pool.totalStaked / totalTVL), 0
      )
    }

    this.protocolStats.totalValueLocked = totalTVL

    return { ...this.protocolStats }
  }

  /**
   * 🏊 Obtener todos los pools activos
   */
  public getActivePools(): StakingPool[] {
    return Array.from(this.stakingPools.values()).filter(p => p.active)
  }

  /**
   * 🚜 Obtener todos los farms activos
   */
  public getActiveFarms(): YieldFarm[] {
    return Array.from(this.yieldFarms.values()).filter(f => f.active)
  }

  /**
   * 🗳️ Obtener propuestas activas
   */
  public getActiveProposals(): GovernanceProposal[] {
    return Array.from(this.proposals.values()).filter(p => p.status === 'active')
  }

  /**
   * 👤 Obtener posiciones del usuario
   */
  public getUserPositions(user: string): UserDeFiPositions {
    const userStakes = this.userStakes.get(user) || []
    
    const stakingPositions = userStakes.filter(s => this.stakingPools.has(s.poolId))
    const farmingPositions = userStakes.filter(s => this.yieldFarms.has(s.poolId))
    
    let totalStaked = 0
    let totalPendingRewards = 0

    for (const stake of userStakes) {
      totalStaked += stake.amount
      totalPendingRewards += stake.pendingRewards

      const pool = this.stakingPools.get(stake.poolId)
      if (pool) {
        totalPendingRewards += this.calculatePendingRewards(stake, pool)
      }

      const farm = this.yieldFarms.get(stake.poolId)
      if (farm) {
        totalPendingRewards += this.calculateFarmPendingRewards(stake, farm)
      }
    }

    return {
      user,
      stakingPositions,
      farmingPositions,
      totalStaked,
      totalPendingRewards,
      votingPower: this.calculateVotingPower(user)
    }
  }
}

// Interfaces adicionales
interface UserStakeInfo {
  poolId: string
  amount: number
  rewardDebt: number
  stakedAt: number
  unlocksAt: number
  pendingRewards: number
}

interface ProtocolStats {
  totalValueLocked: number
  totalStakers: number
  totalRewardsDistributed: number
  averageAPY: number
  protocolFees: number
}

interface StakeResult {
  poolId: string
  user: string
  amount: number
  totalStaked: number
  pendingRewards: number
  unlocksAt: number
  estimatedDailyReward: number
  transactionHash: string
}

interface UnstakeResult {
  poolId: string
  user: string
  amountRequested: number
  amountReceived: number
  fee: number
  pendingRewards: number
  remainingStaked: number
  transactionHash: string
}

interface ClaimResult {
  user: string
  totalRewards: number
  claimedPools: string[]
  transactionHash: string
}

interface FarmDepositResult {
  farmId: string
  user: string
  lpTokenAmount: number
  totalDeposited: number
  pendingRewards: number
  estimatedDailyReward: number
  transactionHash: string
}

interface VoteResult {
  proposalId: string
  voter: string
  support: boolean
  votingPower: number
  currentVotesFor: number
  currentVotesAgainst: number
  transactionHash: string
}

interface ExecutionResult {
  proposalId: string
  executor: string
  executedActions: string[]
  totalVotes: number
  supportRatio: number
  transactionHash: string
}

interface ProposalAction {
  type: 'update_reward_rate' | 'create_pool' | 'pause_pool' | 'update_fee'
  description: string
  targetPool?: string
  newValue?: number
}

interface UserDeFiPositions {
  user: string
  stakingPositions: UserStakeInfo[]
  farmingPositions: UserStakeInfo[]
  totalStaked: number
  totalPendingRewards: number
  votingPower: number
}