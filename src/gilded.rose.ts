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

  updateAgedBrie() {
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

  updateBackStagePass() {

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

class ConjuredManaCake {

  constructor(private _item) {}

  updateConjuredManaCake() {
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

class NormalItem{
  constructor(private _item) {}

  updateNormalItem() {

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

  updateSulfuras() {
    // Do nothing ok hey.
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

  updateQuality() {

    for (let item of this.items) {
      if (item.name == 'Aged Brie') {
        const agedBrie = new AgedBrie(item);
        agedBrie.updateAgedBrie();
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        const backStagePass = new BackStagePass(item);
        backStagePass.updateBackStagePass();

      } else if(item.name == 'Conjured Mana Cake') {
        const conjuredManaCake = new ConjuredManaCake(item);
        conjuredManaCake.updateConjuredManaCake();
      } else if (item.name == 'Sulfuras, Hand of Ragnaros')  {
        const sulfuras = new Sulfuras(item);
        sulfuras.updateSulfuras();
      } else {
        const normalItem = new NormalItem(item);
        normalItem.updateNormalItem();
      }
    }

    return this.items;
  }

  printItems() {
    console.log(JSON.stringify(this.items, null, 2));
  }
}
