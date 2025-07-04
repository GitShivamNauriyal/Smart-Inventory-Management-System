const express = require("express");
const router = express.Router();
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

router.post("/calculate", (req, res) => {
    const startTime = process.hrtime();
    const requestId = Date.now();
    const timestamp = new Date().toISOString();
    const { maxWeight, maxVolume, items } = req.body;

    console.log("\n\n==============NEW REQUEST================");
    console.log(`[${timestamp}] [${requestId}]\nCalculation started`);
    console.log(`  Constraints: weight=${maxWeight}, volume=${maxVolume}`);
    console.log(`  Received items (${items?.length || 0}):`, items || "none");

    function getExecTimeMs() {
        const [seconds, nanoseconds] = process.hrtime(startTime);
        return (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    }

    try {
        // Validation
        if (
            !maxWeight ||
            !maxVolume ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            throw new Error("Missing required parameters");
        }
        const sanitizedItems = items.map((item) => ({
            ...item,
            fractionable: !!item.fractionable,
            parts: item.fractionable ? item.parts || 2 : 1,
        }));

        if (isNaN(maxWeight) || isNaN(maxVolume)) {
            throw new Error("Invalid numeric constraints");
        }

        let validatedItems;
        try {
            validatedItems = sanitizedItems.map((item, index) => {
                if (
                    !item ||
                    typeof item.weight === "undefined" ||
                    typeof item.price === "undefined" ||
                    typeof item.volume === "undefined" ||
                    typeof item.fragility === "undefined" ||
                    typeof item.priority === "undefined"
                ) {
                    throw new Error(`Invalid item structure at index ${index}`);
                }

                return {
                    weight: Number(item.weight),
                    price: Number(item.price),
                    volume: Number(item.volume),
                    fragility: Number(item.fragility),
                    priority: Number(item.priority),
                };
            });
        } catch (itemError) {
            throw new Error(`Item validation failed: ${itemError.message}`);
        }
        const isFractional = items.some((item) => item?.fractionable === true);
        const engine = isFractional
            ? path.resolve(__dirname, "../engine/fractional.exe")
            : path.resolve(__dirname, "../engine/new.exe");

        const args = [
            maxWeight.toString(),
            maxVolume.toString(),
            ...validatedItems.map((item) => {
                if (isFractional) {
                    return `${item.weight},${item.price},${item.volume},${
                        item.fragility
                    },${item.priority},${item.fractionable ? 1 : 0},${
                        item.fractionable ? item.parts || 2 : 1
                    }`;
                } else {
                    return `${item.weight},${item.price},${item.volume},${item.fragility},${item.priority}`;
                }
            }),
        ];

        const executablePath = engine;
        console.log(
            `[${timestamp}] [${requestId}] Using engine: ${executablePath}`
        );

        if (!fs.existsSync(executablePath)) {
            throw new Error("Optimization engine not found at specified path");
        }

        execFile(executablePath, args, (err, stdout, stderr) => {
            const execTime = getExecTimeMs();

            if (err) {
                console.error(
                    `[${timestamp}] [${requestId}] Engine error (${execTime}ms):`,
                    err.message
                );
                return res.status(500).json({
                    error: "Calculation failed",
                    requestId,
                    details: "Engine execution error",
                });
            }

            try {
                const output = stdout.toString().trim();
                console.log(
                    `[${timestamp}] [${requestId}] Engine output (${execTime}ms):`,
                    output
                );

                // Output is just a number (maxProfit)
                if (!/^\d+$/.test(output)) {
                    throw new Error("Invalid engine output format");
                }

                const maxProfit = parseInt(output, 10);

                res.json({
                    maxProfit,
                    metadata: {
                        requestId,
                        execTimeMs: execTime,
                        itemCount: validatedItems.length,
                    },
                });
            } catch (parseError) {
                const execTimeErr = getExecTimeMs();
                console.error(
                    `[${timestamp}] [${requestId}] Result parsing failed (${execTimeErr}ms):`,
                    parseError.message
                );
                console.error("Raw output:", stdout.toString());
                res.status(500).json({
                    error: "Result parsing failed",
                    requestId,
                    details: `Received output: '${stdout.toString().trim()}'`,
                });
            }
        });
    } catch (validationError) {
        const execTime = getExecTimeMs();
        console.error(
            `[${timestamp}] [${requestId}] Validation failed (${execTime}ms):`,
            validationError.message
        );
        res.status(400).json({
            error: "Invalid request",
            requestId,
            details: validationError.message,
        });
    }
});

module.exports = router;
