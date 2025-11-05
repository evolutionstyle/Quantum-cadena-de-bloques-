/**
 * ✅ Quantum Validator - Validador de bloques y transacciones cuánticas
 * Sistema de validación que verifica propiedades cuánticas y criptográficas
 */

import { QBlock } from '../blockchain/qblock'
import { QuantumTransaction, QuantumConfig } from '../types'
import { QuantumCrypto } from '../crypto/quantum-crypto'

export class QuantumValidator {
  private quantumCrypto: QuantumCrypto
  private config: QuantumConfig

  constructor(config: QuantumConfig) {
    this.config = config
    this.quantumCrypto = new QuantumCrypto()
  }

  /**
   * ✅ Valida un bloque cuántico
   */
  public validateBlock(block: QBlock, previousBlock?: QBlock): boolean {
    // Validaciones básicas
    if (!this.validateBasicStructure(block)) {
      return false
    }

    // Validar propiedades cuánticas
    if (!this.validateQuantumProperties(block)) {
      return false
    }

    // Validar enlace con bloque anterior
    if (previousBlock && !this.validateBlockLink(block, previousBlock)) {
      return false
    }

    // Validar todas las transacciones
    for (const transaction of block.data) {
      if (!this.validateTransaction(transaction)) {
        return false
      }
    }

    return true
  }

  /**
   * 💳 Valida una transacción cuántica
   */
  public validateTransaction(transaction: QuantumTransaction): boolean {
    // Validar estructura básica
    if (!transaction.id || !transaction.from || !transaction.to) {
      console.error('❌ Transacción con estructura incompleta')
      return false
    }

    // Validar cantidad
    if (transaction.amount < 0) {
      console.error('❌ Cantidad negativa en transacción')
      return false
    }

    // Validar timestamp
    if (transaction.timestamp > Date.now() + 300000) { // 5 minutos futuro máximo
      console.error('❌ Timestamp de transacción en el futuro')
      return false
    }

    // Validar firma cuántica
    if (!this.validateQuantumSignature(transaction.quantumSignature)) {
      console.error('❌ Firma cuántica inválida')
      return false
    }

    // Validar encriptación post-cuántica
    if (!this.validatePostQuantumEncryption(transaction.postQuantumEncryption)) {
      console.error('❌ Encriptación post-cuántica inválida')
      return false
    }

    return true
  }

  /**
   * 🏗️ Valida estructura básica del bloque
   */
  private validateBasicStructure(block: QBlock): boolean {
    if (block.index < 0) {
      console.error('❌ Índice de bloque inválido')
      return false
    }

    if (!block.quantumHash || block.quantumHash.length === 0) {
      console.error('❌ Hash cuántico faltante')
      return false
    }

    if (!block.merkleRoot || block.merkleRoot.length === 0) {
      console.error('❌ Merkle root faltante')
      return false
    }

    if (block.difficulty < 1) {
      console.error('❌ Dificultad inválida')
      return false
    }

    return true
  }

  /**
   * 🔬 Valida propiedades cuánticas del bloque
   */
  private validateQuantumProperties(block: QBlock): boolean {
    // Validar prueba cuántica
    if (!this.quantumCrypto.verifyQuantumProof(block.quantumProof)) {
      console.error('❌ Prueba cuántica inválida')
      return false
    }

    // Validar entrelazamiento
    if (!this.validateEntanglement(block)) {
      console.error('❌ Prueba de entrelazamiento inválida')
      return false
    }

    // Validar coherencia cuántica
    if (!this.validateQuantumCoherence(block)) {
      console.error('❌ Coherencia cuántica insuficiente')
      return false
    }

    // Validar ventaja cuántica
    if (!block.quantumProof.quantumAdvantage) {
      console.warn('⚠️ Bloque sin ventaja cuántica')
      // No invalidamos, pero advertimos
    }

    return true
  }

  /**
   * 🔗 Valida enlace entre bloques
   */
  private validateBlockLink(block: QBlock, previousBlock: QBlock): boolean {
    if (block.previousHash !== previousBlock.quantumHash) {
      console.error('❌ Hash anterior incorrecto')
      return false
    }

    if (block.index !== previousBlock.index + 1) {
      console.error('❌ Índice de bloque incorrecto')
      return false
    }

    if (block.timestamp <= previousBlock.timestamp) {
      console.error('❌ Timestamp de bloque inválido')
      return false
    }

    return true
  }

  /**
   * ✍️ Valida firma cuántica
   */
  private validateQuantumSignature(signature: any): boolean {
    if (!signature.quantumResistant) {
      return false
    }

    if (!signature.signature || signature.signature.length === 0) {
      return false
    }

    if (!signature.publicKey || signature.publicKey.length === 0) {
      return false
    }

    const validAlgorithms = ['CRYSTALS-Dilithium', 'FALCON', 'SPHINCS+']
    if (!validAlgorithms.includes(signature.algorithm)) {
      return false
    }

    return this.quantumCrypto.verifyQuantumSignature(signature)
  }

  /**
   * 🔐 Valida encriptación post-cuántica
   */
  private validatePostQuantumEncryption(encryption: any): boolean {
    if (!encryption.encryptedData || encryption.encryptedData.length === 0) {
      return false
    }

    if (!encryption.keyExchange || encryption.keyExchange.length === 0) {
      return false
    }

    const validAlgorithms = ['CRYSTALS-KYBER', 'NTRU', 'SABER']
    if (!validAlgorithms.includes(encryption.algorithm)) {
      return false
    }

    return true
  }

  /**
   * 🔗 Valida entrelazamiento cuántico
   */
  private validateEntanglement(block: QBlock): boolean {
    const proof = block.entanglementProof

    // Verificar pares entrelazados
    if (!proof.entangledPairs || proof.entangledPairs.length === 0) {
      return false
    }

    // Verificar violación de Bell
    if (proof.bellViolation <= 2.0) {
      console.warn('⚠️ Violación de Bell insuficiente')
      return false
    }

    // Verificar test de no-localidad
    if (!proof.nonLocalityTest) {
      console.warn('⚠️ Test de no-localidad fallido')
      return false
    }

    // Verificar fidelidad de entrelazamiento
    for (const pair of proof.entangledPairs) {
      if (pair.fidelity < 0.9) {
        console.warn(`⚠️ Fidelidad baja en par ${pair.qubitA}-${pair.qubitB}`)
        return false
      }
    }

    return true
  }

  /**
   * 🌊 Valida coherencia cuántica
   */
  private validateQuantumCoherence(block: QBlock): boolean {
    const circuit = block.quantumProof.quantumCircuit

    // Verificar fidelidad del circuito
    if (circuit.fidelity < 0.8) {
      console.error('❌ Fidelidad del circuito insuficiente')
      return false
    }

    // Verificar tiempo de coherencia
    if (circuit.executionTime > this.config.coherenceTime) {
      console.error('❌ Tiempo de ejecución excede coherencia')
      return false
    }

    // Verificar complejidad cuántica
    const expectedComplexity = Math.pow(2, circuit.qubits.length) * circuit.depth
    if (block.quantumProof.complexity < expectedComplexity * 0.5) {
      console.error('❌ Complejidad cuántica insuficiente')
      return false
    }

    return true
  }

  /**
   * 📊 Calcula puntuación de calidad cuántica
   */
  public calculateQuantumQuality(block: QBlock): number {
    let score = 0

    // Fidelidad del circuito (30%)
    score += (block.quantumProof.quantumCircuit.fidelity * 30)

    // Violación de Bell (25%)
    const bellScore = Math.min(block.entanglementProof.bellViolation / 2.828, 1)
    score += (bellScore * 25)

    // Ventaja cuántica (20%)
    if (block.quantumProof.quantumAdvantage) {
      score += 20
    }

    // Complejidad relativa (15%)
    const maxComplexity = Math.pow(2, this.config.maxQubits)
    const complexityScore = Math.min(block.quantumProof.complexity / maxComplexity, 1)
    score += (complexityScore * 15)

    // Número de pares entrelazados (10%)
    const entanglementScore = Math.min(block.entanglementProof.entangledPairs.length / 8, 1)
    score += (entanglementScore * 10)

    return Math.round(score)
  }

  /**
   * 🔍 Diagnostica problemas en un bloque
   */
  public diagnoseBlock(block: QBlock): string[] {
    const issues: string[] = []

    if (block.quantumProof.quantumCircuit.fidelity < 0.9) {
      issues.push(`Fidelidad baja: ${block.quantumProof.quantumCircuit.fidelity.toFixed(3)}`)
    }

    if (block.entanglementProof.bellViolation <= 2.0) {
      issues.push(`Violación de Bell insuficiente: ${block.entanglementProof.bellViolation.toFixed(3)}`)
    }

    if (!block.quantumProof.quantumAdvantage) {
      issues.push('Sin ventaja cuántica')
    }

    if (block.quantumProof.quantumCircuit.executionTime > this.config.coherenceTime * 0.8) {
      issues.push('Tiempo de ejecución cercano al límite de coherencia')
    }

    if (block.entanglementProof.entangledPairs.length < 2) {
      issues.push('Pocos pares entrelazados')
    }

    return issues
  }
}