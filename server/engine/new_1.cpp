#include <bits/stdc++.h>
using namespace std;

struct Item
{
    string name;
    int weight, price, volume, fragility, priority;

    int profit() const
    {
        return price + priority - fragility; // Profit formula
    }
};

struct Result
{
    int totalProfit;
    int totalWeight;
    int totalVolume;
    vector<Item> selectedItems;
};

Result knapsack(int maxWeight, int maxVolume, const vector<Item> &items)
{
    int n = items.size();
    vector<vector<int>> dp(maxWeight + 1, vector<int>(maxVolume + 1, 0));
    vector<vector<int>> selected(maxWeight + 1, vector<int>(maxVolume + 1, -1));

    for (int idx = 0; idx < n; ++idx)
    {
        const auto &item = items[idx];
        for (int w = maxWeight; w >= item.weight; --w)
        {
            for (int v = maxVolume; v >= item.volume; --v)
            {
                int newProfit = dp[w - item.weight][v - item.volume] + item.profit();
                if (newProfit > dp[w][v])
                {
                    dp[w][v] = newProfit;
                    selected[w][v] = idx;
                }
            }
        }
    }

    // Trace back to find selected items
    int w = maxWeight, v = maxVolume;
    vector<bool> used(n, false);
    Result result{dp[w][v], 0, 0, {}};

    while (selected[w][v] != -1)
    {
        int idx = selected[w][v];
        if (used[idx])
            break;
        used[idx] = true;
        const auto &item = items[idx];
        result.selectedItems.push_back(item);
        result.totalWeight += item.weight;
        result.totalVolume += item.volume;
        w -= item.weight;
        v -= item.volume;
    }

    return result;
}

int main(int argc, char *argv[])
{
    if (argc < 4)
    {
        cerr << "Usage: ./inventory <maxWeight> <maxVolume> <item1_name,item1_weight,price,volume,fragility,priority> ...\n";
        return 1;
    }

    int maxWeight = stoi(argv[1]);
    int maxVolume = stoi(argv[2]);
    vector<Item> items;

    for (int i = 3; i < argc; ++i)
    {
        stringstream ss(argv[i]);
        string token;
        vector<string> values;

        while (getline(ss, token, ','))
            values.push_back(token);
        if (values.size() != 6)
        {
            cerr << "Each item must have 6 fields: name,weight,price,volume,fragility,priority\n";
            return 1;
        }

        items.push_back({values[0], stoi(values[1]), stoi(values[2]), stoi(values[3]), stoi(values[4]), stoi(values[5])});
    }

    Result res = knapsack(maxWeight, maxVolume, items);

    cout << "\nMaximum profit achievable: " << res.totalProfit << "\n";
    cout << "\nItems selected:\n";
    cout << left << setw(10) << "Name" << setw(8) << "Weight" << setw(8) << "Volume"
         << setw(8) << "Price" << setw(10) << "Fragility" << setw(10) << "Priority"
         << setw(8) << "Profit" << endl;

    for (const auto &item : res.selectedItems)
    {
        cout << left << setw(10) << item.name << setw(8) << item.weight << setw(8) << item.volume
             << setw(8) << item.price << setw(10) << item.fragility << setw(10) << item.priority
             << setw(8) << item.profit() << endl;
    }

    cout << "\nTotal weight used: " << res.totalWeight << " / " << maxWeight
         << " (" << (100 * res.totalWeight / maxWeight) << "%)\n";
    cout << "Total volume used: " << res.totalVolume << " / " << maxVolume
         << " (" << (100 * res.totalVolume / maxVolume) << "%)\n";

    return 0;
}
