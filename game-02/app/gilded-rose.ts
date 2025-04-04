export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    updateQuality() {
        for (let item of this.items) {
            this.updateItemQuality(item);
            this.updateItemSellIn(item);
        }
        return this.items;
    }

    private updateItemQuality(item: Item) {
        if (item.name === 'Sulfuras, Hand of Ragnaros') {
            return; // Legendary item, do nothing
        }

        if (item.name === 'Aged Brie') {
            this.updateAgedBrieQuality(item);
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            this.updateBackstagePassQuality(item);
        } else if (item.name.startsWith('Conjured')) {
            this.updateConjuredItemQuality(item);
        } else {
            this.updateNormalItemQuality(item);
        }
    }

    private updateAgedBrieQuality(item: Item) {
        if (item.quality < 50) {
            item.quality++;
        }
    }

    private updateBackstagePassQuality(item: Item) {
        if (item.quality < 50) {
            item.quality++;
            if (item.sellIn < 11) {
                if (item.quality < 50) {
                    item.quality++;
                }
            }
            if (item.sellIn < 6) {
                if (item.quality < 50) {
                    item.quality++;
                }
            }
        }
        // Quality drops to 0 after the concert
        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    private updateConjuredItemQuality(item: Item) {
        this.decreaseQuality(item, 2);
    }

    private updateNormalItemQuality(item: Item) {
        this.decreaseQuality(item, 1);
    }

    private decreaseQuality(item: Item, amount: number) {
        if (item.quality > 0) {
            item.quality -= amount;
        }
        if (item.sellIn < 0) {
            item.quality -= amount; // Degrade twice as fast after sell by date
        }
        // Ensure quality does not go below 0
        if (item.quality < 0) {
            item.quality = 0;
        }
    }

    private updateItemSellIn(item: Item) {
        if (item.name !== 'Sulfuras, Hand of Ragnaros') {
            item.sellIn--;
        }
    }

}
