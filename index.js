const { execFile } = require("child_process");

const maxWeight = 50;
const maxVolume = 100;
const items = [
    [10, 60, 20, 2, 5],
    [20, 100, 40, 3, 7],
    [30, 120, 50, 1, 8],
];

// args array: [50, 100, "10,60,20,2,5", "20,100,40,3,7", ...]
const args = [
    maxWeight.toString(),
    maxVolume.toString(),
    ...items.map((item) => item.join(",")),
];

execFile("knapsack.exe", args, (err, stdout, stderr) => {
    if (err) {
        console.error("Error:", err.message);
        return;
    }
    if (stderr) {
        console.error("Stderr:", stderr);
        return;
    }
    console.log("Max value:", stdout.trim());
});
