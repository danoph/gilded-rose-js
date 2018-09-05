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

  updateQuality() {

    for (let i = 0; i < this.items.length; i++) {
      //const item = new FancyItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
      //item.updateQuality();

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if ((this.items[i].name != 'Sulfuras, Hand of Ragnaros') && (this.items[i].name != 'Conjured Mana Cake')) {
            this.items[i].quality = this.items[i].quality - 1
          } else {
            if(this.items[i].name == 'Conjured Mana Cake') {
              if(this.items[i].sellIn < 0) {
                this.items[i].quality = this.items[i].quality - 4
              } else {
                if(this.items[i].quality >= 2) {
                  this.items[i].quality = this.items[i].quality - 2
                } else {
                  this.items[i].quality = 0;
                }
              }
            }
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if ((this.items[i].name != 'Sulfuras, Hand of Ragnaros') && (this.items[i].name != 'Conjured Mana Cake')) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }

  printItems() {
    console.log(JSON.stringify(this.items, null, 2));
  }
}
