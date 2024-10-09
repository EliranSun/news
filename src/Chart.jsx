import React, { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Brush,
} from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { x, y, name } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p><strong>Episode:</strong> {x}</p>
                <p><strong>Rating:</strong> {y}</p>
                <p><strong>Name:</strong> {name}</p>
            </div>
        );
    }
    return null;
};

export const Chart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://www.ratingraph.com/show-episodes-graph/17673/average_rating/?_=1727688096966')
            .then(response => response.json())
            .then(data => {
                const slicedData = data.data[1].data.slice(-50);
                setData(slicedData);
            });
    }, []);

    if (data.length === 0) return null;

    console.log(data);

    const xDomain = [data[0].x, 'dataMax'];

    return (
        <div style={{ width: '800px', height: '400px' }}>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis
                        type="number"
                        dataKey="x"
                        name="Episode"
                        allowDataOverflow={true}
                        domain={xDomain}  // Set the domain dynamically
                    />
                    <YAxis
                        type="number"
                        dataKey="y"
                        name="Rating"
                        domain={[0, 10]}
                        allowDataOverflow={true}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Episodes" data={data} fill="#8884d8" />
                    <Brush dataKey="x" height={30} stroke="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;