'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Race, Student } from '@/app/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

export default function RaceDetails({ params }: { params: { id: string } }) {
  const [race, setRace] = useState<Race | null>(null)
  const router = useRouter()

  // From the URL params get the ID and then get the corresponding race from local storage
  useEffect(() => {
    const storedRaces = localStorage.getItem('races')
    if (storedRaces) {
      const races: Race[] = JSON.parse(storedRaces)
      const foundRace = races.find((r) => r.id === params.id)
      if (foundRace) {
        setRace(foundRace)
      }
      console.log('foundRace', foundRace);
    }
  }, [params.id])

  // Update the place of a student if the place input is changed 
  const handlePlaceChange = (studentIndex: number, place: number) => {
    if (!race) return

    const updatedStudents = race.students.map((student, index) => {
      if (index === studentIndex) {
        return { ...student, place }
      }
      return student
    })

    const updatedRace = { ...race, students: updatedStudents }
    setRace(updatedRace)

    const storedRaces = localStorage.getItem('races')
    if (storedRaces) {
      const races: Race[] = JSON.parse(storedRaces)
      const updatedRaces = races.map((r) => (r.id === race.id ? updatedRace : r))
      localStorage.setItem('races', JSON.stringify(updatedRaces))
    }
  }

  if (!race) {
    return <div>Loading...</div>
  }

  // Students place is first, then make the bg color of the row green

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Button asChild variant='outline'>
        <Link href="/races" className="mb-4 inline-block"> &larr; Back to Races</Link>
      </Button>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Race Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Lane</TableHead>
                <TableHead>Place</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {race.students.map((student, index) => (
                <TableRow key={index} className={`${student.place === 1 ? 'bg-green-100 hover:bg-green-200' : ''}`}>
                  <TableCell className='capitalize'>{student.name}</TableCell>
                  <TableCell>{student.lane}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={student.place || ''}
                      onChange={(e) => handlePlaceChange(index, parseInt(e.target.value))}
                      className="w-20"
                      min="1"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={() => router.push('/races')} className="mt-4">
            Back to Races
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}