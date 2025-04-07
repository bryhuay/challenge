
export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name:string, sellIn:number, quality:number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

interface ItemType {
    updateQuality(): void;
    updateSellIn(): void;
}

// Implement specific item classes
class AgedBrie implements ItemType {
    private item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateQuality() {
        if (this.item.quality < 50) {
            this.item.quality++;
        }
    }

    updateSellIn() {
        this.item.sellIn--;
    }
}

class BackstagePass implements ItemType {
    private item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateQuality() {
        if (this.item.quality < 50) {
            this.item.quality++;
            if (this.item.sellIn < 11) {
                if (this.item.quality < 50) {
                    this.item.quality++;
                }
            }
            if (this.item.sellIn < 6) {
                if (this.item.quality < 50) {
                    this.item.quality++;
                }
            }
        }
        if (this.item.sellIn < 0) {
            this.item.quality = 0;
        }
    }

    updateSellIn() {
        this.item.sellIn--;
    }
}

class NormalItem implements ItemType {
    private item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateQuality() {
        if (this.item.quality > 0) {
            this.item.quality--;
        }
        if (this.item.sellIn < 0 && this.item.quality > 0) {
            this.item.quality--;
        }
    }

    updateSellIn() {
        this.item.sellIn--;
    }
}

class ConjuredItem implements ItemType {
    private item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateQuality() {
        if (this.item.quality > 0) {
            this.item.quality -= 2;
        }
        if (this.item.sellIn < 0 && this.item.quality > 0) {
            this.item.quality -= 2;
        }
    }

    updateSellIn() {
        this.item.sellIn--;
    }
}

// GildedRose class
export class GildedRose {
    items: Array<ItemType>;

    constructor(items: Array<Item> = []) {
        this.items = items.map(item => this.createItemType(item));
    }

    private createItemType(item: Item): ItemType {
        switch (item.name) {
            case 'Aged Brie':
                return new AgedBrie(item);
            case 'Backstage passes to a TAFKAL80ETC concert':
                return new BackstagePass(item);
            case 'Sulfuras, Hand of Ragnaros':
                return new Sulfuras(item); 
            default:
                if (item.name.startsWith('Conjured')) {
                    return new ConjuredItem(item);
                }
                return new NormalItem(item);
        }
    }

    updateQuality() {
        for (let item of this.items) {
            item.updateQuality();
            item.updateSellIn();
        }
        return this.items;
    }
}

// Sulfuras class (opcional)
class Sulfuras implements ItemType {
    private item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    updateQuality() {
        // Sulfuras no cambia en quality
    }

    updateSellIn() {
        // Sulfuras no cambia en sellin
    }
}

//Pruebas

const items = [
    new Item('Aged Brie', 10, 20),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    new Item('Normal Item', 5, 10),
    new Item('Conjured Item', 3, 6),
];

const gildedRose = new GildedRose(items);

// Actualizar la calidad de los items
gildedRose.updateQuality();

console.log(gildedRose.items);
   