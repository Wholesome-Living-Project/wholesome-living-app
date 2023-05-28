import { Flex } from 'axelra-styled-bootstrap-grid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
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

const FinanceGraph = () => {
  const [data, setData] = useState([])
  const userId = 'RafaelDubach'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/investment', {
          headers: {
            userId: userId,
          },
        })

        // Transform fetched data
        const transformedData = response.data.map((item) => ({
          ...item,
          investmentTime: new Date(item.investmentTime * 1000).toISOString().slice(0, 10),
        }))

        // Sort data by investmentTime in ascending order
        // @ts-ignore
        transformedData.sort((a, b) => new Date(a.investmentTime) - new Date(b.investmentTime))

        setData(transformedData)
        console.log('Fetched data:', transformedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const GraphContent = styled(Flex)``

  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  })

  const handleMouseEnter = useCallback(
    (o) => {
      const { dataKey } = o

      setOpacity({ ...opacity, [dataKey]: 0.5 })
    },
    [opacity, setOpacity]
  )

  const handleMouseLeave = useCallback(
    (o) => {
      const { dataKey } = o
      setOpacity({ ...opacity, [dataKey]: 1 })
    },
    [opacity, setOpacity]
  )

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h3>Track your overall progress</h3>
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="investmentTime" />
            <YAxis label={{ value: 'Invested amount', angle: -90 }} tick={false} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3>Track your weekly progress</h3>
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="investmentTime" />
            <YAxis label={{ value: 'Invested amount', angle: -90 }} tick={false} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <Area
              type="monotone"
              dataKey="amount"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Invested amount"
            />
            <Area
              type="monotone"
              dataKey="amount"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Planned amount"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceGraph
