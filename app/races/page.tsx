'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Race } from '@/app/types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Races() {
  const [races, setRaces] = useState<Race[]>([])

  // Get the races from local storage when the component mounts
  useEffect(() => {
    const storedRaces = localStorage.getItem('races')
    if (storedRaces) {
      setRaces(JSON.parse(storedRaces))
    }
  }, [])

  const formatIdToDateString = (id: string) => {
    const date = new Date(parseInt(id))
    console.log('date', date);
    return date.toDateString()
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Button asChild variant='outline'>
        <Link href="/" className="mb-4 inline-block"> &larr; Back to Home</Link>
      </Button>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className='text-2xl'>All Races</CardTitle>
        </CardHeader>
        <CardContent>
          {races.length === 0 ? (
            <p>No races found. Create a new race to get started.</p>
          ) : (
            <ul className="">
              {races.map((race) => (
                <>
                  <Link href={`/races/${race.id}`} className="capitalize ">
                    <div className="flex justify-between items-center w-full hover:transform hover:translate-x-1 mt-2 mb-1 duration-200">
                      <li key={race.id} className=''>
                          Race {race.name ? race.name : 'Unnamed'}
                      </li>
                      <p className='m-0'>
                        {formatIdToDateString(race.id)}
                      </p>
                    </div>
                  </Link>
                  <Separator  />
                </>
              ))}
            </ul>
          )}
          <Button asChild className="mt-6">
            <Link href="/races/new">Create New Race</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}