#include <bits/stdc++.h>
using namespace std;

struct Item
{
    int weight, price, volume, fragility, priority;

    int profit() const
    {
        return price + priority - fragility;
    }
};

int knapsack(int maxWeight, int maxVolume, const vector<Item> &items)
{
    int n = items.size();
    vector<vector<int>> dp(maxWeight + 1, vector<int>(maxVolume + 1, 0));

    for (const auto &item : items)
    {
        for (int w = maxWeight; w >= item.weight; --w)
        {
            for (int v = maxVolume; v >= item.volume; --v)
            {
                dp[w][v] = max(dp[w][v], dp[w - item.weight][v - item.volume] + item.profit());
            }
        }
    }
    return dp[maxWeight][maxVolume];
}

int main(int argc, char *argv[])
{
    if (argc < 4)
    {
        return 1;
    }

    int maxWeight = stoi(argv[1]);
    int maxVolume = stoi(argv[2]);
    vector<Item> items;

    for (int i = 3; i < argc; ++i)
    {
        stringstream ss(argv[i]);
        string token;
        vector<int> values;
        while (getline(ss, token, ','))
            values.push_back(stoi(token));
        if (values.size() != 5)
        {
            return 1;
        }
        items.push_back({values[0], values[1], values[2], values[3], values[4]});
    }

    int maxProfit = knapsack(maxWeight, maxVolume, items);
    cout << maxProfit << endl; // Only output the profit
    return 0;
}
