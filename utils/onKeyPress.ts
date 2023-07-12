import React from 'react'
import { Key } from 'ts-key-enum'

type KeyboardKey = keyof typeof Key

export const onKeyPress = (
  e: React.KeyboardEvent,
  key: KeyboardKey[],
  callback: ((event: React.KeyboardEvent, key: KeyboardKey) => void)[],
) => {
  key.forEach((k, i) => {
    if (e.key === k) {
      callback[i](e, k)
    }
  })
}
