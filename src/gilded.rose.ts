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

class AgedBrie {

  updateAgedBrie(item) {
    this.increaseQualityByOne(item);
    this.decreaseSellInByOne(item);
    if(item.sellIn < 0) {
      this.increaseQualityByOne(item);
    }
  }

  increaseQualityByOne(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  decreaseSellInByOne(item) {
    item.sellIn -= 1;
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
    this.decreaseSellInByOne(item);
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
    this.decreaseSellInByOne(item);
  }

  updateNormalItem(item) {
    if (item.quality > 0) {
      item.quality -= 1;

      if(item.sellIn <= 0) {
        item.quality -= 1;
      }
    }
    this.decreaseSellInByOne(item);
  }

  updateQuality() {

    for (let item of this.items) {
      if (item.name == 'Aged Brie') {
        const agedBrie = new AgedBrie();
        agedBrie.updateAgedBrie(item);
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackStagePasses(item);
      } else if(item.name == 'Conjured Mana Cake') {
        this.updateConjuredManaCake(item);
      } else if (item.name == 'Sulfuras, Hand of Ragnaros')  {
        // do nothing
      } else {
        this.updateNormalItem(item);
      }
    }

    return this.items;
  }

  printItems() {
    console.log(JSON.stringify(this.items, null, 2));
  }
}
