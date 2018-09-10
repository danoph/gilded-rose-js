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

  constructor(items = []) {
    this.items = items;
  }

  increaseQualityByOne(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  decreaseSellInByOne(item) {
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn -= 1;
    }
  }

  updateAgedBrie(item) {
    this.increaseQualityByOne(item);
    this.decreaseSellInByOne(item);
    if(item.sellIn < 0) {
      this.increaseQualityByOne(item);
    }
  }

  updateBackStagePasses(item) {
    this.increaseQualityByOne(item);
    if (item.sellIn < 11) {
      this.increaseQualityByOne(item);
    }
    if (item.sellIn < 6) {
      this.increaseQualityByOne(item);
    }
    if (item.sellIn <= 0) {
      item.quality -= item.quality;
    }
  }

  updateConjuredManaCake(item) {
    if (item.quality > 0) {
      if(item.sellIn < 0) {
        item.quality -= 4;
      } else {
        if(item.quality >= 2) {
          item.quality -= 2
        } else {
          item.quality = 0;
        }
      }
    }
  }

  updateNormalItem(item) {
    if (item.quality > 0) {
      item.quality -= 1;

      if(item.sellIn <= 0) {
        item.quality -= 1;
      }
    }
  }

  updateQuality() {

    for (let item of this.items) {
      if (item.name == 'Aged Brie') {
        this.updateAgedBrie(item);
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackStagePasses(item);
        this.decreaseSellInByOne(item);
      } else if(item.name == 'Conjured Mana Cake') {
        this.updateConjuredManaCake(item);
        this.decreaseSellInByOne(item);
      } else if (item.name == 'Sulfuras, Hand of Ragnaros')  {
        // do nothing
      } else {
        this.updateNormalItem(item);
        this.decreaseSellInByOne(item);
      }
    }

    return this.items;
  }

  printItems() {
    console.log(JSON.stringify(this.items, null, 2));
  }
}
