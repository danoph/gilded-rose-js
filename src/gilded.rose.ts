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
  constructor(private _item) {}

  update() {
    this.increaseQualityByOne();
    this.decreaseSellInByOne();
    if(this._item.sellIn < 0) {
      this.increaseQualityByOne();
    }
  }

  increaseQualityByOne() {
    if (this._item.quality < 50) {
      this._item.quality += 1;
    }
  }

  decreaseSellInByOne() {
    this._item.sellIn -= 1;
  }
}

class BackStagePass {
  constructor(private _item) {}

  update() {

    this.increaseQualityByOne();
    if (this._item.sellIn < 11) {
      this.increaseQualityByOne();
    }
    if (this._item.sellIn < 6) {
      this.increaseQualityByOne();
    }
    if (this._item.sellIn <= 0) {
      this._item.quality -= this._item.quality;
    }
    this.decreaseSellInByOne();
  }

  increaseQualityByOne() {
    if (this._item.quality < 50) {
      this._item.quality += 1;
    }
  }

  decreaseSellInByOne() {
    this._item.sellIn -= 1;
  }
}

class ConjuredItem {

  constructor(private _item) {}

  update() {
    if (this._item.quality > 0) {
      if(this._item.sellIn < 0) {
        this._item.quality -= 4;
      } else {
        if(this._item.quality >= 2) {
          this._item.quality -= 2
        } else {
          this._item.quality = 0;
        }
      }
    }
    this.decreaseSellInByOne();
  }

  decreaseSellInByOne() {
    this._item.sellIn -= 1;
  }
}

class NormalItem {
  constructor(private _item) {}

  update() {

    if (this._item.quality > 0) {
      this._item.quality -= 1;

      if(this._item.sellIn <= 0) {
        this._item.quality -= 1;
      }
    }
    this.decreaseSellInByOne();
  }

  decreaseSellInByOne() {
    this._item.sellIn -= 1;
  }
}

class Sulfuras {
  constructor(private _item) {}

  update() {
    // Do nothing ok hey.
  }
}

class ItemFactory {
  constructor(private _item) { }

  generateNewItem() {
    if (this._item.name == 'Aged Brie') {
      return new AgedBrie(this._item);
    } else if (this._item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      return new BackStagePass(this._item);
    } else if(this._item.name.toLowerCase().indexOf('conjured') > -1) {
      return new ConjuredItem(this._item);
    } else if (this._item.name == 'Sulfuras, Hand of Ragnaros')  {
      return new Sulfuras(this._item);
    } else {
      return new NormalItem(this._item);
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const factory = new ItemFactory(item);
      const newItem = factory.generateNewItem();
      newItem.update();
    }

    return this.items;
  }

  printItems() {
    console.log(JSON.stringify(this.items, null, 2));
  }
}
