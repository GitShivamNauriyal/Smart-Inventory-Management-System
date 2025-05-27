#include <bits/stdc++.h>
using namespace std;

struct Item
{
    int weight, price, volume, fragility, priority, parts;

    double profitPerWeight() const
    {
        return static_cast<double>(price + priority - fragility) / weight;
    }
};

bool compare(const Item &a, const Item &b)
{
    return a.profitPerWeight() > b.profitPerWeight();
}

double fractionalKnapsack(int maxWeight, int maxVolume, vector<Item> &items)
{
    sort(items.begin(), items.end(), compare);

    double totalProfit = 0.0;

    for (const auto &item : items)
    {
        if (maxWeight <= 0 || maxVolume <= 0)
            break;

        double unitWeight = static_cast<double>(item.weight) / item.parts;
        double unitVolume = static_cast<double>(item.volume) / item.parts;
        double unitProfit = (item.price + item.priority - item.fragility) / static_cast<double>(item.parts);

        int maxTake = min(item.parts, min(static_cast<int>(maxWeight / unitWeight), static_cast<int>(maxVolume / unitVolume)));

        totalProfit += unitProfit * maxTake;
        maxWeight -= unitWeight * maxTake;
        maxVolume -= unitVolume * maxTake;
    }

    return totalProfit;
}

int main(int argc, char *argv[])
{
    if (argc < 4)
        return 1;

    int maxWeight = stoi(argv[1]);
    int maxVolume = stoi(argv[2]);
    vector<Item> items;

    for (int i = 3; i < argc; ++i)
    {
        stringstream ss(argv[i]);
        string token;
        vector<int> values;

        while (getline(ss, token, ','))
        {
            values.push_back(stoi(token));
        }

        if (values.size() != 7)
            return 1; // must include 7: w, p, v, f, pr, fractionable, parts

        items.push_back({values[0], values[1], values[2], values[3], values[4], values[6]});
    }

    double result = fractionalKnapsack(maxWeight, maxVolume, items);
    cout << static_cast<int>(result) << endl;
    return 0;
}
