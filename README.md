# try-never-throw

Convert throwing functions into Result types. Zero dependencies, 4 functions, full TypeScript support.

[![npm version](https://badge.fury.io/js/try-never-throw.svg)](https://badge.fury.io/js/try-never-throw)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install try-never-throw
pnpm add try-never-throw
yarn add try-never-throw
```

## Usage

```typescript
import { tryit, tryitAsync, isSuccess, isError } from 'try-never-throw'

// Sync operations
const result = tryit(() => maybeThrowing())
if (isSuccess(result)) {
  console.log(result.value)
}

// Async operations
const result = await tryitAsync(() => maybeThrowingAsync())
if (isError(result)) {
  console.error(result.error)
}
```

## Alternatives

For advanced use cases:

- [neverthrow](https://github.com/supermacro/neverthrow)
- [fp-ts](https://github.com/gcanti/fp-ts)
