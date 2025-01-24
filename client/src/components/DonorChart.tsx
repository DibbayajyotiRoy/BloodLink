"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DonorCount {
  subdivision: string
  count: number
}

export function DonorChart() {
  const [donorCounts, setDonorCounts] = useState<DonorCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDonorCounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/blooddonor/donor-counts")
        if (!response.ok) {
          throw new Error("Failed to fetch donor counts")
        }
        const data = await response.json()
        setDonorCounts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching donor counts:", error)
        setError("Failed to load donor data")
        setLoading(false)
      }
    }

    fetchDonorCounts()
  }, [])

  if (loading)
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <CardContent>Loading donor data...</CardContent>
      </Card>
    )
  if (error)
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <CardContent>Error: {error}</CardContent>
      </Card>
    )
  if (donorCounts.length === 0)
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <CardContent>No donor data available</CardContent>
      </Card>
    )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Donor Distribution by Subdivision</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={donorCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="subdivision"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              labelStyle={{ fontWeight: "bold", color: "#111827" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="count" name="Number of Donors" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

