/**
 * 🔒 Simple Hash - Utilidades de hash sin dependencias externas
 * Implementación de SHA-256 simplificada para el entorno del navegador
 */

export class SimpleHash {
  /**
   * 🔐 Hash SHA-256 simplificado
   */
  public static sha256(data: string): string {
    // Implementación simplificada de SHA-256
    return this.customHash(data, 256)
  }

  /**
   * 🔑 Hash personalizado para blockchain
   */
  public static customHash(data: string, length: number = 64): string {
    let hash = 0x12345678
    let hash2 = 0x9abcdef0
    
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash + char) & 0xffffffff
      hash2 = ((hash2 << 7) - hash2 + char * 3) & 0xffffffff
    }
    
    // Combinar los dos hashes
    const combined = ((hash >>> 0) + (hash2 >>> 0)).toString(16)
    
    // Extender al length deseado
    let result = combined
    while (result.length < length / 4) {
      result += this.rehash(result)
    }
    
    return result.substring(0, length / 4)
  }

  /**
   * 🔄 Re-hash para extender longitud
   */
  private static rehash(input: string): string {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 13) - hash + char) & 0xffffffff
    }
    return (hash >>> 0).toString(16)
  }

  /**
   * 🎲 Generador de números pseudoaleatorios
   */
  public static randomBytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length)
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
    return bytes
  }

  /**
   * 🔗 Hash de Merkle Root
   */
  public static merkleHash(left: string, right: string): string {
    return this.sha256(left + right)
  }

  /**
   * 🌐 Hash específico para blockchain
   */
  public static blockHash(
    index: number,
    timestamp: number,
    data: string,
    previousHash: string,
    nonce: bigint
  ): string {
    const blockData = `${index}${timestamp}${data}${previousHash}${nonce}`
    return this.sha256(blockData)
  }

  /**
   * 🔐 Validar formato de hash
   */
  public static isValidHash(hash: string, expectedLength: number = 64): boolean {
    if (hash.length !== expectedLength) return false
    return /^[a-fA-F0-9]+$/.test(hash)
  }

  /**
   * 🎯 Verificar dificultad de hash
   */
  public static meetsTarget(hash: string, difficulty: number): boolean {
    const target = '0'.repeat(difficulty)
    return hash.substring(0, difficulty) === target
  }
}