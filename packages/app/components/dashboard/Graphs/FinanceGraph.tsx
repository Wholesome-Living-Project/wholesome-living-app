import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 800px;
  margin: 2em auto;
  background-color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`

const MS_TO_SECONDS = 1000

const FinanceGraph = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const userId = 'RafaelDubach'

  const fetchData = async () => {
    try {
      const [investmentResponse, settingsResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8080/finance', {
          headers: {
            userId: userId,
          },
        }),
        axios.get('http://127.0.0.1:8080/settings', {
          headers: {
            userId: userId,
          },
        }),
      ])

      if (investmentResponse.data && settingsResponse.data) {
        const transformedFinanceData = investmentResponse.data.map((item) => ({
          ...item,
          investmentTime: new Date(item.investmentTime * MS_TO_SECONDS).toISOString().slice(0, 10),
        }))

        // @ts-ignore
        transformedFinanceData.sort(
          (a, b) => new Date(a.investmentTime) - new Date(b.investmentTime)
        )

        const settingsData = settingsResponse.data

        // Sum the amounts per month
        const monthlyData = transformedFinanceData.reduce((accumulator, item) => {
          const month = item.investmentTime.slice(0, 7) // Extract the year and month (e.g., "2023-05")
          if (!accumulator[month]) {
            accumulator[month] = 0
          }
          accumulator[month] += item.amount
          return accumulator
        }, {})

        // Create an array of objects with the monthly data
        const combinedData = Object.entries(monthlyData).map(([investmentTime, amount]) => ({
          investmentTime,
          amount,
          investmentGoal: settingsData.finance.investmentGoal,
        }))

        setData(combinedData)
        console.log('Fetched combined data:', combinedData)
      } else {
        console.error('Response data is missing')
        setError('Response data is missing')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, 5000) // Fetch data every 5 seconds

    return () => {
      clearInterval(interval) // Clean up the interval when the component unmounts
    }
  }, [])

  const [opacity, setOpacity] = useState({
    amount: 1,
    investmentGoal: 1,
  })

  const handleMouseEnter = useCallback((o) => {
    const { dataKey } = o

    setOpacity((prevOpacity) => ({
      ...prevOpacity,
      [dataKey]: 0.5,
    }))
  }, [])

  const handleMouseLeave = useCallback((o) => {
    const { dataKey } = o

    setOpacity((prevOpacity) => ({
      ...prevOpacity,
      [dataKey]: 1,
    }))
  }, [])

  // Define custom legend labels
  const legendLabels = {
    amount: 'Invested Amount',
    investmentGoal: 'Investment Goal',
  }

  // @ts-ignore
  return (
    <Container>
      <h5>Track your investment progress</h5>
      {error && <p>Error: {error.message}</p>}
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="amount" stroke="#d66ef0" name={legendLabels.amount} />
            <Line
              type="monotone"
              dataKey="investmentGoal"
              stroke="#6363F2"
              name={legendLabels.investmentGoal}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="investmentTime" />
            <YAxis label={{ value: 'Invested amount', angle: -90 }} tick={false} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*      <h3>Track your other progress</h3>
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="investmentTime" />
            <YAxis />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <Bar
              dataKey="investmentGoal"
              fill="#6363F2"
              background={{ fill: '#eee' }}
              name={legendLabels.investmentGoal}
            />
            <Bar dataKey="amount" fill="#d66ef0" name={legendLabels.amount} />
          </BarChart>
        </ResponsiveContainer>
      </div>*/}
    </Container>
  )
}

export default FinanceGraph
