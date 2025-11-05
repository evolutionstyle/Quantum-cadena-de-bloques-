/**
 * 🚀 Main Entry Point - Punto de entrada principal para la aplicación Quantum DApp
 * Inicializa y expone la aplicación al navegador
 */

import { QuantumDApp } from './core/quantum-dapp'

// Crear instancia global de la DApp
let quantumApp: QuantumDApp

/**
 * 🌌 Inicializar la aplicación cuántica
 */
async function initializeQuantumApp(): Promise<void> {
  try {
    console.log('🚀 Inicializando Quantum DApp...')
    
    quantumApp = new QuantumDApp()
    
    // Exponer la aplicación globalmente para el navegador
    if (typeof window !== 'undefined') {
      (window as any).quantumApp = quantumApp
      (window as any).QuantumDApp = QuantumDApp
    }
    
    console.log('✅ Quantum DApp cargado exitosamente!')
    console.log('🌐 Usa window.quantumApp para interactuar con la aplicación')
    
    // Mostrar comandos útiles
    showQuickStartGuide()
    
  } catch (error) {
    console.error('❌ Error inicializando Quantum DApp:', error)
  }
}

/**
 * 📖 Mostrar guía de inicio rápido
 */
function showQuickStartGuide(): void {
  console.log('\n🎯 ===== GUÍA DE INICIO RÁPIDO =====')
  console.log('💡 Comandos disponibles en la consola:')
  console.log('')
  
  console.log('👛 WALLET:')
  console.log('   • quantumApp.createWallet("tu_nombre")')
  console.log('   • quantumApp.getWallet("tu_nombre")')
  console.log('')
  
  console.log('💰 TOKENS:')
  console.log('   • quantumApp.requestFaucet("tu_nombre", 100)')
  console.log('   • quantumApp.stakeTokens("tu_nombre", "qc_basic", 50)')
  console.log('   • quantumApp.claimRewards("tu_nombre")')
  console.log('')
  
  console.log('🎨 NFTs:')
  console.log('   • quantumApp.mintNFT("tu_nombre", "quantum_crystals")')
  console.log('   • quantumApp.listNFTForSale("tu_nombre", "nft_id", 100)')
  console.log('   • quantumApp.buyNFT("tu_nombre", "listing_id")')
  console.log('')
  
  console.log('📊 ESTADÍSTICAS:')
  console.log('   • quantumApp.getUserDashboard("tu_nombre")')
  console.log('   • quantumApp.getGlobalStats()')
  console.log('   • quantumApp.getAppState()')
  console.log('')
  
  console.log('🔍 EJEMPLO COMPLETO:')
  console.log('   1. quantumApp.createWallet("alice")')
  console.log('   2. quantumApp.requestFaucet("alice", 500)')
  console.log('   3. quantumApp.mintNFT("alice", "quantum_crystals")')
  console.log('   4. quantumApp.stakeTokens("alice", "qc_basic", 100)')
  console.log('   5. quantumApp.getUserDashboard("alice")')
  console.log('')
  
  console.log('🎮 ¡Experimenta con el ecosistema cuántico!')
  console.log('=====================================\n')
}

/**
 * 🎮 Función de demostración interactiva
 */
function runDemo(): void {
  if (!quantumApp) {
    console.log('❌ Quantum DApp no inicializado')
    return
  }

  console.log('🎮 Ejecutando demostración...')
  
  try {
    // Crear usuarios de ejemplo
    const alice = quantumApp.createWallet('alice')
    const bob = quantumApp.createWallet('bob')
    
    console.log('👛 Wallets creados para Alice y Bob')
    console.log(`Alice wallet: ${alice.address}`)
    console.log(`Bob wallet: ${bob.address}`)
    
    // Solicitar tokens del faucet
    quantumApp.requestFaucet('alice', 500)
    quantumApp.requestFaucet('bob', 300)
    
    console.log('💰 Tokens obtenidos del faucet')
    
    // Mintear NFTs
    const aliceNFT = quantumApp.mintNFT('alice', 'quantum_crystals', 'Alice\'s Crystal')
    const bobNFT = quantumApp.mintNFT('bob', 'quantum_beings', 'Bob\'s Entity')
    
    console.log(`🎨 NFTs minteados - Alice: ${aliceNFT.id}, Bob: ${bobNFT.id}`)
    
    console.log('🎨 NFTs minteados')
    
    // Stakear tokens
    quantumApp.stakeTokens('alice', 'qc_basic', 100)
    quantumApp.stakeTokens('bob', 'qc_locked', 50)
    
    console.log('🔒 Tokens stakeados')
    
    // Listar NFT en marketplace
    quantumApp.listNFTForSale('alice', aliceNFT.id, 150)
    
    console.log('🏪 NFT listado en marketplace')
    
    // Mostrar dashboards
    console.log('\n📊 Dashboard de Alice:')
    console.log(quantumApp.getUserDashboard('alice'))
    
    console.log('\n📊 Dashboard de Bob:')
    console.log(quantumApp.getUserDashboard('bob'))
    
    console.log('\n📈 Estadísticas globales:')
    console.log(quantumApp.getGlobalStats())
    
    console.log('\n✅ Demostración completada!')
    
  } catch (error) {
    console.error('❌ Error en demostración:', error)
  }
}

/**
 * 🛠️ Utilidades para desarrollo
 */
const QuantumUtils = {
  /**
   * 🔄 Reiniciar aplicación
   */
  reset(): void {
    console.log('🔄 Reiniciando Quantum DApp...')
    initializeQuantumApp()
  },

  /**
   * 🎮 Ejecutar demo
   */
  demo(): void {
    runDemo()
  },

  /**
   * 📊 Estado rápido
   */
  status(): any {
    if (!quantumApp) {
      return { status: 'not_initialized' }
    }
    
    return {
      status: 'initialized',
      app: quantumApp.getAppState(),
      stats: quantumApp.getGlobalStats()
    }
  },

  /**
   * 💾 Exportar datos (simulado)
   */
  export(): any {
    if (!quantumApp) return null
    
    return {
      timestamp: Date.now(),
      stats: quantumApp.getGlobalStats(),
      appState: quantumApp.getAppState()
    }
  },

  /**
   * 🎯 Crear usuario de prueba completo
   */
  createTestUser(name: string): any {
    if (!quantumApp) throw new Error('App no inicializada')
    
    const wallet = quantumApp.createWallet(name)
    quantumApp.requestFaucet(name, 1000)
    const nft = quantumApp.mintNFT(name, 'quantum_crystals')
    quantumApp.stakeTokens(name, 'qc_basic', 200)
    
    return {
      wallet,
      nft,
      dashboard: quantumApp.getUserDashboard(name)
    }
  }
}

// Exponer utilidades globalmente
if (typeof window !== 'undefined') {
  (window as any).QuantumUtils = QuantumUtils
}

// Auto-inicializar cuando se carga la página
if (typeof window !== 'undefined') {
  // En el navegador
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuantumApp)
  } else {
    initializeQuantumApp()
  }
} else {
  // En Node.js
  initializeQuantumApp()
}

// Exportar para uso en módulos
export { quantumApp, QuantumUtils, initializeQuantumApp }
export default QuantumDApp