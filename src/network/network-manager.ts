/**
 * 🌐 Network Manager - Gestor de red peer-to-peer cuántica
 * Maneja la comunicación entre nodos y sincronización de blockchain
 */

import { QBlock } from '../blockchain/qblock'
import { NetworkConfig, QuantumEvent } from '../types'

export interface NetworkPeer {
  id: string
  address: string
  port: number
  quantumCapable: boolean
  latency: number
  reliability: number
  lastSeen: number
}

export class NetworkManager {
  private config: NetworkConfig
  private peers: Map<string, NetworkPeer>
  private isConnected: boolean
  private eventListeners: Map<string, Function[]>

  constructor(config: NetworkConfig) {
    this.config = config
    this.peers = new Map()
    this.isConnected = false
    this.eventListeners = new Map()

    this.initializeNetwork()
  }

  /**
   * 🚀 Inicializa la red cuántica
   */
  private initializeNetwork(): void {
    console.log('🌐 Inicializando red cuántica P2P...')
    
    // Simular peers iniciales
    this.addPeer({
      id: 'quantum-node-1',
      address: '192.168.1.100',
      port: 8080,
      quantumCapable: true,
      latency: 50,
      reliability: 0.95,
      lastSeen: Date.now()
    })

    this.addPeer({
      id: 'quantum-node-2', 
      address: '192.168.1.101',
      port: 8080,
      quantumCapable: true,
      latency: 75,
      reliability: 0.92,
      lastSeen: Date.now()
    })

    this.addPeer({
      id: 'classical-node-1',
      address: '192.168.1.102', 
      port: 8080,
      quantumCapable: false,
      latency: 30,
      reliability: 0.98,
      lastSeen: Date.now()
    })

    this.isConnected = true
    console.log(`✅ Red inicializada con ${this.peers.size} peers`)
  }

  /**
   * 🤝 Agrega un peer a la red
   */
  public addPeer(peer: NetworkPeer): void {
    if (this.peers.size >= this.config.maxPeers) {
      console.warn('⚠️ Máximo número de peers alcanzado')
      return
    }

    this.peers.set(peer.id, peer)
    console.log(`➕ Peer agregado: ${peer.id} (Quantum: ${peer.quantumCapable})`)
    
    this.emit('peer_connected', peer)
  }

  /**
   * 👋 Remueve un peer de la red
   */
  public removePeer(peerId: string): void {
    const peer = this.peers.get(peerId)
    if (peer) {
      this.peers.delete(peerId)
      console.log(`➖ Peer removido: ${peerId}`)
      this.emit('peer_disconnected', peer)
    }
  }

  /**
   * 📡 Difunde un bloque a todos los peers
   */
  public broadcastBlock(block: QBlock): void {
    if (!this.isConnected) {
      console.error('❌ Red no conectada')
      return
    }

    console.log(`📡 Difundiendo bloque ${block.index} a ${this.peers.size} peers`)

    const quantumPeers = Array.from(this.peers.values()).filter(p => p.quantumCapable)
    const classicalPeers = Array.from(this.peers.values()).filter(p => !p.quantumCapable)

    // Envío priorizado a peers cuánticos
    for (const peer of quantumPeers) {
      this.sendBlockToPeer(block, peer, true)
    }

    // Envío a peers clásicos con datos simplificados
    for (const peer of classicalPeers) {
      this.sendBlockToPeer(block, peer, false)
    }

    this.emit('block_broadcasted', { block, peerCount: this.peers.size })
  }

  /**
   * 📤 Envía bloque a un peer específico
   */
  private sendBlockToPeer(block: QBlock, peer: NetworkPeer, includeQuantumData: boolean): void {
    // Simular envío de red
    setTimeout(() => {
      if (Math.random() < peer.reliability) {
        console.log(`✅ Bloque ${block.index} enviado a ${peer.id}`)
        
        if (includeQuantumData) {
          // Enviar datos cuánticos completos
          this.simulateQuantumTransmission(block, peer)
        } else {
          // Enviar solo datos clásicos
          this.simulateClassicalTransmission(block, peer)
        }
      } else {
        console.warn(`⚠️ Fallo en envío a ${peer.id}`)
        this.handleTransmissionFailure(peer)
      }
    }, peer.latency)
  }

  /**
   * 🔮 Simula transmisión cuántica
   */
  private simulateQuantumTransmission(block: QBlock, peer: NetworkPeer): void {
    // Simular entrelazamiento cuántico para transmisión segura
    const entanglementLatency = Math.random() * 20 + 10 // 10-30ms
    
    setTimeout(() => {
      console.log(`🔗 Entrelazamiento cuántico establecido con ${peer.id}`)
      
      // Verificar integridad cuántica
      if (this.verifyQuantumIntegrity(block)) {
        console.log(`✨ Transmisión cuántica exitosa a ${peer.id}`)
        this.emit('quantum_transmission_success', { block, peer })
      } else {
        console.error(`❌ Fallo en integridad cuántica con ${peer.id}`)
        this.emit('quantum_transmission_failed', { block, peer })
      }
    }, entanglementLatency)
  }

  /**
   * 📺 Simula transmisión clásica
   */
  private simulateClassicalTransmission(block: QBlock, peer: NetworkPeer): void {
    // Transmisión clásica más rápida pero menos segura
    console.log(`📺 Transmisión clásica a ${peer.id}`)
    this.emit('classical_transmission', { block, peer })
  }

  /**
   * 🔄 Sincroniza blockchain con la red
   */
  public async synchronize(localChain: QBlock[]): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Red no conectada')
    }

    console.log('🔄 Sincronizando con peers...')

    const syncPromises = Array.from(this.peers.values()).map(peer => 
      this.syncWithPeer(peer, localChain)
    )

    try {
      const results = await Promise.allSettled(syncPromises)
      const successful = results.filter(r => r.status === 'fulfilled').length
      
      console.log(`✅ Sincronización completada: ${successful}/${this.peers.size} peers`)
    } catch (error) {
      console.error('❌ Error en sincronización:', error)
      throw error
    }
  }

  /**
   * 🤝 Sincroniza con un peer específico
   */
  private async syncWithPeer(peer: NetworkPeer, localChain: QBlock[]): Promise<void> {
    return new Promise((resolve, reject) => {
      // Simular solicitud de blockchain del peer
      setTimeout(() => {
        if (Math.random() < peer.reliability) {
          // Simular respuesta del peer
          const peerChainLength = localChain.length + Math.floor(Math.random() * 3) - 1
          
          if (peerChainLength > localChain.length) {
            console.log(`📥 Peer ${peer.id} tiene cadena más larga (${peerChainLength} vs ${localChain.length})`)
            this.emit('longer_chain_found', { peer, length: peerChainLength })
          }
          
          resolve()
        } else {
          reject(new Error(`Fallo de comunicación con ${peer.id}`))
        }
      }, peer.latency * 2)
    })
  }

  /**
   * 🔍 Verifica integridad cuántica
   */
  private verifyQuantumIntegrity(block: QBlock): boolean {
    // Simular verificación de propiedades cuánticas
    const fidelity = block.quantumProof.quantumCircuit.fidelity
    const bellViolation = block.entanglementProof.bellViolation
    
    return fidelity > 0.9 && bellViolation > 2.0
  }

  /**
   * ⚠️ Maneja fallos de transmisión
   */
  private handleTransmissionFailure(peer: NetworkPeer): void {
    // Reducir confiabilidad del peer
    peer.reliability *= 0.95
    peer.lastSeen = Date.now()

    if (peer.reliability < 0.5) {
      console.warn(`⚠️ Peer ${peer.id} con baja confiabilidad, considerando remoción`)
      this.emit('peer_unreliable', peer)
    }
  }

  /**
   * 📊 Obtiene estadísticas de red
   */
  public getNetworkStats() {
    const quantumPeers = Array.from(this.peers.values()).filter(p => p.quantumCapable)
    const avgLatency = Array.from(this.peers.values())
      .reduce((sum, peer) => sum + peer.latency, 0) / this.peers.size
    const avgReliability = Array.from(this.peers.values())
      .reduce((sum, peer) => sum + peer.reliability, 0) / this.peers.size

    return {
      totalPeers: this.peers.size,
      quantumPeers: quantumPeers.length,
      classicalPeers: this.peers.size - quantumPeers.length,
      avgLatency: Math.round(avgLatency),
      avgReliability: Math.round(avgReliability * 100),
      isConnected: this.isConnected,
      maxPeers: this.config.maxPeers
    }
  }

  /**
   * 🎧 Registra listener de eventos
   */
  public on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(callback)
  }

  /**
   * 📢 Emite evento
   */
  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }

  /**
   * 🔌 Desconecta de la red
   */
  public disconnect(): void {
    this.isConnected = false
    this.peers.clear()
    console.log('🔌 Desconectado de la red cuántica')
  }

  /**
   * 🎯 Encuentra el mejor peer para transmisión
   */
  public findBestPeer(requireQuantum: boolean = false): NetworkPeer | null {
    let candidates = Array.from(this.peers.values())
    
    if (requireQuantum) {
      candidates = candidates.filter(p => p.quantumCapable)
    }

    if (candidates.length === 0) return null

    // Ordenar por score combinado de latencia y confiabilidad
    candidates.sort((a, b) => {
      const scoreA = a.reliability * (1000 / (a.latency + 1))
      const scoreB = b.reliability * (1000 / (b.latency + 1))
      return scoreB - scoreA
    })

    return candidates[0]
  }

  /**
   * 🔮 Simula evento cuántico en la red
   */
  public simulateQuantumEvent(): QuantumEvent {
    const eventTypes = ['measurement', 'entanglement', 'decoherence', 'gate_operation']
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)] as any
    
    const event: QuantumEvent = {
      type: eventType,
      timestamp: Date.now(),
      data: { 
        value: Math.random(),
        peers: Array.from(this.peers.keys()).slice(0, 2)
      },
      affectedQubits: [`q${Math.floor(Math.random() * 16)}`]
    }

    console.log(`🔮 Evento cuántico: ${eventType}`)
    this.emit('quantum_event', event)
    
    return event
  }
}