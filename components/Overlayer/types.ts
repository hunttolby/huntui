type OverlayerUse = 'use'
export type OverlayerType = 'modal' | 'confirm' | 'drawer' | OverlayerUse

export type OverlayerOptions = {
  onClose?: () => void
  onOpen?: () => void
}