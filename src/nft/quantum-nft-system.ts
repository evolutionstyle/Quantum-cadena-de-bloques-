/**
 * 🎨 Quantum NFT System - Sistema de NFTs cuánticos únicos
 * NFTs con propiedades cuánticas reales: superposición, entrelazamiento y evolución
 */

import { 
  QuantumNFT, 
  QuantumNFTProperties, 
  QuantumNFTAttribute, 
  NFTRarity, 
  QuantumAura,
  PhaseTransition,
  NFTEvent
} from '../types/token-types'
import { SimpleHash } from '../utils/simple-hash'

export class QuantumNFTSystem {
  private nfts: Map<string, QuantumNFT>
  private collections: Map<string, QuantumNFTCollection>
  private nftEvents: NFTEvent[]
  private lastTokenId: number

  constructor() {
    this.nfts = new Map()
    this.collections = new Map()
    this.nftEvents = []
    this.lastTokenId = 0

    this.initializeCollections()
    console.log('🎨 Sistema de NFTs cuánticos inicializado')
  }

  /**
   * 🏛️ Inicializa colecciones por defecto
   */
  private initializeCollections(): void {
    // Colección Quantum Crystals
    this.collections.set('quantum_crystals', {
      id: 'quantum_crystals',
      name: 'Quantum Crystals',
      description: 'Cristales cuánticos con propiedades de entrelazamiento únicas',
      symbol: 'QC',
      maxSupply: 10000,
      currentSupply: 0,
      creator: 'quantum_lab',
      royaltyFee: 0.05,
      quantumProperties: {
        evolutionEnabled: true,
        entanglementCapacity: 5,
        coherenceRequired: 0.8,
        rarityDistribution: {
          'Common': 0.4,
          'Uncommon': 0.25,
          'Rare': 0.2,
          'Epic': 0.1,
          'Legendary': 0.04,
          'Quantum': 0.009,
          'Transcendent': 0.001
        }
      },
      active: true
    })

    // Colección Quantum Beings
    this.collections.set('quantum_beings', {
      id: 'quantum_beings',
      name: 'Quantum Beings',
      description: 'Entidades cuánticas conscientes que evolucionan a través del tiempo',
      symbol: 'QB',
      maxSupply: 5000,
      currentSupply: 0,
      creator: 'quantum_lab',
      royaltyFee: 0.075,
      quantumProperties: {
        evolutionEnabled: true,
        entanglementCapacity: 10,
        coherenceRequired: 0.9,
        rarityDistribution: {
          'Common': 0.3,
          'Uncommon': 0.25,
          'Rare': 0.25,
          'Epic': 0.15,
          'Legendary': 0.04,
          'Quantum': 0.009,
          'Transcendent': 0.001
        }
      },
      active: true
    })

    // Colección Quantum Weapons
    this.collections.set('quantum_weapons', {
      id: 'quantum_weapons',
      name: 'Quantum Weapons',
      description: 'Armas que utilizan principios cuánticos para efectos devastadores',
      symbol: 'QW',
      maxSupply: 2500,
      currentSupply: 0,
      creator: 'quantum_armory',
      royaltyFee: 0.1,
      quantumProperties: {
        evolutionEnabled: true,
        entanglementCapacity: 3,
        coherenceRequired: 0.95,
        rarityDistribution: {
          'Rare': 0.4,
          'Epic': 0.35,
          'Legendary': 0.2,
          'Quantum': 0.04,
          'Transcendent': 0.01
        }
      },
      active: true
    })
  }

  /**
   * 🎨 Mintear nuevo NFT cuántico
   */
  public mintQuantumNFT(
    collectionId: string,
    recipient: string,
    name?: string,
    description?: string
  ): QuantumNFT {
    const collection = this.collections.get(collectionId)
    if (!collection || !collection.active) {
      throw new Error('Colección no encontrada o inactiva')
    }

    if (collection.currentSupply >= collection.maxSupply) {
      throw new Error('Colección completa')
    }

    const tokenId = ++this.lastTokenId
    const nftId = `${collectionId}_${tokenId}`

    // Generar rareza
    const rarity = this.generateRarity(collection.quantumProperties.rarityDistribution)
    
    // Generar propiedades cuánticas únicas
    const quantumProperties = this.generateQuantumProperties(rarity, collection)
    
    // Generar atributos basados en la colección
    const attributes = this.generateAttributes(collectionId, rarity, quantumProperties)
    
    // Generar imagen procedural
    const image = this.generateProceduralImage(collectionId, tokenId, quantumProperties)

    const nft: QuantumNFT = {
      id: nftId,
      tokenId: BigInt(tokenId),
      name: name || this.generateName(collectionId, rarity),
      description: description || this.generateDescription(collectionId, rarity),
      image,
      attributes,
      owner: recipient,
      creator: collection.creator,
      createdAt: Date.now(),
      quantumProperties,
      rarity,
      collection: collectionId
    }

    this.nfts.set(nftId, nft)
    collection.currentSupply++

    // Registrar evento
    this.recordEvent({
      type: 'mint',
      nftId,
      to: recipient,
      timestamp: Date.now(),
      blockNumber: this.nftEvents.length + 1,
      transactionHash: SimpleHash.sha256(`mint_${nftId}_${Date.now()}`),
      metadata: { rarity, collection: collectionId }
    })

    console.log(`🎨 NFT cuántico minteado: ${nftId} (${rarity}) para ${recipient}`)
    return nft
  }

  /**
   * 🔄 Evolucionar NFT
   */
  public evolveNFT(nftId: string, catalyst?: string): QuantumNFT {
    const nft = this.nfts.get(nftId)
    if (!nft) throw new Error('NFT no encontrado')

    const collection = this.collections.get(nft.collection!)!
    if (!collection.quantumProperties.evolutionEnabled) {
      throw new Error('Evolución no habilitada para esta colección')
    }

    // Verificar cooldown de evolución
    const lastEvolution = nft.quantumProperties.phaseTransitions
      .filter(pt => pt.trigger === 'time')
      .sort((a, b) => b.timestamp - a.timestamp)[0]

    if (lastEvolution && Date.now() - lastEvolution.timestamp < 86400000) {
      throw new Error('Cooldown de evolución activo')
    }

    // Calcular probabilidad de evolución
    let evolutionProbability = 0.1 + (nft.quantumProperties.evolutionStage * 0.05)
    
    if (catalyst) {
      evolutionProbability *= 2 // Catalizador duplica probabilidad
    }

    // Factor de coherencia
    evolutionProbability *= nft.quantumProperties.coherencePattern.reduce((a, b) => a + b, 0) / nft.quantumProperties.coherencePattern.length

    // Ejecutar evolución
    if (Math.random() < evolutionProbability) {
      this.executeEvolution(nft, catalyst)
      
      this.recordEvent({
        type: 'evolution',
        nftId,
        timestamp: Date.now(),
        blockNumber: this.nftEvents.length + 1,
        transactionHash: SimpleHash.sha256(`evolve_${nftId}_${Date.now()}`),
        metadata: { 
          newStage: nft.quantumProperties.evolutionStage,
          catalyst,
          probability: evolutionProbability
        }
      })

      console.log(`🔄 NFT ${nftId} evolucionó a etapa ${nft.quantumProperties.evolutionStage}`)
    } else {
      throw new Error('Evolución fallida - probabilidad insuficiente')
    }

    return nft
  }

  /**
   * 🔗 Entrelazar NFTs
   */
  public entangleNFTs(nftId1: string, nftId2: string): void {
    const nft1 = this.nfts.get(nftId1)
    const nft2 = this.nfts.get(nftId2)
    
    if (!nft1 || !nft2) throw new Error('NFT no encontrado')
    if (nft1.id === nft2.id) throw new Error('No se puede entrelazar consigo mismo')

    // Verificar capacidad de entrelazamiento
    const collection1 = this.collections.get(nft1.collection!)!
    const collection2 = this.collections.get(nft2.collection!)!

    if (nft1.quantumProperties.entanglementNetwork.length >= collection1.quantumProperties.entanglementCapacity) {
      throw new Error('NFT1 ha alcanzado su capacidad máxima de entrelazamiento')
    }

    if (nft2.quantumProperties.entanglementNetwork.length >= collection2.quantumProperties.entanglementCapacity) {
      throw new Error('NFT2 ha alcanzado su capacidad máxima de entrelazamiento')
    }

    // Verificar si ya están entrelazados
    if (nft1.quantumProperties.entanglementNetwork.includes(nft2.id)) {
      throw new Error('NFTs ya están entrelazados')
    }

    // Crear entrelazamiento bidireccional
    nft1.quantumProperties.entanglementNetwork.push(nft2.id)
    nft2.quantumProperties.entanglementNetwork.push(nft1.id)

    // Sincronizar algunas propiedades
    this.synchronizeEntangledProperties(nft1, nft2)

    // Registrar transición de fase
    const transition: PhaseTransition = {
      fromState: 'independent',
      toState: 'entangled',
      timestamp: Date.now(),
      trigger: 'entanglement',
      probability: 1.0
    }

    nft1.quantumProperties.phaseTransitions.push(transition)
    nft2.quantumProperties.phaseTransitions.push(transition)

    this.recordEvent({
      type: 'entanglement',
      nftId: nftId1,
      timestamp: Date.now(),
      blockNumber: this.nftEvents.length + 1,
      transactionHash: SimpleHash.sha256(`entangle_${nftId1}_${nftId2}_${Date.now()}`),
      metadata: { entangledWith: nftId2 }
    })

    console.log(`🔗 NFTs entrelazados: ${nftId1} ↔ ${nftId2}`)
  }

  /**
   * 👁️ Observar NFT (colapsar superposición)
   */
  public observeNFT(nftId: string, observer: string): QuantumNFT {
    const nft = this.nfts.get(nftId)
    if (!nft) throw new Error('NFT no encontrado')

    // Colapsar propiedades en superposición
    const collapsedProperties = this.collapseQuantumProperties(nft.quantumProperties)
    nft.quantumProperties = collapsedProperties

    // Actualizar aura basada en observación
    nft.quantumProperties.quantumAura.visibility = true
    nft.quantumProperties.quantumAura.intensity *= 1.1

    // Registrar transición de fase
    const transition: PhaseTransition = {
      fromState: 'superposition',
      toState: 'observed',
      timestamp: Date.now(),
      trigger: 'observation',
      probability: 1.0
    }

    nft.quantumProperties.phaseTransitions.push(transition)

    this.recordEvent({
      type: 'observation',
      nftId,
      timestamp: Date.now(),
      blockNumber: this.nftEvents.length + 1,
      transactionHash: SimpleHash.sha256(`observe_${nftId}_${Date.now()}`),
      metadata: { observer }
    })

    console.log(`👁️ NFT ${nftId} observado por ${observer}`)
    return nft
  }

  /**
   * 🎲 Generar rareza basada en distribución
   */
  private generateRarity(distribution: Record<string, number>): NFTRarity {
    const random = Math.random()
    let cumulative = 0

    for (const [rarity, probability] of Object.entries(distribution)) {
      cumulative += probability
      if (random <= cumulative) {
        return rarity as NFTRarity
      }
    }

    return 'Common'
  }

  /**
   * 🔬 Generar propiedades cuánticas
   */
  private generateQuantumProperties(rarity: NFTRarity, _collection: QuantumNFTCollection): QuantumNFTProperties {
    const rarityMultiplier = this.getRarityMultiplier(rarity)
    
    return {
      quantumDNA: this.generateQuantumDNA(),
      entanglementNetwork: [],
      coherencePattern: Array.from({ length: 8 }, () => Math.random() * rarityMultiplier),
      evolutionStage: 0,
      resonanceFrequency: 440 * rarityMultiplier * (Math.random() * 2 + 0.5),
      quantumAura: this.generateQuantumAura(rarity),
      phaseTransitions: []
    }
  }

  /**
   * 🧬 Generar DNA cuántico único
   */
  private generateQuantumDNA(): string {
    const quantumBases = ['Q', 'U', 'A', 'N', 'T', 'M'] // Bases cuánticas
    const length = 64
    
    let dna = ''
    for (let i = 0; i < length; i++) {
      dna += quantumBases[Math.floor(Math.random() * quantumBases.length)]
    }
    
    return SimpleHash.sha256(dna)
  }

  /**
   * ✨ Generar aura cuántica
   */
  private generateQuantumAura(rarity: NFTRarity): QuantumAura {
    const rarityColors = {
      'Common': '#888888',
      'Uncommon': '#00ff00',
      'Rare': '#0099ff',
      'Epic': '#9966ff',
      'Legendary': '#ff6600',
      'Quantum': '#ff00ff',
      'Transcendent': '#ffffff'
    }

    const patterns = ['spiral', 'wave', 'particle', 'field'] as const

    return {
      color: rarityColors[rarity],
      intensity: this.getRarityMultiplier(rarity),
      pattern: patterns[Math.floor(Math.random() * patterns.length)],
      pulsation: Math.random() * 3 + 1,
      visibility: false // Se activa al observar
    }
  }

  /**
   * 🎯 Obtener multiplicador de rareza
   */
  private getRarityMultiplier(rarity: NFTRarity): number {
    const multipliers = {
      'Common': 1.0,
      'Uncommon': 1.2,
      'Rare': 1.5,
      'Epic': 2.0,
      'Legendary': 3.0,
      'Quantum': 5.0,
      'Transcendent': 10.0
    }
    
    return multipliers[rarity]
  }

  /**
   * 📝 Generar atributos
   */
  private generateAttributes(collectionId: string, rarity: NFTRarity, properties: QuantumNFTProperties): QuantumNFTAttribute[] {
    const baseAttributes: QuantumNFTAttribute[] = [
      {
        trait_type: 'Rarity',
        value: rarity,
        rarity_score: this.getRarityMultiplier(rarity) * 100
      },
      {
        trait_type: 'Coherence Level',
        value: Math.round(properties.coherencePattern.reduce((a, b) => a + b, 0) / properties.coherencePattern.length * 100),
        quantum_property: true
      },
      {
        trait_type: 'Resonance Frequency',
        value: Math.round(properties.resonanceFrequency),
        quantum_property: true
      },
      {
        trait_type: 'Evolution Stage',
        value: properties.evolutionStage,
        evolution_locked: true
      }
    ]

    // Atributos específicos por colección
    const collectionAttributes = this.getCollectionSpecificAttributes(collectionId, rarity)
    
    return [...baseAttributes, ...collectionAttributes]
  }

  /**
   * 🏛️ Atributos específicos de colección
   */
  private getCollectionSpecificAttributes(collectionId: string, rarity: NFTRarity): QuantumNFTAttribute[] {
    switch (collectionId) {
      case 'quantum_crystals':
        return [
          {
            trait_type: 'Crystal Type',
            value: this.randomChoice(['Amethyst', 'Quartz', 'Diamond', 'Quantum Crystal', 'Dark Matter Crystal'])
          },
          {
            trait_type: 'Clarity',
            value: Math.floor(Math.random() * 100) + 1
          },
          {
            trait_type: 'Energy Capacity',
            value: Math.floor(Math.random() * 1000) * this.getRarityMultiplier(rarity)
          }
        ]

      case 'quantum_beings':
        return [
          {
            trait_type: 'Species',
            value: this.randomChoice(['Quantum Elemental', 'Photon Entity', 'Wave Function', 'Quantum AI', 'Transcendent Being'])
          },
          {
            trait_type: 'Consciousness Level',
            value: Math.floor(Math.random() * 10) + 1
          },
          {
            trait_type: 'Dimensional Reach',
            value: Math.floor(Math.random() * 11) + this.getRarityMultiplier(rarity)
          }
        ]

      case 'quantum_weapons':
        return [
          {
            trait_type: 'Weapon Type',
            value: this.randomChoice(['Quantum Blade', 'Photon Cannon', 'Entanglement Rifle', 'Void Hammer', 'Reality Sword'])
          },
          {
            trait_type: 'Damage Output',
            value: Math.floor(Math.random() * 1000) * this.getRarityMultiplier(rarity)
          },
          {
            trait_type: 'Quantum Efficiency',
            value: Math.floor(Math.random() * 100) + 1
          }
        ]

      default:
        return []
    }
  }

  /**
   * 🎨 Generar imagen procedural
   */
  private generateProceduralImage(collectionId: string, tokenId: number, properties: QuantumNFTProperties): string {
    // En una implementación real, esto generaría una imagen SVG o PNG basada en las propiedades
    const seed = SimpleHash.sha256(`${collectionId}_${tokenId}_${properties.quantumDNA}`)
    return `https://quantum-nft-generator.com/api/generate/${seed}`
  }

  /**
   * 📛 Generar nombre
   */
  private generateName(collectionId: string, _rarity: NFTRarity): string {
    const prefixes = {
      'quantum_crystals': ['Resonant', 'Luminous', 'Ethereal', 'Transcendent', 'Void'],
      'quantum_beings': ['Ancient', 'Evolved', 'Conscious', 'Enlightened', 'Cosmic'],
      'quantum_weapons': ['Legendary', 'Mythical', 'Supreme', 'Ultimate', 'Divine']
    }

    const suffixes = {
      'quantum_crystals': ['Crystal', 'Prism', 'Shard', 'Core', 'Matrix'],
      'quantum_beings': ['Entity', 'Consciousness', 'Being', 'Spirit', 'Avatar'],
      'quantum_weapons': ['Blade', 'Cannon', 'Rifle', 'Hammer', 'Staff']
    }

    const prefix = this.randomChoice(prefixes[collectionId as keyof typeof prefixes] || ['Quantum'])
    const suffix = this.randomChoice(suffixes[collectionId as keyof typeof suffixes] || ['Item'])
    
    return `${prefix} ${suffix} #${Math.floor(Math.random() * 10000)}`
  }

  /**
   * 📜 Generar descripción
   */
  private generateDescription(collectionId: string, rarity: NFTRarity): string {
    const descriptions = {
      'quantum_crystals': `Un cristal cuántico de rareza ${rarity} que resuena con las frecuencias fundamentales del universo. Sus propiedades únicas lo convierten en una fuente de energía cuántica incomparable.`,
      'quantum_beings': `Una entidad cuántica consciente de rareza ${rarity} que existe en múltiples dimensiones simultáneamente. Su sabiduría trasciende la comprensión humana convencional.`,
      'quantum_weapons': `Un arma cuántica de rareza ${rarity} forjada con tecnología que manipula la realidad a nivel subatómico. Su poder destructivo es limitado solo por la coherencia cuántica de su portador.`
    }

    return descriptions[collectionId as keyof typeof descriptions] || `Un NFT cuántico único de rareza ${rarity}.`
  }

  /**
   * 🔄 Ejecutar evolución
   */
  private executeEvolution(nft: QuantumNFT, _catalyst?: string): void {
    nft.quantumProperties.evolutionStage++
    
    // Mejorar propiedades basadas en la evolución
    nft.quantumProperties.coherencePattern = nft.quantumProperties.coherencePattern.map(p => 
      Math.min(p * 1.1, 1.0)
    )
    
    nft.quantumProperties.resonanceFrequency *= 1.05
    nft.quantumProperties.quantumAura.intensity *= 1.2

    // Registrar transición de fase
    const transition: PhaseTransition = {
      fromState: `stage_${nft.quantumProperties.evolutionStage - 1}`,
      toState: `stage_${nft.quantumProperties.evolutionStage}`,
      timestamp: Date.now(),
      trigger: 'time',
      probability: 1.0
    }

    nft.quantumProperties.phaseTransitions.push(transition)

    // Actualizar atributos
    const evolutionAttr = nft.attributes.find(attr => attr.trait_type === 'Evolution Stage')
    if (evolutionAttr) {
      evolutionAttr.value = nft.quantumProperties.evolutionStage
    }
  }

  /**
   * 🔗 Sincronizar propiedades entrelazadas
   */
  private synchronizeEntangledProperties(nft1: QuantumNFT, nft2: QuantumNFT): void {
    // Promedio de patrones de coherencia
    for (let i = 0; i < Math.min(nft1.quantumProperties.coherencePattern.length, nft2.quantumProperties.coherencePattern.length); i++) {
      const avg = (nft1.quantumProperties.coherencePattern[i] + nft2.quantumProperties.coherencePattern[i]) / 2
      nft1.quantumProperties.coherencePattern[i] = avg
      nft2.quantumProperties.coherencePattern[i] = avg
    }

    // Sincronizar intensidad de aura
    const avgIntensity = (nft1.quantumProperties.quantumAura.intensity + nft2.quantumProperties.quantumAura.intensity) / 2
    nft1.quantumProperties.quantumAura.intensity = avgIntensity
    nft2.quantumProperties.quantumAura.intensity = avgIntensity
  }

  /**
   * 💥 Colapsar propiedades cuánticas
   */
  private collapseQuantumProperties(properties: QuantumNFTProperties): QuantumNFTProperties {
    // Colapsar patrones de coherencia a valores definidos
    properties.coherencePattern = properties.coherencePattern.map(p => 
      Math.random() < p ? 1.0 : 0.0
    )

    return properties
  }

  /**
   * 📝 Registrar evento
   */
  private recordEvent(event: NFTEvent): void {
    this.nftEvents.push(event)
  }

  /**
   * 🎲 Selección aleatoria
   */
  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  /**
   * 🔍 Obtener NFT por ID
   */
  public getNFT(nftId: string): QuantumNFT | undefined {
    return this.nfts.get(nftId)
  }

  /**
   * 👤 Obtener NFTs de un propietario
   */
  public getNFTsByOwner(owner: string): QuantumNFT[] {
    return Array.from(this.nfts.values()).filter(nft => nft.owner === owner)
  }

  /**
   * 🏛️ Obtener NFTs de una colección
   */
  public getNFTsByCollection(collectionId: string): QuantumNFT[] {
    return Array.from(this.nfts.values()).filter(nft => nft.collection === collectionId)
  }

  /**
   * 📊 Obtener estadísticas
   */
  public getStats() {
    return {
      totalNFTs: this.nfts.size,
      totalCollections: this.collections.size,
      totalEvents: this.nftEvents.length,
      rarityDistribution: this.calculateRarityDistribution(),
      averageEvolutionStage: this.calculateAverageEvolutionStage(),
      entanglementPairs: this.countEntanglementPairs()
    }
  }

  private calculateRarityDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {}
    
    for (const nft of this.nfts.values()) {
      distribution[nft.rarity] = (distribution[nft.rarity] || 0) + 1
    }
    
    return distribution
  }

  private calculateAverageEvolutionStage(): number {
    const nfts = Array.from(this.nfts.values())
    if (nfts.length === 0) return 0
    
    const totalStages = nfts.reduce((sum, nft) => sum + nft.quantumProperties.evolutionStage, 0)
    return totalStages / nfts.length
  }

  private countEntanglementPairs(): number {
    let pairs = 0
    
    for (const nft of this.nfts.values()) {
      pairs += nft.quantumProperties.entanglementNetwork.length
    }
    
    return pairs / 2 // Cada par se cuenta dos veces
  }
}

interface QuantumNFTCollection {
  id: string
  name: string
  description: string
  symbol: string
  maxSupply: number
  currentSupply: number
  creator: string
  royaltyFee: number
  quantumProperties: {
    evolutionEnabled: boolean
    entanglementCapacity: number
    coherenceRequired: number
    rarityDistribution: Record<string, number>
  }
  active: boolean
}