/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./quantum.html", 
    "./demo.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        cyber: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344'
        },
        neon: {
          pink: '#ff006e',
          blue: '#00f5ff',
          green: '#39ff14',
          purple: '#bf40bf'
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'quantum': ['Exo 2', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { 
            'box-shadow': '0 0 5px theme(colors.cyan.400), 0 0 10px theme(colors.cyan.400), 0 0 15px theme(colors.cyan.400)' 
          },
          '100%': { 
            'box-shadow': '0 0 10px theme(colors.cyan.400), 0 0 20px theme(colors.cyan.400), 0 0 30px theme(colors.cyan.400)' 
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-quantum': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-matrix': 'linear-gradient(0deg, #000000 0%, #0a0a0a 100%)'
      }
    }
  },
  plugins: []
}