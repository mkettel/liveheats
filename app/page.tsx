'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      <h1 className="text-4xl font-bold mb-8">Liveheats Race Management</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Button asChild>
              <Link href="/races/new" className="text-blue-500 ">
                Create New Race
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant='secondary' >
              <Link href="/races" className="text-blue-500 ">
                View All Races
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </main>
  )
}
