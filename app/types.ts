export interface Student {
  name: string
  lane: number
  place?: number
}

export interface Race {
  id: string
  name?: string
  students: Student[]
}