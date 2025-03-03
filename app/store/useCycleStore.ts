// app/store/useCycleStore.ts
import { create } from 'zustand'

interface CycleState {
  cycleValue: number
  setCycleValue: (value: number) => void
  cycleSpeed: number
  setCycleSpeed: (speed: number) => void
  manualControl: boolean
  setManualControl: (manual: boolean) => void
  cyclePosition: number
  setCyclePosition: (position: number) => void
}

export const useCycleStore = create<CycleState>((set) => ({
  cycleValue: 0,
  setCycleValue: (value) => set({ cycleValue: value }),
  cycleSpeed: 0.1,
  setCycleSpeed: (speed) => set({ cycleSpeed: speed }),
  manualControl: false,
  setManualControl: (manual) => set({ manualControl: manual }),
  cyclePosition: 0.0,
  setCyclePosition: (position) => set({ cyclePosition: position })
}))