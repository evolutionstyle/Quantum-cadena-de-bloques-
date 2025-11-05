/**
 * 🏪 Quantum Marketplace - Mercado descentralizado de NFTs y tokens cuánticos
 * Trading avanzado con subastas, ofertas y intercambios automáticos
 */

import { 
  MarketplaceListing, 
  AuctionListing, 
  OfferListing,
  TradeEvent 
} from '../types/token-types'
import { SimpleHash } from '../utils/simple-hash'

export class QuantumMarketplace {
  private listings: Map<string, MarketplaceListing>
  private auctions: Map<string, AuctionListing>
  private offers: Map<string, OfferListing>
  private trades: TradeEvent[]
  private fees: MarketplaceFees
  private lastListingId: number

  constructor() {
    this.listings = new Map()
    this.auctions = new Map()
    this.offers = new Map()
    this.trades = []
    this.lastListingId = 0
    
    this.fees = {
      listingFee: 0.001, // 0.1% en QC
      tradingFee: 0.025, // 2.5%
      auctionFee: 0.05,  // 5%
      royaltyFee: 0.075  // 7.5% para creadores
    }

    console.log('🏪 Marketplace cuántico inicializado')
  }

  /**
   * 📋 Listar NFT para venta directa
   */
  public listNFT(
    nftId: string,
    seller: string,
    priceQC: number,
    duration: number = 604800000 // 7 días por defecto
  ): string {
    if (priceQC <= 0) throw new Error('Precio debe ser mayor a 0')
    
    const listingId = `listing_${++this.lastListingId}`
    const expiresAt = Date.now() + duration

    const listing: MarketplaceListing = {
      id: listingId,
      nftId,
      seller,
      priceQC,
      currency: 'QC',
      listedAt: Date.now(),
      expiresAt,
      status: 'active',
      views: 0,
      favorites: 0
    }

    this.listings.set(listingId, listing)

    this.recordTrade({
      type: 'list',
      listingId,
      nftId,
      seller,
      priceQC,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`list_${listingId}_${Date.now()}`)
    })

    console.log(`📋 NFT ${nftId} listado por ${priceQC} QC`)
    return listingId
  }

  /**
   * 🛒 Comprar NFT directamente
   */
  public buyNFT(
    listingId: string,
    buyer: string,
    paymentQC: number
  ): TradeEvent {
    const listing = this.listings.get(listingId)
    if (!listing) throw new Error('Listing no encontrado')
    if (listing.status !== 'active') throw new Error('Listing no está activo')
    if (Date.now() > listing.expiresAt) throw new Error('Listing expirado')
    if (paymentQC < listing.priceQC) throw new Error('Pago insuficiente')

    // Calcular fees
    const tradingFee = listing.priceQC * this.fees.tradingFee
    const royaltyFee = listing.priceQC * this.fees.royaltyFee
    const sellerReceives = listing.priceQC - tradingFee - royaltyFee

    // Actualizar estado del listing
    listing.status = 'sold'

    const trade: TradeEvent = {
      type: 'purchase',
      listingId,
      nftId: listing.nftId,
      seller: listing.seller,
      buyer,
      priceQC: listing.priceQC,
      fees: {
        trading: tradingFee,
        royalty: royaltyFee,
        total: tradingFee + royaltyFee
      },
      sellerReceives,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`buy_${listingId}_${Date.now()}`)
    }

    this.trades.push(trade)
    this.recordTrade(trade)

    console.log(`🛒 NFT ${listing.nftId} vendido por ${listing.priceQC} QC`)
    return trade
  }

  /**
   * 🎯 Crear subasta
   */
  public createAuction(
    nftId: string,
    seller: string,
    startingPriceQC: number,
    reservePriceQC: number,
    duration: number = 86400000 // 24 horas
  ): string {
    if (startingPriceQC <= 0) throw new Error('Precio inicial debe ser mayor a 0')
    if (reservePriceQC < startingPriceQC) throw new Error('Precio de reserva debe ser mayor o igual al precio inicial')
    
    const auctionId = `auction_${++this.lastListingId}`
    const endsAt = Date.now() + duration

    const auction: AuctionListing = {
      id: auctionId,
      nftId,
      seller,
      startingPriceQC,
      reservePriceQC,
      currentBidQC: 0,
      highestBidder: '',
      bids: [],
      createdAt: Date.now(),
      endsAt,
      status: 'active',
      autoExtend: true,
      extendDuration: 600000 // 10 minutos
    }

    this.auctions.set(auctionId, auction)

    this.recordTrade({
      type: 'auction_created',
      listingId: auctionId,
      nftId,
      seller,
      priceQC: startingPriceQC,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`auction_${auctionId}_${Date.now()}`)
    })

    console.log(`🎯 Subasta creada para NFT ${nftId} - Precio inicial: ${startingPriceQC} QC`)
    return auctionId
  }

  /**
   * 🔥 Hacer oferta en subasta
   */
  public bidOnAuction(
    auctionId: string,
    bidder: string,
    bidAmountQC: number
  ): boolean {
    const auction = this.auctions.get(auctionId)
    if (!auction) throw new Error('Subasta no encontrada')
    if (auction.status !== 'active') throw new Error('Subasta no está activa')
    if (Date.now() > auction.endsAt) throw new Error('Subasta terminada')
    
    const minBid = Math.max(auction.currentBidQC + 0.1, auction.startingPriceQC)
    if (bidAmountQC < minBid) {
      throw new Error(`Oferta debe ser al menos ${minBid} QC`)
    }

    // Añadir oferta
    const bid: AuctionBid = {
      bidder,
      amount: BigInt(bidAmountQC),
      timestamp: Date.now(),
      coherenceLevel: Math.random() * 0.8 + 0.2, // 0.2 a 1.0
      quantumState: 'revealed' as const,
      transactionHash: SimpleHash.sha256(`bid_${auctionId}_${bidder}_${Date.now()}`)
    }

    auction.bids.push(bid)
    auction.currentBidQC = bidAmountQC
    auction.highestBidder = bidder

    // Auto-extender si está cerca del final
    if (auction.autoExtend && auction.endsAt - Date.now() < auction.extendDuration) {
      auction.endsAt += auction.extendDuration
      console.log(`⏰ Subasta ${auctionId} extendida por ${auction.extendDuration / 60000} minutos`)
    }

    this.recordTrade({
      type: 'bid',
      listingId: auctionId,
      nftId: auction.nftId,
      buyer: bidder,
      priceQC: bidAmountQC,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: bid.transactionHash
    })

    console.log(`🔥 Nueva oferta en subasta ${auctionId}: ${bidAmountQC} QC por ${bidder}`)
    return true
  }

  /**
   * 🏁 Finalizar subasta
   */
  public finalizeAuction(auctionId: string): TradeEvent | null {
    const auction = this.auctions.get(auctionId)
    if (!auction) throw new Error('Subasta no encontrada')
    if (auction.status !== 'active') throw new Error('Subasta ya finalizada')
    if (Date.now() < auction.endsAt) throw new Error('Subasta aún activa')

    auction.status = 'ended'

    // Verificar si se alcanzó el precio de reserva
    if (auction.currentBidQC < auction.reservePriceQC) {
      auction.status = 'failed'
      
      this.recordTrade({
        type: 'auction_failed',
        listingId: auctionId,
        nftId: auction.nftId,
        seller: auction.seller,
        priceQC: auction.currentBidQC,
        timestamp: Date.now(),
        blockNumber: this.trades.length + 1,
        transactionHash: SimpleHash.sha256(`auction_failed_${auctionId}_${Date.now()}`)
      })

      console.log(`❌ Subasta ${auctionId} falló - No se alcanzó precio de reserva`)
      return null
    }

    // Calcular fees
    const auctionFee = auction.currentBidQC * this.fees.auctionFee
    const royaltyFee = auction.currentBidQC * this.fees.royaltyFee
    const sellerReceives = auction.currentBidQC - auctionFee - royaltyFee

    const trade: TradeEvent = {
      type: 'auction_won',
      listingId: auctionId,
      nftId: auction.nftId,
      seller: auction.seller,
      buyer: auction.highestBidder,
      priceQC: auction.currentBidQC,
      fees: {
        trading: auctionFee,
        royalty: royaltyFee,
        total: auctionFee + royaltyFee
      },
      sellerReceives,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`auction_won_${auctionId}_${Date.now()}`)
    }

    this.trades.push(trade)
    this.recordTrade(trade)

    console.log(`🏁 Subasta ${auctionId} ganada por ${auction.highestBidder} con ${auction.currentBidQC} QC`)
    return trade
  }

  /**
   * 💰 Hacer oferta directa sobre NFT
   */
  public makeOffer(
    nftId: string,
    offeror: string,
    offerAmountQC: number,
    duration: number = 259200000 // 3 días
  ): string {
    if (offerAmountQC <= 0) throw new Error('Oferta debe ser mayor a 0')
    
    const offerId = `offer_${++this.lastListingId}`
    const expiresAt = Date.now() + duration

    const offer: OfferListing = {
      id: offerId,
      nftId,
      offeror,
      offerAmountQC,
      currency: 'QC',
      createdAt: Date.now(),
      expiresAt,
      status: 'pending'
    }

    this.offers.set(offerId, offer)

    this.recordTrade({
      type: 'offer_made',
      listingId: offerId,
      nftId,
      buyer: offeror,
      priceQC: offerAmountQC,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`offer_${offerId}_${Date.now()}`)
    })

    console.log(`💰 Oferta realizada: ${offerAmountQC} QC por NFT ${nftId}`)
    return offerId
  }

  /**
   * ✅ Aceptar oferta
   */
  public acceptOffer(
    offerId: string,
    acceptor: string
  ): TradeEvent {
    const offer = this.offers.get(offerId)
    if (!offer) throw new Error('Oferta no encontrada')
    if (offer.status !== 'pending') throw new Error('Oferta no está pendiente')
    if (Date.now() > offer.expiresAt) throw new Error('Oferta expirada')

    offer.status = 'accepted'

    // Calcular fees
    const tradingFee = offer.offerAmountQC * this.fees.tradingFee
    const royaltyFee = offer.offerAmountQC * this.fees.royaltyFee
    const sellerReceives = offer.offerAmountQC - tradingFee - royaltyFee

    const trade: TradeEvent = {
      type: 'offer_accepted',
      listingId: offerId,
      nftId: offer.nftId,
      seller: acceptor,
      buyer: offer.offeror,
      priceQC: offer.offerAmountQC,
      fees: {
        trading: tradingFee,
        royalty: royaltyFee,
        total: tradingFee + royaltyFee
      },
      sellerReceives,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`accept_offer_${offerId}_${Date.now()}`)
    }

    this.trades.push(trade)
    this.recordTrade(trade)

    console.log(`✅ Oferta ${offerId} aceptada - NFT ${offer.nftId} vendido por ${offer.offerAmountQC} QC`)
    return trade
  }

  /**
   * 🔄 Intercambio directo entre NFTs
   */
  public proposeSwap(
    proposer: string,
    nftId1: string,
    nftId2: string,
    additionalQC: number = 0
  ): string {
    const swapId = `swap_${++this.lastListingId}`

    const swap: NFTSwap = {
      id: swapId,
      proposer,
      nftId1,
      nftId2,
      additionalQC,
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + 259200000 // 3 días
    }

    // Almacenar en ofertas con tipo especial
    const offer: OfferListing = {
      id: swapId,
      nftId: nftId2,
      offeror: proposer,
      offerAmountQC: additionalQC,
      currency: 'SWAP',
      createdAt: Date.now(),
      expiresAt: swap.expiresAt,
      status: 'pending',
      swapDetails: swap
    }

    this.offers.set(swapId, offer)

    this.recordTrade({
      type: 'swap_proposed',
      listingId: swapId,
      nftId: nftId1,
      buyer: proposer,
      priceQC: additionalQC,
      timestamp: Date.now(),
      blockNumber: this.trades.length + 1,
      transactionHash: SimpleHash.sha256(`swap_${swapId}_${Date.now()}`)
    })

    console.log(`🔄 Intercambio propuesto: NFT ${nftId1} ↔ NFT ${nftId2} + ${additionalQC} QC`)
    return swapId
  }

  /**
   * 📊 Obtener métricas de mercado
   */
  public getMarketMetrics(): MarketMetrics {
    const activeListing = Array.from(this.listings.values()).filter(l => l.status === 'active')
    const activeAuctions = Array.from(this.auctions.values()).filter(a => a.status === 'active')
    const pendingOffers = Array.from(this.offers.values()).filter(o => o.status === 'pending')

    const recentTrades = this.trades.filter(t => Date.now() - t.timestamp < 86400000) // 24 horas

    const totalVolume24h = recentTrades
      .filter(t => ['purchase', 'auction_won', 'offer_accepted'].includes(t.type))
      .reduce((sum, t) => sum + (t.priceQC || 0), 0)

    const averagePrice24h = recentTrades.length > 0 ? totalVolume24h / recentTrades.length : 0

    return {
      activeListings: activeListing.length,
      activeAuctions: activeAuctions.length,
      pendingOffers: pendingOffers.length,
      totalTrades: this.trades.length,
      volume24h: totalVolume24h,
      averagePrice24h,
      uniqueTraders24h: new Set(recentTrades.flatMap(t => [t.seller, t.buyer].filter(Boolean))).size,
      topCollections: this.getTopCollections(),
      priceHistory: this.getPriceHistory()
    }
  }

  /**
   * 🏆 Obtener colecciones más populares
   */
  private getTopCollections(): CollectionStats[] {
    const collectionStats = new Map<string, CollectionStats>()

    this.trades.forEach(trade => {
      if (!trade.nftId) return
      
      const collectionId = trade.nftId.split('_')[0]
      const existing = collectionStats.get(collectionId) || {
        collectionId,
        volume: 0,
        trades: 0,
        averagePrice: 0,
        floorPrice: Infinity,
        ceilingPrice: 0
      }

      if (trade.priceQC) {
        existing.volume += trade.priceQC
        existing.trades++
        existing.floorPrice = Math.min(existing.floorPrice, trade.priceQC)
        existing.ceilingPrice = Math.max(existing.ceilingPrice, trade.priceQC)
        existing.averagePrice = existing.volume / existing.trades
      }

      collectionStats.set(collectionId, existing)
    })

    return Array.from(collectionStats.values())
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10)
  }

  /**
   * 📈 Obtener historial de precios
   */
  private getPriceHistory(): PriceHistoryPoint[] {
    const history: PriceHistoryPoint[] = []
    const dayMs = 86400000
    const now = Date.now()

    for (let i = 30; i >= 0; i--) {
      const dayStart = now - (i * dayMs)
      const dayEnd = dayStart + dayMs

      const dayTrades = this.trades.filter(t => 
        t.timestamp >= dayStart && 
        t.timestamp < dayEnd &&
        ['purchase', 'auction_won', 'offer_accepted'].includes(t.type)
      )

      const volume = dayTrades.reduce((sum, t) => sum + (t.priceQC || 0), 0)
      const averagePrice = dayTrades.length > 0 ? volume / dayTrades.length : 0

      history.push({
        date: dayStart,
        volume,
        averagePrice,
        trades: dayTrades.length
      })
    }

    return history
  }

  /**
   * 🔍 Buscar NFTs en el marketplace
   */
  public searchNFTs(filters: MarketplaceFilters): SearchResult {
    let results = Array.from(this.listings.values()).filter(l => l.status === 'active')

    // Aplicar filtros
    if (filters.collection) {
      results = results.filter(l => l.nftId.startsWith(filters.collection!))
    }

    if (filters.minPrice !== undefined) {
      results = results.filter(l => l.priceQC >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(l => l.priceQC <= filters.maxPrice!)
    }

    if (filters.rarity) {
      // Aquí necesitaríamos acceso al sistema de NFTs para filtrar por rareza
      // Por ahora, simulamos el filtro
    }

    // Ordenar resultados
    switch (filters.sortBy) {
      case 'price_asc':
        results.sort((a, b) => a.priceQC - b.priceQC)
        break
      case 'price_desc':
        results.sort((a, b) => b.priceQC - a.priceQC)
        break
      case 'newest':
        results.sort((a, b) => b.listedAt - a.listedAt)
        break
      case 'oldest':
        results.sort((a, b) => a.listedAt - b.listedAt)
        break
      case 'ending_soon':
        results.sort((a, b) => a.expiresAt - b.expiresAt)
        break
      default:
        results.sort((a, b) => b.listedAt - a.listedAt)
    }

    // Paginación
    const start = (filters.page - 1) * filters.limit
    const end = start + filters.limit
    const paginatedResults = results.slice(start, end)

    return {
      listings: paginatedResults,
      total: results.length,
      page: filters.page,
      limit: filters.limit,
      hasMore: end < results.length
    }
  }

  /**
   * 📝 Registrar evento de trading
   */
  private recordTrade(event: TradeEvent): void {
    console.log(`📝 Evento de trading registrado: ${event.type} - ${event.nftId}`)
  }

  /**
   * 🔍 Obtener listing por ID
   */
  public getListing(listingId: string): MarketplaceListing | undefined {
    return this.listings.get(listingId)
  }

  /**
   * 🎯 Obtener subasta por ID
   */
  public getAuction(auctionId: string): AuctionListing | undefined {
    return this.auctions.get(auctionId)
  }

  /**
   * 💰 Obtener oferta por ID
   */
  public getOffer(offerId: string): OfferListing | undefined {
    return this.offers.get(offerId)
  }

  /**
   * 📊 Obtener historial de trades
   */
  public getTradeHistory(limit: number = 100): TradeEvent[] {
    return this.trades.slice(-limit).reverse()
  }
}

// Interfaces adicionales
interface AuctionBid {
  bidder: string
  amount: number
  timestamp: number
  transactionHash: string
}

interface NFTSwap {
  id: string
  proposer: string
  nftId1: string
  nftId2: string
  additionalQC: number
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: number
  expiresAt: number
}

interface MarketplaceFees {
  listingFee: number
  tradingFee: number
  auctionFee: number
  royaltyFee: number
}

interface MarketMetrics {
  activeListings: number
  activeAuctions: number
  pendingOffers: number
  totalTrades: number
  volume24h: number
  averagePrice24h: number
  uniqueTraders24h: number
  topCollections: CollectionStats[]
  priceHistory: PriceHistoryPoint[]
}

interface CollectionStats {
  collectionId: string
  volume: number
  trades: number
  averagePrice: number
  floorPrice: number
  ceilingPrice: number
}

interface PriceHistoryPoint {
  date: number
  volume: number
  averagePrice: number
  trades: number
}

interface MarketplaceFilters {
  collection?: string
  minPrice?: number
  maxPrice?: number
  rarity?: string
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'ending_soon'
  page: number
  limit: number
}

interface SearchResult {
  listings: MarketplaceListing[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}