"use client";
import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const DEFAULT_ITEM = {
    weight: 10,
    price: 60,
    volume: 20,
    fragility: 2,
    priority: 5,
};

function SliderInput({ label, icon, value, min, max, onChange }) {
    // For the slider, clamp value to [min, max], but for input, allow any number
    const sliderValue = Math.max(min, Math.min(max, value ?? min));

    return (
        <div className="mb-3">
            <label className="text-sm font-semibold mb-1 flex items-center gap-2 text-gray-200">
                <div>
                    <i
                        className={`pi pi-${icon} text-blue-400`}
                        style={{ fontSize: "1.2em", marginRight: "4px" }}
                    />
                    {label}
                </div>
                <div className="ml-6">
                    <InputNumber
                        value={value}
                        min={min}
                        // Don't set max here, so input can go higher
                        onValueChange={(e) => {
                            // Allow any number from the input box
                            if (
                                typeof e.value === "number" &&
                                !isNaN(e.value)
                            ) {
                                onChange(e.value);
                            }
                        }}
                        showButtons
                        buttonLayout="horizontal"
                        style={{ width: 80 }}
                        inputStyle={{
                            width: 60,
                            background: "#111827",
                            color: "#fff",
                        }}
                    />
                </div>
            </label>
            <input
                type="range"
                min={min}
                max={max}
                value={sliderValue}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-blue-500"
            />
        </div>
    );
}

function ItemInput({ item, onChange, onRemove }) {
    return (
        <div className="bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2 relative">
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-text p-button-danger absolute"
                style={{ top: 8, right: 8 }}
                onClick={onRemove}
                tooltip="Remove item"
            />
            <SliderInput
                label="Weight"
                icon="box"
                value={item.weight}
                min={1}
                max={100}
                onChange={(v) => onChange({ ...item, weight: v })}
            />
            <SliderInput
                label="Price"
                icon="dollar"
                value={item.price}
                min={1}
                max={500}
                onChange={(v) => onChange({ ...item, price: v })}
            />
            <SliderInput
                label="Volume"
                icon="database"
                value={item.volume}
                min={1}
                max={100}
                onChange={(v) => onChange({ ...item, volume: v })}
            />
            <SliderInput
                label="Fragility"
                icon="exclamation-triangle"
                value={item.fragility}
                min={0}
                max={10}
                onChange={(v) => onChange({ ...item, fragility: v })}
            />
            <SliderInput
                label="Priority"
                icon="star"
                value={item.priority}
                min={0}
                max={10}
                onChange={(v) => onChange({ ...item, priority: v })}
            />
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
    const [error, setError] = useState(null);

    const calculateProfit = async () => {
        setLoading(true);
        setResult(null);
        setError(null);
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
                setError(data.error || "Unknown error");
            }
        } catch (e) {
            setError("Network error, please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex flex-col gap-4 items-center py-16 px-2">
            {/* Header/Marketing */}
            <div className="max-w-2xl text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                    <span className="text-blue-400">Inventory Optimizer</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-3">
                    Instantly maximize your inventory profit using our knapsack
                    algorithm.
                    <br />
                    <span className="text-blue-400 font-semibold">
                        Try it below!
                    </span>
                </p>
            </div>

            {/* Constraints */}
            <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-lg px-4 py-8 md:p-8 mb-6 mx-auto">
                <h2 className="text-2xl font-bold text-blue-400 mb-5 flex items-center gap-2 justify-center">
                    <i className="pi pi-box" /> Container Constraints
                </h2>
                <SliderInput
                    label="Max Weight"
                    icon="box"
                    value={maxWeight}
                    min={10}
                    max={200}
                    onChange={setMaxWeight}
                />
                <SliderInput
                    label="Max Volume"
                    icon="database"
                    value={maxVolume}
                    min={50}
                    max={500}
                    onChange={setMaxVolume}
                />
            </div>

            {/* Items */}
            <div className="w-full max-w-6xl bg-gray-900 rounded-2xl shadow-lg py-8 px-4 md:p-8 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                        <i className="pi pi-list" /> Items
                    </h2>
                    <Button
                        icon="pi pi-plus"
                        label="Add Item"
                        className="p-button-rounded p-button-success"
                        onClick={() =>
                            setItems([...items, { ...DEFAULT_ITEM }])
                        }
                    />
                </div>
                <div
                    className="overflow-y-auto"
                    style={{
                        maxHeight: "600px",
                        minHeight: "120px",
                        paddingRight: 8,
                        marginBottom: 8,
                    }}
                >
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {items.length === 0 && (
                            <div className="text-gray-400 italic mb-3">
                                No items. Add some to optimize!
                            </div>
                        )}
                        {items.map((item, idx) => (
                            <ItemInput
                                key={idx}
                                item={item}
                                onChange={(updated) => {
                                    const newItems = [...items];
                                    newItems[idx] = updated;
                                    setItems(newItems);
                                }}
                                onRemove={() =>
                                    setItems(items.filter((_, i) => i !== idx))
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Calculate Button */}
            <Button
                label={loading ? "Calculating..." : "Calculate Maximum Profit"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-calculator"}
                className="p-button-lg p-button-rounded p-button-info font-bold text-lg my-6 w-full max-w-2xl"
                onClick={calculateProfit}
                disabled={loading}
            />

            {/* Result/Error */}
            <div className="w-full max-w-2xl">
                {error && (
                    <div className="bg-red-900 text-red-200 rounded-xl p-4 text-center font-semibold shadow">
                        {error}
                    </div>
                )}
                {result !== null && !error && (
                    <div className="bg-gray-800 text-green-400 rounded-xl p-6 text-center text-2xl font-bold shadow mt-4">
                        Maximum Profit:{" "}
                        <span className="text-green-300">{result}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
