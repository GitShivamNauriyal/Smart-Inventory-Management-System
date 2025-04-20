#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>

struct Item
{
    int weight, value, volume, fragility, priority;
};

int knapsack(int maxWeight, int maxVolume, std::vector<Item> &items)
{
    int n = items.size();
    // 3D DP: dp[i][w][v] = max score using first i items with weight w and volume v
    std::vector<std::vector<std::vector<int>>> dp(n + 1, std::vector<std::vector<int>>(maxWeight + 1, std::vector<int>(maxVolume + 1, 0)));

    for (int i = 1; i <= n; i++)
    {
        Item &item = items[i - 1];
        int score = item.value + item.priority - item.fragility;

        for (int w = 0; w <= maxWeight; w++)
        {
            for (int v = 0; v <= maxVolume; v++)
            {
                if (item.weight <= w && item.volume <= v)
                {
                    dp[i][w][v] = std::max(dp[i - 1][w][v],
                                           dp[i - 1][w - item.weight][v - item.volume] + score);
                }
                else
                {
                    dp[i][w][v] = dp[i - 1][w][v];
                }
            }
        }
    }

    return dp[n][maxWeight][maxVolume];
}

int main(int argc, char *argv[])
{
    if (argc < 3)
    {
        std::cerr << "Usage: ./knapsack <maxWeight> <maxVolume> <item1_weight,item1_value,item1_volume,item1_fragility,item1_priority> ...\n";
        return 1;
    }

    int maxWeight = std::stoi(argv[1]);
    int maxVolume = std::stoi(argv[2]);

    std::vector<Item> items;
    for (int i = 3; i < argc; ++i)
    {
        std::string arg = argv[i];
        std::stringstream ss(arg);
        std::string token;
        std::vector<int> values;

        while (std::getline(ss, token, ','))
        {
            values.push_back(std::stoi(token));
        }

        if (values.size() == 5)
        {
            items.push_back({values[0], values[1], values[2], values[3], values[4]});
        }
        else
        {
            std::cerr << "Invalid item format: " << arg << "\n";
        }
    }

    int result = knapsack(maxWeight, maxVolume, items);
    std::cout << result << "\n";
    return 0;
}
