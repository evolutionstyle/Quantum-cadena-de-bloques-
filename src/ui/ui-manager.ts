/**
 * 🎨 UI Manager - Gestor de interfaz de usuario
 * Maneja notificaciones, modales y efectos visuales
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export class UIManager {
  private notificationContainer: HTMLElement
  private modalContainer: HTMLElement

  constructor() {
    this.notificationContainer = this.createNotificationContainer()
    this.modalContainer = document.getElementById('modals-container') || document.body
  }

  /**
   * 📢 Muestra notificación
   */
  public showNotification(
    message: string, 
    type: NotificationType = 'info', 
    duration: number = 3000
  ): void {
    const notification = this.createNotificationElement(message, type)
    this.notificationContainer.appendChild(notification)

    // Animación de entrada
    setTimeout(() => {
      notification.classList.add('translate-x-0', 'opacity-100')
      notification.classList.remove('translate-x-full', 'opacity-0')
    }, 100)

    // Auto-remover
    setTimeout(() => {
      this.removeNotification(notification)
    }, duration)
  }

  /**
   * 🔔 Crea elemento de notificación
   */
  private createNotificationElement(message: string, type: NotificationType): HTMLElement {
    const notification = document.createElement('div')
    
    const baseClasses = [
      'transform', 'translate-x-full', 'opacity-0',
      'transition-all', 'duration-300', 'ease-in-out',
      'mb-4', 'p-4', 'rounded-lg', 'font-cyber', 'text-sm',
      'border', 'backdrop-blur-sm', 'relative', 'overflow-hidden'
    ]

    const typeClasses = {
      success: ['bg-green-900/20', 'border-green-500', 'text-green-400'],
      error: ['bg-red-900/20', 'border-red-500', 'text-red-400'],
      warning: ['bg-yellow-900/20', 'border-yellow-500', 'text-yellow-400'],
      info: ['bg-cyan-900/20', 'border-cyan-500', 'text-cyan-400']
    }

    notification.className = [...baseClasses, ...typeClasses[type]].join(' ')
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span>${message}</span>
        <button class="ml-4 text-gray-400 hover:text-white transition-colors">✕</button>
      </div>
      <div class="absolute bottom-0 left-0 h-1 bg-current opacity-50 animate-pulse" style="width: 100%; animation-duration: ${3000}ms;"></div>
    `

    // Botón de cierre
    const closeBtn = notification.querySelector('button')
    closeBtn?.addEventListener('click', () => this.removeNotification(notification))

    return notification
  }

  /**
   * 🗑️ Remueve notificación
   */
  private removeNotification(notification: HTMLElement): void {
    notification.classList.add('translate-x-full', 'opacity-0')
    notification.classList.remove('translate-x-0', 'opacity-100')
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }

  /**
   * 📦 Crea contenedor de notificaciones
   */
  private createNotificationContainer(): HTMLElement {
    const container = document.createElement('div')
    container.id = 'notification-container'
    container.className = [
      'fixed', 'top-4', 'right-4', 'z-50',
      'max-w-sm', 'w-full'
    ].join(' ')
    
    document.body.appendChild(container)
    return container
  }

  /**
   * 🪟 Muestra modal
   */
  public showModal(title: string, content: string, actions?: Array<{text: string, action: () => void, type?: string}>): void {
    const modal = this.createModalElement(title, content, actions)
    this.modalContainer.appendChild(modal)

    // Animación de entrada
    setTimeout(() => {
      modal.classList.remove('opacity-0')
      modal.classList.add('opacity-100')
      
      const modalContent = modal.querySelector('.modal-content')
      modalContent?.classList.remove('scale-95')
      modalContent?.classList.add('scale-100')
    }, 100)
  }

  /**
   * 🏗️ Crea elemento modal
   */
  private createModalElement(
    title: string, 
    content: string, 
    actions?: Array<{text: string, action: () => void, type?: string}>
  ): HTMLElement {
    const modal = document.createElement('div')
    modal.className = [
      'fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center',
      'bg-black/75', 'backdrop-blur-sm', 'opacity-0', 'transition-opacity', 'duration-300'
    ].join(' ')

    const actionsHtml = actions ? actions.map(action => {
      const btnType = action.type || 'primary'
      const btnClasses = {
        primary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
        secondary: 'border border-gray-500 text-gray-300 hover:bg-gray-700',
        danger: 'bg-red-600 hover:bg-red-500 text-white'
      }
      
      return `
        <button class="px-4 py-2 rounded font-cyber text-sm transition-all duration-300 ${btnClasses[btnType as keyof typeof btnClasses]}" 
                data-action="${action.text}">
          ${action.text}
        </button>
      `
    }).join('') : ''

    modal.innerHTML = `
      <div class="modal-content transform scale-95 transition-transform duration-300 bg-gray-900 border border-cyan-500/30 rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-cyber text-cyan-400">${title}</h3>
          <button class="text-gray-400 hover:text-white transition-colors modal-close">✕</button>
        </div>
        
        <div class="text-gray-300 mb-6">
          ${content}
        </div>
        
        ${actions ? `
          <div class="flex justify-end space-x-3">
            ${actionsHtml}
          </div>
        ` : ''}
      </div>
    `

    // Event listeners
    const closeBtn = modal.querySelector('.modal-close')
    closeBtn?.addEventListener('click', () => this.closeModal(modal))

    // Click fuera del modal para cerrar
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal)
      }
    })

    // Botones de acción
    if (actions) {
      actions.forEach(action => {
        const btn = modal.querySelector(`[data-action="${action.text}"]`)
        btn?.addEventListener('click', () => {
          action.action()
          this.closeModal(modal)
        })
      })
    }

    return modal
  }

  /**
   * 🚪 Cierra modal
   */
  private closeModal(modal: HTMLElement): void {
    modal.classList.remove('opacity-100')
    modal.classList.add('opacity-0')
    
    const modalContent = modal.querySelector('.modal-content')
    modalContent?.classList.remove('scale-100')
    modalContent?.classList.add('scale-95')

    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal)
      }
    }, 300)
  }

  /**
   * 💫 Efecto de loading
   */
  public showLoading(message: string = 'Cargando...'): HTMLElement {
    const loading = document.createElement('div')
    loading.className = [
      'fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center',
      'bg-black/75', 'backdrop-blur-sm'
    ].join(' ')

    loading.innerHTML = `
      <div class="text-center">
        <div class="text-6xl mb-4 animate-spin">🔮</div>
        <div class="text-xl font-cyber text-cyan-400">${message}</div>
        <div class="mt-4">
          <div class="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(loading)
    return loading
  }

  /**
   * 🛑 Oculta loading
   */
  public hideLoading(loadingElement: HTMLElement): void {
    if (loadingElement.parentNode) {
      loadingElement.parentNode.removeChild(loadingElement)
    }
  }

  /**
   * ✨ Efecto de brillo en elemento
   */
  public addGlowEffect(element: HTMLElement, duration: number = 2000): void {
    element.classList.add('animate-glow')
    setTimeout(() => {
      element.classList.remove('animate-glow')
    }, duration)
  }

  /**
   * 🎆 Efecto de celebración
   */
  public celebrate(): void {
    const celebration = document.createElement('div')
    celebration.className = 'fixed inset-0 pointer-events-none z-40'
    
    // Crear confetti cuántico
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.textContent = ['🔮', '⚛️', '✨', '💎', '🌟'][Math.floor(Math.random() * 5)]
      confetti.className = 'absolute text-2xl animate-bounce'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.top = Math.random() * 100 + '%'
      confetti.style.animationDelay = Math.random() * 2 + 's'
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'
      celebration.appendChild(confetti)
    }

    document.body.appendChild(celebration)

    // Remover después de la animación
    setTimeout(() => {
      if (celebration.parentNode) {
        celebration.parentNode.removeChild(celebration)
      }
    }, 5000)
  }

  /**
   * 🎨 Actualiza tema de colores
   */
  public updateTheme(theme: 'cyber' | 'quantum' | 'matrix'): void {
    const body = document.body
    body.classList.remove('theme-cyber', 'theme-quantum', 'theme-matrix')
    body.classList.add(`theme-${theme}`)
    
    this.showNotification(`🎨 Tema cambiado a ${theme.toUpperCase()}`, 'info')
  }
}