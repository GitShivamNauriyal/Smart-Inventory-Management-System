"use client";
import React, { useState } from "react";

const DEFAULT_ITEM = {
    weight: 10,
    price: 60,
    volume: 20,
    fragility: 2,
    priority: 5,
};

function SliderInput({ label, value, min, max, onChange }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <label>
                {label}:&nbsp;
                <input
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{ width: 60, marginRight: 8 }}
                />
            </label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: 200 }}
            />
        </div>
    );
}

function ItemInput({ item, onChange, onRemove }) {
    return (
        <div
            style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
            }}
        >
            <SliderInput
                label="Weight"
                value={item.weight}
                min={1}
                max={100}
                onChange={(v) => onChange({ ...item, weight: v })}
            />
            <SliderInput
                label="Price"
                value={item.price}
                min={1}
                max={500}
                onChange={(v) => onChange({ ...item, price: v })}
            />
            <SliderInput
                label="Volume"
                value={item.volume}
                min={1}
                max={100}
                onChange={(v) => onChange({ ...item, volume: v })}
            />
            <SliderInput
                label="Fragility"
                value={item.fragility}
                min={0}
                max={10}
                onChange={(v) => onChange({ ...item, fragility: v })}
            />
            <SliderInput
                label="Priority"
                value={item.priority}
                min={0}
                max={10}
                onChange={(v) => onChange({ ...item, priority: v })}
            />
            <button onClick={onRemove} style={{ color: "red", marginTop: 8 }}>
                Remove Item
            </button>
        </div>
    );
}

export default function Dashboard() {
    const [maxWeight, setMaxWeight] = useState(50);
    const [maxVolume, setMaxVolume] = useState(100);
    const [items, setItems] = useState([
        { weight: 10, price: 60, volume: 20, fragility: 2, priority: 5 },
        { weight: 20, price: 100, volume: 40, fragility: 3, priority: 7 },
        { weight: 30, price: 120, volume: 50, fragility: 1, priority: 8 },
    ]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateProfit = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch(
                "http://localhost:5000/api/optimization/calculate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ maxWeight, maxVolume, items }),
                }
            );
            const data = await response.json();
            if (data.maxProfit !== undefined) {
                setResult(data.maxProfit);
            } else {
                setResult("Error");
            }
        } catch (e) {
            setResult("Error");
        }
        setLoading(false);
    };

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "40px auto",
                padding: 24,
                background: "#f9f9f9",
                borderRadius: 12,
            }}
        >
            <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>
                Inventory Optimizer
            </h1>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>
                Container Constraints
            </h2>
            <SliderInput
                label="Max Weight"
                value={maxWeight}
                min={10}
                max={200}
                onChange={setMaxWeight}
            />
            <SliderInput
                label="Max Volume"
                value={maxVolume}
                min={50}
                max={500}
                onChange={setMaxVolume}
            />

            <h2 style={{ fontSize: 20, margin: "24px 0 8px" }}>Items</h2>
            {items.map((item, idx) => (
                <ItemInput
                    key={idx}
                    item={item}
                    onChange={(updated) => {
                        const newItems = [...items];
                        newItems[idx] = updated;
                        setItems(newItems);
                    }}
                    onRemove={() => setItems(items.filter((_, i) => i !== idx))}
                />
            ))}
            <button
                onClick={() => setItems([...items, { ...DEFAULT_ITEM }])}
                style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: 6,
                    marginBottom: 24,
                }}
            >
                Add Item
            </button>
            <br />
            <button
                onClick={calculateProfit}
                style={{
                    background: "#059669",
                    color: "white",
                    padding: "12px 32px",
                    borderRadius: 8,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 16,
                    marginBottom: 24,
                }}
                disabled={loading}
            >
                {loading ? "Calculating..." : "Calculate Maximum Profit"}
            </button>
            {result !== null && (
                <div
                    style={{ marginTop: 24, fontSize: 22, fontWeight: "bold" }}
                >
                    {result === "Error" ? (
                        <span style={{ color: "red" }}>
                            Error calculating profit
                        </span>
                    ) : (
                        <>
                            Maximum Profit:{" "}
                            <span style={{ color: "#059669" }}>{result}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
