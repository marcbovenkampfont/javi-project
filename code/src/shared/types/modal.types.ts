export const ModalType = {
  MENU: "MULTA_RESUME",
  NONE: "NONE"
} as const

export type ModalType = typeof ModalType[keyof typeof ModalType]