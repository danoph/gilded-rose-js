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

//class FancyItem extends Item{
//constructor(name, sellIn, quality) {
//super(name, sellIn, quality);
//}

//updateQuality() {
//this.quality = qualityToUpdateTo;
//}
//}

export class GildedRose {
  items: Array<Item>;

  constructor(items = []) {
    this.items = items;
  }

  //class TheRules {
  //increaseQuality: function(){[>logic here<]},
  //decreaseQuality: function(){[>logic here<]},
  //}


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
      //const item = new FancyItem(item.name, item.sellIn, item.quality);
      //item.updateQuality();

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if ((item.name != 'Sulfuras, Hand of Ragnaros') && (item.name != 'Conjured Mana Cake')) {
            item.quality -= 1;
          } else {
            if(item.name == 'Conjured Mana Cake') {
              if(item.sellIn < 0) {
                item.quality -=4
              } else {
                if(item.quality >= 2) {
                  item.quality -= 2
                } else {
                  item.quality = 0;
                }
              }
            }
          }
        }
      } else {
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          this.increaseQualityByOne(item);
          if (item.sellIn < 11) {
            this.increaseQualityByOne(item);
          }
          if (item.sellIn < 6) {
            this.increaseQualityByOne(item);
          }
        }
      }

      this.decreaseSellInByOne(item);

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if ((item.name != 'Sulfuras, Hand of Ragnaros') && (item.name != 'Conjured Mana Cake')) {
                item.quality -= 1;
              }
            }
          } else {
            item.quality -= item.quality;
          }
        }       }

      if(item.name == 'Aged Brie') {
        this.increaseQualityByOne(item);
        if(item.sellIn < 0) {
          this.increaseQualityByOne(item);
        }
      }
    }

    return this.items;
  }

  printItems() {
    console.log(JSON.stringify(this.items, null, 2));
  }
}
