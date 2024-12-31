"use client";

import React, { ReactNode } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Sample data for charts
const chartData = [
    { metric: "Inherent Risk", inherent: 80, mitigated: 50, residual: 30 },
    { metric: "Mitigation Control", inherent: 70, mitigated: 40, residual: 20 },
    { metric: "Residual Risk", inherent: 60, mitigated: 30, residual: 15 },
    { metric: "Risk Codes Analyzed", inherent: 90, mitigated: 60, residual: 35 },
    { metric: "Risk Mitigated", inherent: 85, mitigated: 70, residual: 20 },
];

// Pie chart data
const pieData = [
    { name: "Inherent Risk", value: 400 },
    { name: "Mitigated Risk", value: 300 },
    { name: "Residual Risk", value: 200 },
];

// Pie chart colors
const COLORS = ["#2563eb", "#60a5fa", "#34d399"];

const ChartContainer: React.FC<{ className?: string, children: ReactNode, style?: React.CSSProperties }> = ({ children, className, style }) => (
    <div
        className={`p-6 rounded-lg shadow-lg ${className}`}
        style={{
            ...style,
           
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
            

        }}
    >
        {children}
    </div>
);

export default function RiskAnalysisCharts() {
    return (
        <div className="flex flex-col items-center gap-4 p-4" style={{ background: "#000", color: "#fff" }}>
            <h1 className="text-2xl font-bold w-full text-start text-white mb-4">USER : <span className="text-purple-600">LAST</span> 7 Days <span className="text-purple-600">USING</span> BSA - Risk Analysis (Dashboard Preview)</h1>
            <div className="flex md:flex-row flex-col  gap-4 w-full">
                {/* Bar Chart */}
                <ChartContainer  className="w-1/3 flex flex-col items-center justify-start">
                    <h2 className="text-md font-semibold w-[85%] text-start text-blue-400 mb-2">Inherent vs Mitigated vs Residual Risk Analysis</h2>
                    <BarChart width={400} height={300} data={chartData}>
                        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                        <XAxis dataKey="metric" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                        <Legend wrapperStyle={{ color: "#fff" }} />
                        <Bar dataKey="inherent" fill="#2563eb" />
                        <Bar dataKey="mitigated" fill="#60a5fa" />
                        <Bar dataKey="residual" fill="#34d399" />
                    </BarChart>
                </ChartContainer>

                {/* Line Chart */}
                <ChartContainer  className="w-1/3 flex flex-col items-center justify-center">
                    <h2 className="text-md font-semibold w-[85%] text-start text-pink-400 mb-2">Risk Trend Analysis (Inherent, Mitigated, and Residual)</h2>
                    <LineChart width={400} height={300} data={chartData}>
                        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                        <XAxis dataKey="metric" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                        <Legend wrapperStyle={{ color: "#fff" }} />
                        <Line type="monotone" dataKey="inherent" stroke="#2563eb" />
                        <Line type="monotone" dataKey="mitigated" stroke="#60a5fa" />
                        <Line type="monotone" dataKey="residual" stroke="#34d399" />
                    </LineChart>
                </ChartContainer>

                {/* Pie Chart */}
                <ChartContainer  className="w-1/3 flex flex-col items-center justify-center">
                    <h2 className="text-md font-semibold w-[85%] text-start text-green-400 mb-2">Risk Distribution (Inherent, Mitigated, and Residual)</h2>
                    <PieChart width={400} height={300}>
                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ color: "#fff" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                    </PieChart>
                </ChartContainer>

                {/* Add more charts here */}

            </div>
            <div className="flex md:flex-row flex-col gap-6 w-full">
                {/* Mixed Chart */}
                <ChartContainer
                    className="w-1/2 flex flex-col items-center justify-center"

                >
                    <h2 className="text-md font-semibold w-[85%] text-start text-pink-400 mb-2">Mitigated vs Residual Risk Analysis</h2>
                    <LineChart width={400} height={300} className="w-full h-full" data={chartData}>
                        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                        <XAxis dataKey="metric" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                        <Legend wrapperStyle={{ color: "#fff" }} />
                        <Line
                            type="monotone"
                            dataKey="mitigated"
                            stroke="#60a5fa"
                            name="Mitigated Risk"
                            strokeWidth={3}
                            dot={{ stroke: "#60a5fa", strokeWidth: 2, fill: "#fff" }}
                        />
                        <Bar dataKey="residual" fill="#34d399" name="Residual Risk" />
                    </LineChart>
                </ChartContainer>

                <ChartContainer
                   className="w-1/2 flex flex-col items-center justify-center"
                >
                    <h2 className="text-md font-semibold w-[85%] text-start text-blue-400 mb-2">Inherent Risk Frequency</h2>
                    <BarChart width={400} height={300} className="w-full" data={chartData}>
                        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                        <XAxis dataKey="metric" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
                        <Legend wrapperStyle={{ color: "#fff" }} />
                        <Bar
                            dataKey="inherent"
                            fill="#2563eb"
                            name="Frequency"
                            barSize={20}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>

            </div>
        </div>
    );
}

