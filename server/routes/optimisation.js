const express = require("express");
const router = express.Router();
const { execFile } = require("child_process");
const path = require("path");

router.post("/calculate", (req, res) => {
    const { maxWeight, maxVolume, items } = req.body;

    if (
        !maxWeight ||
        !maxVolume ||
        !Array.isArray(items) ||
        items.length === 0
    ) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const args = [
        maxWeight.toString(),
        maxVolume.toString(),
        ...items.map((item) =>
            [
                item.weight,
                item.price,
                item.volume,
                item.fragility,
                item.priority,
            ].join(",")
        ),
    ];

    const executablePath = path.resolve(__dirname, "../engine/knapsack.exe");

    execFile(executablePath, args, (err, stdout, stderr) => {
        if (err) {
            console.error("Engine error:", err);
            return res.status(500).json({ error: "Optimization failed" });
        }

        // Try to extract the number from stdout
        const match = stdout.match(/\d+/);
        if (!match) {
            return res.status(500).json({ error: "Could not parse result" });
        }
        const maxProfit = parseInt(match[0], 10);

        res.json({ maxProfit });
    });
});

module.exports = router;
