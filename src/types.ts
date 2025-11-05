/**
 * 🔮 Quantum Blockchain - Tipos fundamentales
 * Definiciones de tipos TypeScript para el ecosistema quantum blockchain
 */

// ===== TIPOS CUÁNTICOS =====
export interface QuantumState {
  amplitudes: Complex[]
  qubits: number
  entangled: boolean
  measured: boolean
}

export interface Complex {
  real: number
  imaginary: number
}

export interface QuantumGate {
  name: string
  matrix: Complex[][]
  qubits: number[]
  unitary: boolean
}

export interface Qubit {
  id: string
  state: QuantumState
  entanglement?: string[] // IDs de qubits entrelazados
  coherenceTime: number
  fidelity: number
}

// ===== BLOCKCHAIN CUÁNTICO =====
export interface QuantumBlock {
  index: number
  timestamp: number
  data: QuantumTransaction[]
  previousHash: string
  quantumHash: string
  quantumSignature: QuantumSignature
  merkleRoot: string
  nonce: bigint
  difficulty: number
  quantumProof: QuantumProofOfWork
  entanglementProof: EntanglementProof
}

export interface QuantumTransaction {
  id: string
  from: string
  to: string
  amount: number
  timestamp: number
  quantumSignature: QuantumSignature
  postQuantumEncryption: PostQuantumCrypto
  quantumKeyDistribution?: QKDProtocol
}

export interface QuantumSignature {
  signature: Uint8Array
  publicKey: Uint8Array
  algorithm: 'CRYSTALS-Dilithium' | 'FALCON' | 'SPHINCS+'
  quantumResistant: boolean
}

export interface PostQuantumCrypto {
  encryptedData: Uint8Array
  algorithm: 'CRYSTALS-KYBER' | 'NTRU' | 'SABER'
  keyExchange: Uint8Array
}

export interface QuantumProofOfWork {
  quantumCircuit: QuantumCircuit
  measurement: QuantumMeasurement
  complexity: number
  quantumAdvantage: boolean
}

export interface EntanglementProof {
  entangledPairs: QuantumEntanglement[]
  bellViolation: number
  nonLocalityTest: boolean
}

// ===== PROTOCOLOS CUÁNTICOS =====
export interface QKDProtocol {
  protocol: 'BB84' | 'E91' | 'SARG04'
  keyLength: number
  errorRate: number
  securityParameter: number
  rawKey: Uint8Array
  siftedKey: Uint8Array
  finalKey: Uint8Array
}

export interface QuantumCircuit {
  gates: QuantumGate[]
  qubits: Qubit[]
  depth: number
  fidelity: number
  executionTime: number
}

export interface QuantumMeasurement {
  results: number[]
  probabilities: number[]
  collapse: boolean
  basis: MeasurementBasis
}

export interface QuantumEntanglement {
  qubitA: string
  qubitB: string
  entanglementType: 'Bell' | 'GHZ' | 'W'
  fidelity: number
  distance: number
}

// ===== ALGORITMOS CUÁNTICOS =====
export interface ShorAlgorithm {
  number: bigint
  factors: bigint[]
  qubits: number
  success: boolean
  iterations: number
}

export interface GroverAlgorithm {
  database: Uint8Array[]
  target: Uint8Array
  found: boolean
  iterations: number
  amplification: number
}

// ===== CONFIGURACIONES Y CONSTANTES =====
export type MeasurementBasis = 'computational' | 'hadamard' | 'diagonal'
export type QuantumError = 'decoherence' | 'gate_error' | 'measurement_error'

export interface QuantumConfig {
  maxQubits: number
  errorCorrection: boolean
  coherenceTime: number
  gateTime: number
  measurementTime: number
  noiseModel: string
}

export interface NetworkConfig {
  maxPeers: number
  blockTime: number
  difficulty: number
  rewardAmount: number
  quantumThreshold: number
}

// ===== EVENTOS DEL SISTEMA =====
export interface QuantumEvent {
  type: 'measurement' | 'entanglement' | 'decoherence' | 'gate_operation'
  timestamp: number
  data: any
  affectedQubits: string[]
}

export interface BlockchainEvent {
  type: 'block_mined' | 'transaction_confirmed' | 'quantum_consensus'
  timestamp: number
  blockIndex?: number
  transactionId?: string
  data: any
}