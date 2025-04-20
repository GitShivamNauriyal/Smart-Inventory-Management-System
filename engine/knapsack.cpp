#include <bits/stdc++.h>

struct Item
{
    int weight, price, volume, fragility, priority;

    // The profit is based on the price, priority, and fragility
    int profit() const
    {
        return price + priority - fragility;
    }
};

int knapsack(int maxWeight, int maxVolume, const std::vector<Item> &items)
{
    std::vector<std::vector<int>> dp(maxWeight + 1, std::vector<int>(maxVolume + 1, 0));

    for (const auto &item : items)
    {
        for (int w = maxWeight; w >= item.weight; --w)
        {
            for (int v = maxVolume; v >= item.volume; --v)
            {
                dp[w][v] = std::max(dp[w][v], dp[w - item.weight][v - item.volume] + item.profit());
            }
        }
    }

    return dp[maxWeight][maxVolume];
}

int main(int argc, char *argv[])
{
    if (argc < 4)
    {
        std::cerr << "Usage: ./inventory <maxWeight> <maxVolume> <item1_weight,item1_price,item1_volume,item1_fragility,item1_priority> ...\n";
        return 1;
    }

    int maxWeight, maxVolume;
    try
    {
        maxWeight = std::stoi(argv[1]);
        maxVolume = std::stoi(argv[2]);
    }
    catch (...)
    {
        std::cerr << "Error: maxWeight and maxVolume must be integers.\n";
        return 1;
    }

    std::vector<Item> items;
    for (int i = 3; i < argc; ++i)
    {
        std::stringstream ss(argv[i]);
        std::string token;
        std::vector<int> values;

        while (std::getline(ss, token, ','))
        {
            try
            {
                values.push_back(std::stoi(token));
            }
            catch (...)
            {
                std::cerr << "Error: Invalid item format in argument " << i << "\n";
                return 1;
            }
        }

        if (values.size() != 5)
        {
            std::cerr << "Error: Each item must have 5 attributes (weight,price,volume,fragility,priority).\n";
            return 1;
        }

        items.push_back({values[0], values[1], values[2], values[3], values[4]});
    }

    int maxProfit = knapsack(maxWeight, maxVolume, items);
    std::cout << "Maximum profit achievable: " << maxProfit << std::endl;
    return 0;
}
