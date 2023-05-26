import { Flex } from 'axelra-styled-bootstrap-grid'
import axios from 'axios'
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
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

const GraphComponent = () => {
  /*const data = [
    {
      _id: '64551d7cdf3cd21385680409',
      userId: 'string',
      investmentTime: '2023-01-15',
      amount: 10,
    },
    {
      _id: '64551d8edf3cd2138568040a',
      userId: 'string',
      investmentTime: '2023-02-10',
      amount: 12,
    },
    {
      _id: '64551d97df3cd2138568040b',
      userId: 'string',
      investmentTime: '2023-03-22',
      amount: 122,
    },
    {
      _id: '64551e28df3cd2138568040c',
      userId: 'string',
      investmentTime: '2023-04-05',
      amount: 50,
    },
    {
      _id: '64551e37df3cd2138568040d',
      userId: 'string',
      investmentTime: '2023-05-18',
      amount: 75,
    },
    {
      _id: '64551e41df3cd2138568040e',
      userId: 'string',
      investmentTime: '2023-06-11',
      amount: 35,
    },
    {
      _id: '64551e4adf3cd2138568040f',
      userId: 'string',
      investmentTime: '2023-07-09',
      amount: 80,
    },
    {
      _id: '64551e54df3cd21385680410',
      userId: 'string',
      investmentTime: '2023-08-17',
      amount: 65,
    },
    {
      _id: '64551e5cdf3cd21385680411',
      userId: 'string',
      investmentTime: '2023-09-24',
      amount: 45,
    },
    {
      _id: '64551e66df3cd21385680412',
      userId: 'string',
      investmentTime: '2023-10-13',
      amount: 90,
    },
    {
      _id: '64551e70df3cd21385680413',
      userId: 'string',
      investmentTime: '2023-11-08',
      amount: 30,
    },
    {
      _id: '64551e78df3cd21385680414',
      userId: 'string',
      investmentTime: '2023-12-27',
      amount: 55,
    },
    {
      _id: '64551e78df3cd21385680414',
      userId: 'string',
      investmentTime: '2023-05-20',
      amount: 13,
    },
  ]*/

  const [data, setData] = useState([])
  //const userId = getCurrentUser()
  const userId = 'string'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/investment', {
          headers: {
            userId: userId,
          },
        })
        setData(response.data)
        console.log('Fetched data:', response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const GraphContent = styled(Flex)``

  // Assuming 'data' is an array of objects with 'investmentTime' and 'amount' properties
  const currentDate = new Date()

  // Filter for current month
  const currentMonth = currentDate.getMonth()
  const startOfMonthDate = startOfMonth(currentDate)
  const endOfMonthDate = endOfMonth(currentDate)
  const filteredDataMonth = data.filter((item) => {
    const investmentTime = new Date(item.investmentTime)
    return investmentTime >= startOfMonthDate && investmentTime <= endOfMonthDate
  })

  // Filter for current day
  const currentDay = currentDate.getDate()
  const startOfDayDate = startOfDay(currentDate)
  const endOfDayDate = endOfDay(currentDate)
  const filteredDataDay = data.filter((item) => {
    const investmentTime = new Date(item.investmentTime)
    return investmentTime >= startOfDayDate && investmentTime <= endOfDayDate
  })

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
    <div style={{ width: '100%', height: '300px', maxWidth: '800px', margin: '0 auto' }}>
      <h3>Track your overall progress</h3>
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

      {/*      <h3>Track your weekly progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
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
          <Area type="monotone" dataKey="amount" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area
            type="monotone"
            dataKey="plannedAmount"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>*/}
    </div>
  )
}

export default GraphComponent
