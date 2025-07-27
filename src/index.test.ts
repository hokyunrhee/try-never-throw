import { describe, it, expect } from 'vitest'
import { tryitAsync, tryit, isSuccess, isError } from './index'

describe('tryitAsync', () => {
  it('should return success result when async function succeeds', async () => {
    const result = await tryitAsync(async () => 5 * 2)
    expect(result).toEqual({ success: true, value: 10 })
  })

  it('should return error result when async function throws', async () => {
    const result = await tryitAsync(async () => {
      throw new Error('Something went wrong')
    })
    expect(result).toEqual({
      success: false,
      error: expect.objectContaining({
        message: 'Something went wrong',
      }),
    })
  })
})

describe('tryit', () => {
  it('should return success result when sync function succeeds', () => {
    const result = tryit(() => 3 + 4)
    expect(result).toEqual({ success: true, value: 7 })
  })

  it('should return error result when sync function throws', () => {
    const result = tryit(() => {
      throw new Error('Sync error')
    })
    expect(result).toEqual({
      success: false,
      error: expect.objectContaining({
        message: 'Sync error',
      }),
    })
  })
})

describe('isSuccess', () => {
  it('should return true for success result', () => {
    const result = { success: true as const, value: 42 }
    expect(isSuccess(result)).toBe(true)
  })

  it('should return false for error result', () => {
    const result = { success: false as const, error: new Error('test') }
    expect(isSuccess(result)).toBe(false)
  })
})

describe('isError', () => {
  it('should return true for error result', () => {
    const result = { success: false as const, error: new Error('test') }
    expect(isError(result)).toBe(true)
  })

  it('should return false for success result', () => {
    const result = { success: true as const, value: 42 }
    expect(isError(result)).toBe(false)
  })
})
