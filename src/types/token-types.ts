/**
 * 💎 Quantum Token Types - Definiciones para tokens y NFTs cuánticos
 * Sistema económico sin minado basado en participación y coherencia cuántica
 */

export interface QuantumToken {
  id: string
  symbol: 'QC' // Quantum Coin
  name: 'Quantum Coin'
  decimals: 18
  totalSupply: bigint
  currentSupply: bigint
  quantumProperties: QuantumTokenProperties
}

export interface QuantumTokenProperties {
  coherenceLevel: number // 0-1, determina estabilidad del token
  entanglementPairs: string[] // IDs de otros tokens entrelazados
  superpositionState: SuperpositionState
  quantumSignature: string
  emergenceTimestamp: number
  halfLife: number // tiempo de decoherencia en ms
}

export interface SuperpositionState {
  states: TokenState[]
  amplitudes: number[]
  measured: boolean
  collapseTimestamp?: number
}

export interface TokenState {
  value: number
  probability: number
  quantumNumber: number
}

// ===== NFTs CUÁNTICOS =====
export interface QuantumNFT {
  id: string
  tokenId: bigint
  name: string
  description: string
  image: string
  attributes: QuantumNFTAttribute[]
  owner: string
  creator: string
  createdAt: number
  quantumProperties: QuantumNFTProperties
  rarity: NFTRarity
  collection?: string
}

export interface QuantumNFTProperties {
  quantumDNA: string // Hash único basado en propiedades cuánticas
  entanglementNetwork: string[] // NFTs entrelazados
  coherencePattern: number[] // Patrón de coherencia único
  evolutionStage: number // Etapa de evolución del NFT
  resonanceFrequency: number // Frecuencia cuántica única
  quantumAura: QuantumAura
  phaseTransitions: PhaseTransition[]
}

export interface QuantumNFTAttribute {
  trait_type: string
  value: string | number
  quantum_property?: boolean
  rarity_score?: number
  evolution_locked?: boolean
}

export interface QuantumAura {
  color: string
  intensity: number
  pattern: 'spiral' | 'wave' | 'particle' | 'field'
  pulsation: number
  visibility: boolean
}

export interface PhaseTransition {
  fromState: string
  toState: string
  timestamp: number
  trigger: 'observation' | 'entanglement' | 'time' | 'interaction'
  probability: number
}

export type NFTRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Quantum' | 'Transcendent'

// ===== WALLET CUÁNTICO =====
export interface QuantumWallet {
  address: string
  publicKey?: string
  encryptedPrivateKey?: string
  quantumKeyPair?: QuantumKeyPair
  balances: TokenBalance[]
  nfts: string[] // NFT IDs for compatibility with DApp
  stakingRewards: StakingReward[]
  coherenceScore: number
  participationLevel: number
  createdAt: number
  // Additional fields for DApp compatibility
  balance?: {
    QC: number
    ETH: number
    staked: Record<string, number>
  }
  transactions?: string[]
  stakingPositions?: any[]
  votingPower?: number
  lastActivity?: number
}

export interface QuantumKeyPair {
  quantumPublicKey: Uint8Array
  entangledPrivateKey: Uint8Array
  coherenceSignature: string
  keyDerivationPath: string
}

export interface TokenBalance {
  tokenId: string
  balance: bigint
  stakedAmount: bigint
  lockedAmount: bigint
  lastUpdate: number
  quantumState: 'stable' | 'superposition' | 'entangled' | 'decoherent'
}

export interface StakingReward {
  tokenId: string
  amount: bigint
  apy: number
  stakingPeriod: number
  claimableAt: number
  coherenceBonus: number
}

// ===== FAUCET Y DISTRIBUCIÓN =====
export interface QuantumFaucet {
  id: string
  tokenId: string
  dailyLimit: bigint
  userLimit: bigint
  coherenceRequirement: number
  participationRequirement: number
  cooldownPeriod: number
  active: boolean
  quantumChallenge?: QuantumChallenge
}

export interface QuantumChallenge {
  type: 'coherence_test' | 'entanglement_puzzle' | 'quantum_quiz' | 'participation_proof'
  difficulty: number
  description: string
  reward_multiplier: number
  time_limit: number
}

export interface FaucetClaim {
  userId: string
  tokenId: string
  amount: bigint
  timestamp: number
  coherenceScore: number
  challengeCompleted?: boolean
  cooldownUntil: number
}

// ===== STAKING Y YIELD FARMING =====
export interface StakingPool {
  id: string
  name: string
  tokenId: string
  apy: number
  minimumStake: bigint
  lockupPeriod: number
  totalStaked: bigint
  maxStakers: number
  currentStakers: number
  coherenceBonus: number
  quantumMultiplier: number
  active: boolean
}

export interface StakingPosition {
  id: string
  userId: string
  poolId: string
  amount: bigint
  startDate: number
  lockupUntil: number
  currentRewards: bigint
  coherenceLevel: number
  autoCompound: boolean
}

export interface YieldFarm {
  id: string
  name: string
  lpTokenId: string
  rewardTokenId: string
  apy: number
  totalLocked: bigint
  rewardPerSecond: bigint
  quantumBoost: number
  farmingPeriod: number
  active: boolean
}

// ===== MARKETPLACE =====
export interface MarketplaceListing {
  id: string
  nftId: string
  seller: string
  price: bigint
  priceQC: number // Precio en QC para compatibilidad
  currency: string // Moneda utilizada (QC por defecto)
  tokenId: string // QC o otro token
  listingType: 'fixed' | 'auction' | 'quantum_auction'
  startTime: number
  endTime?: number
  expiresAt: number // Timestamp de expiración
  listedAt: number // Timestamp de cuando se listó
  quantumConditions?: QuantumConditions
  status: 'active' | 'sold' | 'cancelled' | 'expired'
}

export interface QuantumConditions {
  coherenceThreshold: number
  entanglementRequired: boolean
  observationPenalty: number
  resonanceMatch: boolean
}

export interface QuantumAuction {
  id: string
  nftId: string
  startingPrice: bigint
  currentBid: bigint
  highestBidder?: string
  bidHistory: AuctionBid[]
  quantumBidding: boolean // bids en superposición hasta collapse
  observationTrigger: number // timestamp cuando se revela ganador
  endTime: number
}

export interface AuctionBid {
  bidder: string
  amount: bigint
  timestamp: number
  coherenceLevel: number
  quantumState: 'hidden' | 'revealed' | 'superposition'
  transactionHash: string
}

// ===== GOVERNANCE CUÁNTICA =====
export interface GovernanceProposal {
  id: string
  title: string
  description: string
  proposer: string
  category: string
  votingStart: number
  votingEnd: number
  votesFor: bigint
  votesAgainst: bigint
  status: 'pending' | 'active' | 'passed' | 'rejected' | 'executed'
  executionPayload?: any
}

export interface Vote {
  proposalId: string
  voter: string
  support: boolean
  weight: bigint
  timestamp: number
  reason?: string
}

export interface LiquidityPool {
  id: string
  token0: string
  token1: string
  reserve0: bigint
  reserve1: bigint
  totalLiquidity: bigint
  fee: number
  providers: Map<string, bigint>
}

export interface QuantumProposal {
  id: string
  title: string
  description: string
  proposer: string
  proposalType: ProposalType
  votingPower: bigint
  startTime: number
  endTime: number
  quorum: number
  quantumConsensus: boolean
  votes: QuantumVote[]
  status: ProposalStatus
  executionData?: string
}

export type ProposalType = 'parameter_change' | 'upgrade' | 'treasury' | 'emergency' | 'quantum_protocol'
export type ProposalStatus = 'pending' | 'active' | 'passed' | 'rejected' | 'executed' | 'quantum_superposition'

export interface QuantumVote {
  voter: string
  proposalId: string
  vote: 'yes' | 'no' | 'abstain' | 'quantum_superposition'
  weight: bigint
  coherenceLevel: number
  timestamp: number
  quantumSignature: string
}

// ===== EVENTOS DEL SISTEMA =====
export interface TokenEvent {
  type: 'transfer' | 'mint' | 'burn' | 'stake' | 'unstake' | 'quantum_collapse' | 'entanglement'
  tokenId: string
  from?: string
  to?: string
  amount: bigint
  timestamp: number
  blockNumber: number
  transactionHash: string
  quantumProperties?: any
}

export interface NFTEvent {
  type: 'mint' | 'transfer' | 'evolution' | 'entanglement' | 'phase_transition' | 'observation'
  nftId: string
  from?: string
  to?: string
  timestamp: number
  blockNumber: number
  transactionHash: string
  metadata?: any
}

// ===== CONFIGURACIÓN DEL SISTEMA =====
export interface QuantumEconomyConfig {
  // Tokens
  maxSupply: bigint
  inflationRate: number
  stakingRewardRate: number
  participationRewardRate: number
  
  // NFTs
  maxNFTsPerCollection: number
  evolutionCooldown: number
  entanglementCost: bigint
  
  // Faucet
  dailyFaucetAmount: bigint
  faucetCooldown: number
  coherenceRequirement: number
  
  // Staking
  minimumStakingPeriod: number
  maxAPY: number
  coherenceBonus: number
  
  // Marketplace
  tradingFee: number
  royaltyFee: number
  quantumAuctionDuration: number
  
  // Governance
  proposalThreshold: bigint
  votingPeriod: number
  executionDelay: number
  quorumPercentage: number
}

// ===== MARKETPLACE ADICIONAL =====
export interface AuctionListing {
  id: string
  nftId: string
  seller: string
  startingPrice: bigint
  startingPriceQC: number  // Versión en QC para la interfaz
  currentBid: bigint
  currentBidQC: number     // Versión en QC para la interfaz
  reservePriceQC: number   // Precio de reserva
  highestBidder?: string
  startTime: number
  endTime: number
  endsAt: number          // Alias para endTime  
  createdAt: number       // Timestamp de creación
  bidHistory: AuctionBid[]
  bids: AuctionBid[]      // Alias para bidHistory
  status: 'active' | 'ended' | 'cancelled' | 'failed'
  autoExtend: boolean     // Auto-extensión de subasta
  extendDuration: number  // Duración de la extensión
}

export interface OfferListing {
  id: string
  nftId: string
  buyer: string
  offeror: string         // Alias para buyer
  offerPrice: bigint
  offerAmountQC: number    // Versión en QC para la interfaz
  tokenId: string
  expiresAt: number
  status: 'active' | 'accepted' | 'rejected' | 'expired' | 'pending'
}

export interface TradeEvent {
  id: string
  type: 'listing' | 'sale' | 'offer' | 'auction_bid' | 'auction_end' | 
       'list' | 'purchase' | 'auction_created' | 'bid' | 'offer_made' | 
       'auction_failed' | 'auction_won' | 'offer_accepted' | 'swap_proposed'
  nftId: string
  seller?: string
  buyer?: string
  price: bigint
  priceQC?: number        // Precio en QC para compatibilidad
  listingId?: string      // ID del listing relacionado
  tokenId: string
  timestamp: number
  blockNumber: number
  transactionHash: string
}

// ===== MÉTRICAS Y ANÁLISIS =====
export interface QuantumMetrics {
  totalValueLocked: bigint
  totalTokensInCirculation: bigint
  totalNFTsMinted: number
  averageCoherenceLevel: number
  networkParticipation: number
  stakingAPY: number
  tradingVolume24h: bigint
  uniqueActiveUsers: number
  quantumEventsPerDay: number
}