/**
 * 🔮 Quantum Blockchain - Blockchain principal con propiedades cuánticas
 * Sistema distribuido que utiliza entrelazamiento cuántico y criptografía post-cuántica
 */

import { QBlock } from './qblock'
import { QuantumTransaction, QuantumConfig, NetworkConfig } from '../types'
import { QuantumValidator } from '../quantum/quantum-validator'
import { NetworkManager } from '../network/network-manager'

export class QuantumBlockchain {
  public chain: QBlock[]
  public difficulty: number
  public pendingTransactions: QuantumTransaction[]
  public miningReward: number
  public quantumConfig: QuantumConfig
  public networkConfig: NetworkConfig

  private validator: QuantumValidator
  private networkManager: NetworkManager

  constructor(config?: Partial<QuantumConfig & NetworkConfig>) {
    // Configuración por defecto
    this.quantumConfig = {
      maxQubits: 16,
      errorCorrection: true,
      coherenceTime: 1000,
      gateTime: 10,
      measurementTime: 5,
      noiseModel: 'decoherence',
      ...config
    }

    this.networkConfig = {
      maxPeers: 50,
      blockTime: 10000, // 10 segundos
      difficulty: 4,
      rewardAmount: 100,
      quantumThreshold: 0.8,
      ...config
    }

    this.chain = [this.createGenesisBlock()]
    this.difficulty = this.networkConfig.difficulty
    this.pendingTransactions = []
    this.miningReward = this.networkConfig.rewardAmount

    this.validator = new QuantumValidator(this.quantumConfig)
    this.networkManager = new NetworkManager(this.networkConfig)

    console.log('🔮 Quantum Blockchain inicializada')
    console.log(`⚙️ Configuración cuántica: ${this.quantumConfig.maxQubits} qubits, ${this.quantumConfig.coherenceTime}μs coherencia`)
    console.log(`🌐 Red: máx ${this.networkConfig.maxPeers} peers, dificultad ${this.difficulty}`)
  }

  /**
   * 🏗️ Crea el bloque génesis
   */
  private createGenesisBlock(): QBlock {
    const genesisTransactions: QuantumTransaction[] = [{
      id: 'genesis',
      from: '0',
      to: 'quantum-network',
      amount: 0,
      timestamp: Date.now(),
      quantumSignature: {
        signature: new Uint8Array([0]),
        publicKey: new Uint8Array([0]),
        algorithm: 'CRYSTALS-Dilithium',
        quantumResistant: true
      },
      postQuantumEncryption: {
        encryptedData: new Uint8Array([0]),
        algorithm: 'CRYSTALS-KYBER',
        keyExchange: new Uint8Array([0])
      }
    }]

    const genesis = new QBlock(0, genesisTransactions, '0', 1)
    genesis.quantumHash = '0000000000000000000000000000000000000000000000000000000000000000'
    
    console.log('🌟 Bloque génesis creado')
    return genesis
  }

  /**
   * 🔗 Obtiene el último bloque
   */
  public getLatestBlock(): QBlock {
    return this.chain[this.chain.length - 1]
  }

  /**
   * ⛏️ Mina las transacciones pendientes
   */
  public async minePendingTransactions(miningRewardAddress: string): Promise<QBlock> {
    // Agregar transacción de recompensa
    const rewardTransaction: QuantumTransaction = {
      id: `reward-${Date.now()}`,
      from: 'system',
      to: miningRewardAddress,
      amount: this.miningReward,
      timestamp: Date.now(),
      quantumSignature: {
        signature: new Uint8Array([0]),
        publicKey: new Uint8Array([0]),
        algorithm: 'CRYSTALS-Dilithium',
        quantumResistant: true
      },
      postQuantumEncryption: {
        encryptedData: new Uint8Array([0]),
        algorithm: 'CRYSTALS-KYBER',
        keyExchange: new Uint8Array([0])
      }
    }

    this.pendingTransactions.push(rewardTransaction)

    // Crear nuevo bloque
    const block = new QBlock(
      this.chain.length,
      this.pendingTransactions,
      this.getLatestBlock().quantumHash,
      this.difficulty
    )

    console.log(`⛏️ Iniciando minado del bloque ${block.index}...`)
    
    // Minar el bloque
    await block.mineBlock()

    // Validar antes de agregar
    if (this.validator.validateBlock(block, this.getLatestBlock())) {
      this.chain.push(block)
      this.pendingTransactions = []
      
      console.log(`✅ Bloque ${block.index} agregado a la cadena`)
      console.log(`📊 Estadísticas: ${JSON.stringify(block.getStats(), null, 2)}`)
      
      // Ajustar dificultad
      this.adjustDifficulty()
      
      return block
    } else {
      console.error('❌ Bloque inválido, no se agregó a la cadena')
      throw new Error('Bloque inválido')
    }
  }

  /**
   * 💸 Crea una nueva transacción
   */
  public createTransaction(transaction: QuantumTransaction): void {
    // Validar transacción
    if (!this.validator.validateTransaction(transaction)) {
      throw new Error('Transacción inválida')
    }

    this.pendingTransactions.push(transaction)
    console.log(`💳 Transacción creada: ${transaction.amount} de ${transaction.from} a ${transaction.to}`)
  }

  /**
   * 💰 Obtiene el balance de una dirección
   */
  public getBalance(address: string): number {
    let balance = 0

    for (const block of this.chain) {
      for (const transaction of block.data) {
        if (transaction.from === address) {
          balance -= transaction.amount
        }
        if (transaction.to === address) {
          balance += transaction.amount
        }
      }
    }

    return balance
  }

  /**
   * 🔍 Busca transacción por ID
   */
  public getTransaction(transactionId: string): QuantumTransaction | null {
    for (const block of this.chain) {
      const transaction = block.data.find(tx => tx.id === transactionId)
      if (transaction) {
        return transaction
      }
    }
    return null
  }

  /**
   * ✅ Valida toda la cadena
   */
  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (!currentBlock.validateBlock(previousBlock)) {
        console.error(`❌ Bloque ${i} es inválido`)
        return false
      }

      if (currentBlock.previousHash !== previousBlock.quantumHash) {
        console.error(`❌ Hash anterior incorrecto en bloque ${i}`)
        return false
      }
    }

    console.log('✅ Cadena válida')
    return true
  }

  /**
   * ⚙️ Ajusta la dificultad automáticamente
   */
  private adjustDifficulty(): void {
    if (this.chain.length < 2) return

    const lastBlock = this.getLatestBlock()
    const previousBlock = this.chain[this.chain.length - 2]
    
    const timeDiff = lastBlock.timestamp - previousBlock.timestamp
    const targetTime = this.networkConfig.blockTime

    if (timeDiff < targetTime / 2) {
      this.difficulty++
      console.log(`⬆️ Dificultad aumentada a ${this.difficulty}`)
    } else if (timeDiff > targetTime * 2) {
      this.difficulty = Math.max(1, this.difficulty - 1)
      console.log(`⬇️ Dificultad reducida a ${this.difficulty}`)
    }
  }

  /**
   * 📊 Obtiene estadísticas de la blockchain
   */
  public getStats() {
    const totalTransactions = this.chain.reduce((sum, block) => sum + block.data.length, 0)
    const avgBlockTime = this.chain.length > 1 
      ? (this.getLatestBlock().timestamp - this.chain[1].timestamp) / (this.chain.length - 1)
      : 0

    return {
      blockCount: this.chain.length,
      totalTransactions,
      difficulty: this.difficulty,
      pendingTransactions: this.pendingTransactions.length,
      avgBlockTime: Math.round(avgBlockTime),
      chainSize: JSON.stringify(this.chain).length,
      lastBlockHash: this.getLatestBlock().quantumHash,
      quantumAdvantage: this.chain.reduce((sum, block) => 
        sum + (block.quantumProof.quantumAdvantage ? 1 : 0), 0) / this.chain.length
    }
  }

  /**
   * 🔄 Sincroniza con la red
   */
  public async synchronize(): Promise<void> {
    console.log('🔄 Sincronizando con la red cuántica...')
    await this.networkManager.synchronize(this.chain)
    console.log('✅ Sincronización completada')
  }

  /**
   * 📡 Difunde un bloque a la red
   */
  public broadcastBlock(block: QBlock): void {
    this.networkManager.broadcastBlock(block)
  }

  /**
   * 🔮 Simula efectos cuánticos en la red
   */
  public simulateQuantumEffects(): void {
    console.log('🔮 Simulando efectos cuánticos...')
    
    // Simular decoherencia
    if (Math.random() < 0.1) {
      console.log('⚠️ Decoherencia detectada en qubits')
      this.quantumConfig.coherenceTime *= 0.95
    }

    // Simular entrelazamiento de red
    if (Math.random() < 0.05) {
      console.log('🔗 Nuevo entrelazamiento cuántico establecido')
      this.networkConfig.quantumThreshold += 0.01
    }

    // Ajustar configuración
    if (this.quantumConfig.coherenceTime < 100) {
      console.log('🔧 Aplicando corrección de errores cuánticos')
      this.quantumConfig.coherenceTime = 1000
    }
  }

  /**
   * 🎨 Exporta la cadena a JSON
   */
  public toJSON() {
    return {
      config: {
        quantum: this.quantumConfig,
        network: this.networkConfig
      },
      chain: this.chain.map(block => block.toJSON()),
      stats: this.getStats()
    }
  }
}