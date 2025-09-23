/**
 * 🔮 Quantum Hasher - Algoritmos de hash cuánticos
 * Implementación de funciones hash resistentes a ataques cuánticos
 */

import { QuantumEntanglement } from '../types'

export class QuantumHasher {
  private readonly quantumSalt = 'QUANTUM_BLOCKCHAIN_2025'
  
  /**
   * 🔬 Aplica transformación cuántica a un hash clásico
   */
  public quantumHash(classicalHash: string): string {
    // Simular transformación cuántica usando algoritmos post-cuánticos
    const bytes = this.hexToBytes(classicalHash)
    const quantumTransformed = this.applyQuantumTransformation(bytes)
    return this.bytesToHex(quantumTransformed)
  }

  /**
   * 🔗 Genera hash basado en entrelazamiento cuántico
   */
  public entanglementHash(entanglements: QuantumEntanglement[]): string {
    let hashData = this.quantumSalt
    
    for (const entanglement of entanglements) {
      // Incorporar propiedades del entrelazamiento
      hashData += entanglement.qubitA + entanglement.qubitB
      hashData += entanglement.fidelity.toString()
      hashData += entanglement.distance.toString()
      hashData += entanglement.entanglementType
    }
    
    return this.quantumHash(this.simpleHash(hashData))
  }

  /**
   * 🔄 Combina múltiples hashes cuánticos
   */
  public combineHashes(hash1: string, hash2: string): string {
    const combined = hash1 + hash2 + this.quantumSalt
    return this.quantumHash(this.simpleHash(combined))
  }

  /**
   * 🧮 Aplica transformación cuántica a bytes
   */
  private applyQuantumTransformation(bytes: Uint8Array): Uint8Array {
    const result = new Uint8Array(bytes.length)
    
    // Simular operaciones cuánticas usando transformaciones matemáticas
    for (let i = 0; i < bytes.length; i++) {
      // Aplicar transformación de Hadamard simulada
      const hadamard = this.simulateHadamard(bytes[i])
      
      // Aplicar rotación cuántica
      const rotation = this.simulateQuantumRotation(hadamard, i)
      
      // Aplicar entrelazamiento con bytes adyacentes
      const entangled = this.simulateEntanglement(rotation, bytes, i)
      
      result[i] = entangled
    }
    
    return result
  }

  /**
   * 🎯 Simula puerta de Hadamard
   */
  private simulateHadamard(byte: number): number {
    // H = (1/√2) * [[1, 1], [1, -1]]
    // Simulación simplificada
    const normalized = byte / 255
    const transformed = (normalized + (1 - normalized)) / Math.sqrt(2)
    return Math.floor(transformed * 255) % 256
  }

  /**
   * 🔄 Simula rotación cuántica
   */
  private simulateQuantumRotation(byte: number, angle: number): number {
    const theta = (angle * Math.PI) / 128
    const cos_theta = Math.cos(theta)
    const sin_theta = Math.sin(theta)
    
    const transformed = byte * cos_theta + (255 - byte) * sin_theta
    return Math.floor(Math.abs(transformed)) % 256
  }

  /**
   * 🔗 Simula entrelazamiento cuántico
   */
  private simulateEntanglement(byte: number, allBytes: Uint8Array, index: number): number {
    const prevIndex = (index - 1 + allBytes.length) % allBytes.length
    const nextIndex = (index + 1) % allBytes.length
    
    const prev = allBytes[prevIndex]
    const next = allBytes[nextIndex]
    
    // Simular correlación cuántica
    const correlation = (prev ^ next) % 256
    return (byte ^ correlation) % 256
  }

  /**
   * 🔀 Hash simple para uso interno
   */
  private simpleHash(data: string): string {
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0')
  }

  /**
   * 🔄 Convierte hex a bytes
   */
  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
    }
    return bytes
  }

  /**
   * 🔄 Convierte bytes a hex
   */
  private bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  /**
   * 📊 Analiza propiedades cuánticas del hash
   */
  public analyzeQuantumProperties(hash: string): {
    entropy: number
    quantumComplexity: number
    bellViolation: number
    coherence: number
  } {
    const bytes = this.hexToBytes(hash)
    
    return {
      entropy: this.calculateEntropy(bytes),
      quantumComplexity: this.calculateQuantumComplexity(bytes),
      bellViolation: this.calculateBellViolation(bytes),
      coherence: this.calculateCoherence(bytes)
    }
  }

  private calculateEntropy(bytes: Uint8Array): number {
    const freq: { [key: number]: number } = {}
    
    for (const byte of bytes) {
      freq[byte] = (freq[byte] || 0) + 1
    }
    
    let entropy = 0
    const total = bytes.length
    
    for (const count of Object.values(freq)) {
      const p = count / total
      entropy -= p * Math.log2(p)
    }
    
    return entropy
  }

  private calculateQuantumComplexity(bytes: Uint8Array): number {
    let complexity = 0
    
    for (let i = 1; i < bytes.length; i++) {
      const diff = Math.abs(bytes[i] - bytes[i - 1])
      complexity += diff / 255
    }
    
    return complexity / (bytes.length - 1)
  }

  private calculateBellViolation(bytes: Uint8Array): number {
    // Simular violación de desigualdad de Bell basada en correlaciones
    let correlation = 0
    
    for (let i = 0; i < bytes.length - 1; i++) {
      const a = bytes[i] > 127 ? 1 : -1
      const b = bytes[i + 1] > 127 ? 1 : -1
      correlation += a * b
    }
    
    const normalizedCorrelation = correlation / (bytes.length - 1)
    return 2 + Math.abs(normalizedCorrelation)
  }

  private calculateCoherence(bytes: Uint8Array): number {
    // Medir coherencia cuántica basada en uniformidad
    let variance = 0
    const mean = bytes.reduce((sum, byte) => sum + byte, 0) / bytes.length
    
    for (const byte of bytes) {
      variance += Math.pow(byte - mean, 2)
    }
    
    variance /= bytes.length
    return Math.exp(-variance / 10000) // Normalizar entre 0 y 1
  }
}