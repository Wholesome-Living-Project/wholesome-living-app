import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
  max-width: 800px;
  margin: 2em auto;
  background-color: #fff;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensure the rounded corners are applied */
`

const TableWrapper = styled.div`
  max-height: 500px; /* Adjust this value based on your needs */
  overflow-y: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden; /* Ensure the rounded corners are applied */
`

const TableHeader = styled.th`
  padding: 8px;
  background-color: #6363f2;
  color: #fff;
  text-align: left;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

const TableCell = styled.td`
  padding: 8px;
`

const FinanceTable = () => {
  const [data, setData] = useState<{ amount: number; description: string; spendingTime: number }[]>(
    []
  )
  const [error, setError] = useState('')

  const convertHexToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000) // Multiply by 1000 to convert to milliseconds
    return date.toLocaleDateString() // Use toLocaleDateString() to display only the date
  }

  const fetchData = async () => {
    try {
      const userId = 'RafaelDubach' // Replace with the actual user ID
      const response = await axios.get('http://127.0.0.1:8080/finance', {
        headers: {
          userId: userId,
        },
      })
      if (response.data) {
        setData(response.data)
      } else {
        setError('Response data is missing')
      }
    } catch (error) {
      setError(error.toString())
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, 5000) // Fetch data every 5 seconds

    return () => {
      clearInterval(interval) // Clean up the interval when the component unmounts
    }
  }, [])

  return (
    <TableContainer>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Investment Time</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{convertHexToDate(item.spendingTime)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </TableContainer>
  )
}

export default FinanceTable
