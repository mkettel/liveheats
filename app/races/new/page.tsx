'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Student, Race } from '@/app/types'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function NewRace() {
  const [students, setStudents] = useState<Student[]>([{ name: '', lane: 1 }])
  const [raceDetails, setRaceDetails] = useState<Race>({ id: '', name: '', students: [] })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const addStudent = () => {
    // Adds a new student to the students array with an empty name and the next lane number
    setStudents([...students, { name: '', lane: students.length + 1 }])
  }

  const removeStudent = (index: number) => {
    // Removes a student from the students array
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents)
  }

  const handleStudentChange = (index: number, field: 'name' | 'lane', value: string) => {
    const updatedStudents = students.map((student, i) => {
      if (i === index) {
        return { ...student, [field]: field === 'lane' ? parseInt(value) : value }
      }
      return student
    })
    setStudents(updatedStudents)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // must be at least 2 students to submit and create a race
    if (students.length < 2) {
      setError('You must have at least 2 students to create a race')
      return
    }

    const newRace: Race = {
      id: Date.now().toString(),
      name: raceDetails.name,
      students: students.map((student) => ({ ...student, place: 0 })),
    }

    const storedRaces = localStorage.getItem('races')
    const races = storedRaces ? JSON.parse(storedRaces) : []
    localStorage.setItem('races', JSON.stringify([...races, newRace]))
    router.push('/races')
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Button asChild variant='outline'>
        <Link href="/" className="mb-4 inline-block"> &larr; Back to Home</Link>
      </Button>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className='text-2xl'>Create New Race</CardTitle>
        </CardHeader>
        <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type='text'
              value={raceDetails.name}
              onChange={(e) => setRaceDetails({ ...raceDetails, name: e.target.value })}
              placeholder='Race Name'
              required
              className='text-md font-bold'
              />
            {students.map((student, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  type="text"
                  value={student.name}
                  onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                  placeholder="Student Name"
                  required
                />
                <Input
                  type="number"
                  value={student.lane}
                  onChange={(e) => handleStudentChange(index, 'lane', e.target.value)}
                  placeholder="Lane"
                  required
                  min="1"
                />
                <Button type="button" onClick={() => removeStudent(index)} variant='destructive'>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addStudent} variant="secondary" className="mr-2">
              Add Student
            </Button>
            <Button type="submit">Create Race</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}