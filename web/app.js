// Quantum Blockchain Hub - JavaScript Application
// Sistema de gestión y visualización para blockchain cuántico

class QuantumBlockchainApp {
    constructor() {
        this.isInitialized = false;
        this.currentSection = 'dashboard';
        this.charts = {};
        this.data = {
            blocks: [],
            transactions: [],
            aiAnalytics: [],
            performance: []
        };
        
        this.init();
    }
    
    init() {
        console.log('🚀 Inicializando Quantum Blockchain Hub...');
        
        // Inicializar datos simulados
        this.initializeData();
        
        // Configurar gráficos
        this.initializeCharts();
        
        // Inicializar secciones
        this.initializeSections();
        
        // Inicializar actualizaciones en tiempo real
        this.startRealTimeUpdates();
        
        this.isInitialized = true;
        console.log('✅ Sistema inicializado correctamente');
    }
    
    initializeData() {
        // Generar bloques de ejemplo
        for (let i = 0; i < 10; i++) {
            this.data.blocks.push({
                id: i + 1,
                hash: this.generateHash(),
                previousHash: i > 0 ? this.data.blocks[i-1]?.hash || '0'.repeat(64) : '0'.repeat(64),
                timestamp: Date.now() - (i * 120000), // Cada 2 minutos
                transactions: Math.floor(Math.random() * 50) + 1,
                merkleRoot: this.generateHash(),
                nonce: Math.floor(Math.random() * 1000000),
                difficulty: 4567890,
                size: Math.floor(Math.random() * 500) + 100
            });
        }
        
        // Generar transacciones de ejemplo
        for (let i = 0; i < 20; i++) {
            this.data.transactions.push({
                id: this.generateHash().substring(0, 16),
                type: this.getRandomTransactionType(),
                amount: Math.floor(Math.random() * 1000) + 10,
                timestamp: Date.now() - (i * 30000),
                status: this.getRandomStatus(),
                from: this.generateAddress(),
                to: this.generateAddress()
            });
        }
        
        // Generar datos de rendimiento
        for (let i = 0; i < 24; i++) {
            this.data.performance.push({
                time: i,
                cpu: Math.floor(Math.random() * 40) + 20,
                memory: Math.floor(Math.random() * 30) + 40,
                network: Math.floor(Math.random() * 50) + 30
            });
        }
        
        // Generar datos de IA
        for (let i = 0; i < 12; i++) {
            this.data.aiAnalytics.push({
                time: i,
                medical: Math.floor(Math.random() * 20) + 80,
                security: Math.floor(Math.random() * 15) + 85,
                research: Math.floor(Math.random() * 25) + 70
            });
        }
    }
    
    initializeCharts() {
        // Gráfico de rendimiento del sistema
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            this.charts.performance = new Chart(performanceCtx, {
                type: 'line',
                data: {
                    labels: this.data.performance.map(d => `${d.time}:00`),
                    datasets: [
                        {
                            label: 'CPU %',
                            data: this.data.performance.map(d => d.cpu),
                            borderColor: '#60a5fa',
                            backgroundColor: 'rgba(96, 165, 250, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Memoria %',
                            data: this.data.performance.map(d => d.memory),
                            borderColor: '#34d399',
                            backgroundColor: 'rgba(52, 211, 153, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Red %',
                            data: this.data.performance.map(d => d.network),
                            borderColor: '#fbbf24',
                            backgroundColor: 'rgba(251, 191, 36, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        x: { ticks: { color: '#9ca3af' } },
                        y: { 
                            ticks: { color: '#9ca3af' },
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
        
        // Gráfico de transacciones diarias
        const transactionsCtx = document.getElementById('transactionsChart');
        if (transactionsCtx) {
            this.charts.transactions = new Chart(transactionsCtx, {
                type: 'bar',
                data: {
                    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Transacciones',
                        data: [420, 385, 460, 520, 380, 290, 340],
                        backgroundColor: [
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(168, 85, 247, 0.8)',
                            'rgba(251, 191, 36, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(20, 184, 166, 0.8)',
                            'rgba(244, 63, 94, 0.8)'
                        ],
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        x: { ticks: { color: '#9ca3af' } },
                        y: { 
                            ticks: { color: '#9ca3af' },
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        // Gráfico de análisis de IA
        const aiCtx = document.getElementById('aiAnalyticsChart');
        if (aiCtx) {
            this.charts.aiAnalytics = new Chart(aiCtx, {
                type: 'radar',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    datasets: [
                        {
                            label: 'Análisis Médico',
                            data: this.data.aiAnalytics.map(d => d.medical),
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                            pointBackgroundColor: '#ef4444'
                        },
                        {
                            label: 'Seguridad',
                            data: this.data.aiAnalytics.map(d => d.security),
                            borderColor: '#8b5cf6',
                            backgroundColor: 'rgba(139, 92, 246, 0.2)',
                            pointBackgroundColor: '#8b5cf6'
                        },
                        {
                            label: 'Investigación',
                            data: this.data.aiAnalytics.map(d => d.research),
                            borderColor: '#06b6d4',
                            backgroundColor: 'rgba(6, 182, 212, 0.2)',
                            pointBackgroundColor: '#06b6d4'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        r: {
                            angleLines: { color: '#374151' },
                            grid: { color: '#374151' },
                            pointLabels: { color: '#9ca3af' },
                            ticks: { 
                                color: '#9ca3af',
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                }
            });
        }
    }
    
    initializeSections() {
        // Mostrar dashboard por defecto
        this.showSection('dashboard');
        
        // Renderizar blockchain
        this.renderBlockchain();
        
        // Renderizar actividad reciente
        this.renderRecentActivity();
        
        // Renderizar historial de transacciones
        this.renderTransactionHistory();
        
        // Inicializar consola de IA
        this.initializeAIConsole();
    }
    
    startRealTimeUpdates() {
        // Actualizar datos cada 5 segundos
        setInterval(() => {
            this.updateRealTimeData();
        }, 5000);
        
        // Actualizar estadísticas cada 10 segundos
        setInterval(() => {
            this.updateStats();
        }, 10000);
        
        // Actualizar consola de IA cada 3 segundos
        setInterval(() => {
            this.updateAIConsole();
        }, 3000);
    }
    
    updateRealTimeData() {
        // Actualizar contadores
        const elements = {
            'block-count': () => Math.floor(Math.random() * 10) + 1240,
            'ai-accuracy': () => (Math.random() * 2 + 93).toFixed(1) + '%',
            'tx-count': () => Math.floor(Math.random() * 100) + 3800,
            'project-count': () => Math.floor(Math.random() * 3) + 6
        };
        
        Object.entries(elements).forEach(([id, generator]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = generator();
            }
        });
    }
    
    updateStats() {
        // Simular nuevos bloques ocasionalmente
        if (Math.random() < 0.3) {
            this.addNewBlock();
        }
        
        // Actualizar tiempo del último bloque
        const lastBlockTime = document.getElementById('last-block-time');
        if (lastBlockTime) {
            const minutes = Math.floor(Math.random() * 5) + 1;
            lastBlockTime.textContent = `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        }
    }
    
    updateAIConsole() {
        const console = document.getElementById('ai-console');
        if (!console) return;
        
        const messages = [
            { type: 'info', text: 'Procesando nueva transacción cuántica' },
            { type: 'analysis', text: 'Analizando patrones de blockchain' },
            { type: 'security', text: 'Verificando integridad de red' },
            { type: 'research', text: 'Optimizando algoritmos cuánticos' },
            { type: 'success', text: 'Consenso cuántico alcanzado' },
            { type: 'warning', text: 'Detector de anomalías activado' }
        ];
        
        if (Math.random() < 0.4) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            const timestamp = new Date().toLocaleTimeString();
            const colors = {
                info: 'text-green-400',
                analysis: 'text-blue-400',
                security: 'text-yellow-400',
                research: 'text-purple-400',
                success: 'text-green-400',
                warning: 'text-orange-400'
            };
            
            const div = document.createElement('div');
            div.className = colors[message.type];
            div.textContent = `[${timestamp}] ${message.text}`;
            
            console.appendChild(div);
            console.scrollTop = console.scrollHeight;
            
            // Mantener solo las últimas 20 líneas
            while (console.children.length > 20) {
                console.removeChild(console.firstChild);
            }
        }
    }
    
    renderBlockchain() {
        const container = document.getElementById('blockchain-visualizer');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.blocks.slice(-5).forEach((block, index) => {
            const blockElement = document.createElement('div');
            blockElement.className = 'flex-shrink-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-4 w-48 text-center cursor-pointer hover:scale-105 transition-transform';
            blockElement.onclick = () => this.showBlockDetails(block);
            
            blockElement.innerHTML = `
                <div class="text-lg font-bold mb-2">Bloque #${block.id}</div>
                <div class="text-xs text-blue-100 mb-2 font-mono">${block.hash.substring(0, 16)}...</div>
                <div class="text-sm">
                    <div>Transacciones: ${block.transactions}</div>
                    <div>Tiempo: ${this.formatTime(block.timestamp)}</div>
                </div>
            `;
            
            container.appendChild(blockElement);
            
            // Agregar flecha si no es el último bloque
            if (index < 4) {
                const arrow = document.createElement('div');
                arrow.className = 'flex items-center px-2';
                arrow.innerHTML = '<i class="fas fa-arrow-right text-gray-400"></i>';
                container.appendChild(arrow);
            }
        });
    }
    
    renderRecentActivity() {
        const container = document.getElementById('recent-activity');
        if (!container) return;
        
        const activities = [
            { icon: 'fas fa-cube', text: 'Nuevo bloque #1247 minado exitosamente', time: 'Hace 2 minutos', color: 'text-green-400' },
            { icon: 'fas fa-exchange-alt', text: 'Transacción de 150 QTC procesada', time: 'Hace 5 minutos', color: 'text-blue-400' },
            { icon: 'fas fa-brain', text: 'Análisis de IA completado con 94.7% precisión', time: 'Hace 8 minutos', color: 'text-purple-400' },
            { icon: 'fas fa-shield-alt', text: 'Sistema de seguridad actualizado', time: 'Hace 12 minutos', color: 'text-yellow-400' },
            { icon: 'fas fa-users', text: 'Nuevo nodo unido a la red', time: 'Hace 15 minutos', color: 'text-green-400' }
        ];
        
        container.innerHTML = activities.map(activity => `
            <div class="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-3">
                    <i class="${activity.icon} ${activity.color}"></i>
                    <span class="text-sm">${activity.text}</span>
                </div>
                <span class="text-xs text-gray-400">${activity.time}</span>
            </div>
        `).join('');
    }
    
    renderTransactionHistory() {
        const tbody = document.getElementById('transaction-history');
        if (!tbody) return;
        
        tbody.innerHTML = this.data.transactions.slice(0, 10).map(tx => `
            <tr class="border-b border-gray-700 hover:bg-gray-800">
                <td class="py-3 font-mono text-sm">${this.formatTime(tx.timestamp)}</td>
                <td class="py-3">
                    <span class="px-2 py-1 rounded-full text-xs ${this.getTransactionTypeColor(tx.type)}">
                        ${tx.type}
                    </span>
                </td>
                <td class="py-3 font-mono">${tx.amount} QTC</td>
                <td class="py-3">
                    <span class="px-2 py-1 rounded-full text-xs ${this.getStatusColor(tx.status)}">
                        ${tx.status}
                    </span>
                </td>
            </tr>
        `).join('');
    }
    
    initializeAIConsole() {
        const console = document.getElementById('ai-console');
        if (!console) return;
        
        const initialMessages = [
            '[INFO] Sistema de IA Cuántica iniciado',
            '[ANÁLISIS] Procesando datos médicos...',
            '[SEGURIDAD] Escaneando amenazas potenciales',
            '[INVESTIGACIÓN] Generando insights científicos',
            '[SUCCESS] Análisis completado - Precisión: 94.7%'
        ];
        
        console.innerHTML = initialMessages.map(msg => {
            const className = msg.includes('INFO') ? 'text-green-400' :
                             msg.includes('ANÁLISIS') ? 'text-blue-400' :
                             msg.includes('SEGURIDAD') ? 'text-yellow-400' :
                             msg.includes('INVESTIGACIÓN') ? 'text-purple-400' :
                             'text-green-400';
            return `<div class="${className}">${msg}</div>`;
        }).join('');
    }
    
    // Métodos de utilidad
    generateHash() {
        return Array.from({length: 64}, () => 
            '0123456789abcdef'[Math.floor(Math.random() * 16)]
        ).join('');
    }
    
    generateAddress() {
        return 'qtc1' + Array.from({length: 32}, () => 
            '023456789abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 32)]
        ).join('');
    }
    
    getRandomTransactionType() {
        const types = ['Compra', 'Venta', 'Pago', 'Recompensa', 'Transferencia'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    getRandomStatus() {
        const statuses = ['Confirmado', 'Pendiente', 'Procesando'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }
    
    getTransactionTypeColor(type) {
        const colors = {
            'Compra': 'bg-green-600 text-white',
            'Venta': 'bg-red-600 text-white',
            'Pago': 'bg-blue-600 text-white',
            'Recompensa': 'bg-yellow-600 text-black',
            'Transferencia': 'bg-purple-600 text-white'
        };
        return colors[type] || 'bg-gray-600 text-white';
    }
    
    getStatusColor(status) {
        const colors = {
            'Confirmado': 'bg-green-600 text-white',
            'Pendiente': 'bg-yellow-600 text-black',
            'Procesando': 'bg-blue-600 text-white'
        };
        return colors[status] || 'bg-gray-600 text-white';
    }
    
    formatTime(timestamp) {
        return new Date(timestamp).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    addNewBlock() {
        const newBlock = {
            id: this.data.blocks.length + 1,
            hash: this.generateHash(),
            previousHash: this.data.blocks[this.data.blocks.length - 1]?.hash || '0'.repeat(64),
            timestamp: Date.now(),
            transactions: Math.floor(Math.random() * 50) + 1,
            merkleRoot: this.generateHash(),
            nonce: Math.floor(Math.random() * 1000000),
            difficulty: 4567890,
            size: Math.floor(Math.random() * 500) + 100
        };
        
        this.data.blocks.push(newBlock);
        this.renderBlockchain();
        
        // Actualizar contador de bloques
        const blockCount = document.getElementById('block-count');
        if (blockCount) {
            blockCount.textContent = this.data.blocks.length.toLocaleString();
        }
    }
    
    showBlockDetails(block) {
        const container = document.getElementById('block-details');
        if (!container) return;
        
        container.innerHTML = `
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-300">ID:</span>
                    <span class="font-mono text-blue-400">#${block.id}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Hash:</span>
                    <span class="font-mono text-green-400 text-xs">${block.hash.substring(0, 32)}...</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Hash Anterior:</span>
                    <span class="font-mono text-yellow-400 text-xs">${block.previousHash.substring(0, 32)}...</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Timestamp:</span>
                    <span class="text-purple-400">${this.formatTime(block.timestamp)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Transacciones:</span>
                    <span class="text-blue-400">${block.transactions}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Merkle Root:</span>
                    <span class="font-mono text-green-400 text-xs">${block.merkleRoot.substring(0, 32)}...</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Nonce:</span>
                    <span class="text-yellow-400">${block.nonce.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-300">Tamaño:</span>
                    <span class="text-purple-400">${block.size} KB</span>
                </div>
            </div>
        `;
    }
    
    showSection(sectionName) {
        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            this.currentSection = sectionName;
        }
        
        // Cerrar menú móvil
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
        
        // Actualizar gráficos si es necesario
        if (this.charts[sectionName]) {
            setTimeout(() => {
                this.charts[sectionName].resize();
            }, 100);
        }
    }
}

// Funciones globales para interacción
function showSection(sectionName) {
    if (window.quantumApp) {
        window.quantumApp.showSection(sectionName);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Funciones específicas de secciones
function createNewBlock() {
    if (window.quantumApp) {
        window.quantumApp.addNewBlock();
        showNotification('Nuevo bloque creado exitosamente', 'success');
    }
}

function validateChain() {
    showNotification('Cadena de bloques validada correctamente', 'success');
}

function syncNetwork() {
    showNotification('Sincronización de red iniciada', 'info');
}

function runAIAnalysis() {
    const console = document.getElementById('ai-console');
    if (console) {
        const timestamp = new Date().toLocaleTimeString();
        const message = document.createElement('div');
        message.className = 'text-cyan-400';
        message.textContent = `[${timestamp}] Ejecutando análisis de IA avanzado...`;
        console.appendChild(message);
        console.scrollTop = console.scrollHeight;
    }
    showNotification('Análisis de IA iniciado', 'info');
}

function clearConsole() {
    const console = document.getElementById('ai-console');
    if (console) {
        console.innerHTML = '<div class="text-green-400">[INFO] Consola limpiada</div>';
    }
}

function purchaseTokens() {
    showNotification('Proceso de compra de tokens iniciado', 'info');
}

function payForService() {
    showNotification('Procesando pago por servicio cuántico', 'info');
}

// Funciones de investigación
function launchSimulator() {
    showNotification('Iniciando simulador cuántico...', 'info');
}

function launchAnalyzer() {
    showNotification('Cargando analizador de datos...', 'info');
}

function launchDesigner() {
    showNotification('Abriendo diseñador de circuitos...', 'info');
}

function launchOptimizer() {
    showNotification('Ejecutando optimizador cuántico...', 'info');
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${getNotificationClass(type)}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-300">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationClass(type) {
    const classes = {
        'success': 'bg-green-600 text-white',
        'error': 'bg-red-600 text-white',
        'warning': 'bg-yellow-600 text-black',
        'info': 'bg-blue-600 text-white'
    };
    return classes[type] || classes.info;
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Iniciando Quantum Blockchain Hub...');
    window.quantumApp = new QuantumBlockchainApp();
    
    // Agregar efectos de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
        showNotification('¡Bienvenido al Quantum Blockchain Hub!', 'success');
    }, 1000);
});

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error en la aplicación:', event.error);
    showNotification('Se ha producido un error en la aplicación', 'error');
});

// Exportar para uso global
window.QuantumBlockchainApp = QuantumBlockchainApp;