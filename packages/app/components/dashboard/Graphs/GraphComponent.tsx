import React from 'react'
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

const GraphComponent = () => {
  const data = [
    {
      id: '64551d7cdf3cd21385680409',
      userId: 'string',
      investmentTime: '2023-01-15',
      amount: 10,
    },
    {
      id: '64551d8edf3cd2138568040a',
      userId: 'string',
      investmentTime: '2023-02-10',
      amount: 12,
    },
    {
      id: '64551d97df3cd2138568040b',
      userId: 'string',
      investmentTime: '2023-03-22',
      amount: 122,
    },
    {
      id: '64551e28df3cd2138568040c',
      userId: 'string',
      investmentTime: '2023-04-05',
      amount: 50,
    },
    {
      id: '64551e37df3cd2138568040d',
      userId: 'string',
      investmentTime: '2023-05-18',
      amount: 75,
    },
    {
      id: '64551e41df3cd2138568040e',
      userId: 'string',
      investmentTime: '2023-06-11',
      amount: 35,
    },
    {
      id: '64551e4adf3cd2138568040f',
      userId: 'string',
      investmentTime: '2023-07-09',
      amount: 80,
    },
    {
      id: '64551e54df3cd21385680410',
      userId: 'string',
      investmentTime: '2023-08-17',
      amount: 65,
    },
    {
      id: '64551e5cdf3cd21385680411',
      userId: 'string',
      investmentTime: '2023-09-24',
      amount: 45,
    },
    {
      id: '64551e66df3cd21385680412',
      userId: 'string',
      investmentTime: '2023-10-13',
      amount: 90,
    },
    {
      id: '64551e70df3cd21385680413',
      userId: 'string',
      investmentTime: '2023-11-08',
      amount: 30,
    },
    {
      id: '64551e78df3cd21385680414',
      userId: 'string',
      investmentTime: '2023-12-27',
      amount: 55,
    },
  ]

  return (
    <div style={{ width: '100%', height: '400px', maxWidth: '800px', margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="investmentTime" />
          <YAxis label={{ value: 'Invested amount', angle: -90 }} tick={false} />
          <Tooltip />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: '#f5f5f5',
              border: '1px solid #d5d5d5',
              borderRadius: 3,
              lineHeight: '40px',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraphComponent
