const { execFile } = require("child_process");
const path = require("path");

// Sample test data
const maxWeight = 50;
const maxVolume = 100;
const items = [
    [10, 60, 20, 2, 5],
    [20, 100, 40, 3, 7],
    [30, 120, 50, 1, 8],
];

// Prepare CLI arguments
const args = [
    maxWeight.toString(),
    maxVolume.toString(),
    ...items.map((item) => item.join(",")),
];

// Path to executable (adjust accordingly)
const executablePath = path.resolve(__dirname, "../engine/knapsack.exe"); // or './inventory' for Linux/Mac

execFile(executablePath, args, (err, stdout, stderr) => {
    if (err) {
        console.error("❌ Exec Error:", err.message);
        return;
    }
    if (stderr) {
        console.error("⚠️ Stderr:", stderr);
    }
    console.log("✅ Output:", stdout.trim());
});
