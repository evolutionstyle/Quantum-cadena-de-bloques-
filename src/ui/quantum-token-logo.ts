/**
 * 🎨 Quantum Token Logo Component
 * Gestiona el logo del token cuántico en toda la aplicación
 */

export interface TokenLogoConfig {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  animate?: boolean
  showLabel?: boolean
  className?: string
}

export class QuantumTokenLogo {
  private static readonly LOGO_PATHS = {
    main: 'assets/images/quantum-token-logo.svg',
    small: 'assets/images/quantum-token-16.png',
    medium: 'assets/images/quantum-token-32.png',
    large: 'assets/images/quantum-token-64.png',
    xlarge: 'assets/images/quantum-token-128.png'
  }

  private static readonly SIZES = {
    small: '16px',
    medium: '32px',
    large: '64px',
    xlarge: '128px'
  }

  private static readonly TOKEN_CONFIG = {
    name: 'Quantum Coin',
    symbol: 'QC',
    colors: {
      primary: '#FF8C00',
      secondary: '#1E3A5F',
      accent: '#00FFFF',
      gradient: 'linear-gradient(135deg, #FF8C00 0%, #1E3A5F 50%, #00FFFF 100%)'
    }
  }

  /**
   * 🖼️ Obtener la ruta del logo
   */
  public static getLogoPath(size?: 'small' | 'medium' | 'large' | 'xlarge'): string {
    if (!size) return this.LOGO_PATHS.main
    return this.LOGO_PATHS[size]
  }

  /**
   * 🎨 Crear elemento de logo
   */
  public static createElement(config: TokenLogoConfig = {}): HTMLElement {
    const { 
      size = 'medium', 
      animate = false, 
      showLabel = false,
      className = ''
    } = config

    const container = document.createElement('div')
    container.className = `quantum-token-logo ${className}`
    
    if (animate) {
      container.classList.add('quantum-logo-animate')
    }

    const img = document.createElement('img')
    img.src = this.getLogoPath(size)
    img.alt = `${this.TOKEN_CONFIG.name} (${this.TOKEN_CONFIG.symbol})`
    img.style.width = this.SIZES[size]
    img.style.height = this.SIZES[size]
    
    // Fallback si la imagen no carga
    img.onerror = () => {
      img.style.display = 'none'
      const fallback = document.createElement('div')
      fallback.innerHTML = '🔮'
      fallback.style.fontSize = this.SIZES[size]
      container.appendChild(fallback)
    }

    container.appendChild(img)

    if (showLabel) {
      const label = document.createElement('span')
      label.textContent = this.TOKEN_CONFIG.symbol
      label.className = 'quantum-token-label'
      label.style.marginLeft = '8px'
      label.style.fontWeight = 'bold'
      label.style.background = this.TOKEN_CONFIG.colors.gradient
      label.style.webkitBackgroundClip = 'text'
      label.style.webkitTextFillColor = 'transparent'
      container.appendChild(label)
    }

    return container
  }

  /**
   * 💫 Agregar estilos de animación
   */
  public static injectStyles(): void {
    const style = document.createElement('style')
    style.textContent = `
      .quantum-token-logo {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .quantum-logo-animate {
        animation: quantum-pulse 3s ease-in-out infinite;
      }

      @keyframes quantum-pulse {
        0%, 100% {
          transform: scale(1) rotate(0deg);
          filter: drop-shadow(0 0 5px ${this.TOKEN_CONFIG.colors.accent});
        }
        25% {
          transform: scale(1.05) rotate(5deg);
          filter: drop-shadow(0 0 10px ${this.TOKEN_CONFIG.colors.primary});
        }
        50% {
          transform: scale(1.1) rotate(0deg);
          filter: drop-shadow(0 0 15px ${this.TOKEN_CONFIG.colors.secondary});
        }
        75% {
          transform: scale(1.05) rotate(-5deg);
          filter: drop-shadow(0 0 10px ${this.TOKEN_CONFIG.colors.accent});
        }
      }

      .quantum-token-label {
        font-family: 'Orbitron', 'Courier New', monospace;
        letter-spacing: 2px;
      }

      /* Hover effect */
      .quantum-token-logo:hover {
        transform: scale(1.1) rotate(10deg);
        transition: transform 0.3s ease;
      }
    `
    document.head.appendChild(style)
  }

  /**
   * 🎯 Reemplazar emojis con logo
   */
  public static replaceEmojis(selector: string = 'body'): void {
    const container = document.querySelector(selector)
    if (!container) return

    const emojiPattern = /🔮|💎|⚛️/g
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )

    const textNodes: Text[] = []
    let node: Node | null

    while ((node = walker.nextNode())) {
      if (node.textContent?.match(emojiPattern)) {
        textNodes.push(node as Text)
      }
    }

    textNodes.forEach(textNode => {
      const parent = textNode.parentNode
      if (!parent) return

      const text = textNode.textContent || ''
      const parts = text.split(emojiPattern)
      const matches = text.match(emojiPattern) || []

      const fragment = document.createDocumentFragment()
      parts.forEach((part, i) => {
        if (part) fragment.appendChild(document.createTextNode(part))
        if (matches[i]) {
          const logo = this.createElement({ size: 'small', animate: true })
          fragment.appendChild(logo)
        }
      })

      parent.replaceChild(fragment, textNode)
    })
  }

  /**
   * 📊 Obtener configuración del token
   */
  public static getTokenConfig() {
    return { ...this.TOKEN_CONFIG }
  }

  /**
   * 🎨 Obtener colores del token
   */
  public static getColors() {
    return { ...this.TOKEN_CONFIG.colors }
  }
}

// Inyectar estilos automáticamente cuando se carga el módulo
if (typeof document !== 'undefined') {
  QuantumTokenLogo.injectStyles()
}

// Exponer globalmente para uso en navegador
if (typeof window !== 'undefined') {
  (window as any).QuantumTokenLogo = QuantumTokenLogo
}
