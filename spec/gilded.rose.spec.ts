import { Item, GildedRose } from '../src/gilded.rose';

describe('GildedRose', () => {
  let subject;

  let dexterityVest;
  let agedBrie;
  let conjuredManaCake;
  let sulfuras;
  let backstagePasses;

  describe('#updateQuality', () => {
    beforeEach(() => {
      dexterityVest = new Item("+5 Dexterity Vest", 10, 20);
      conjuredManaCake = new Item("Conjured Mana Cake", 3, 6);
      backstagePasses = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15);
      agedBrie = new Item("Aged Brie", 4, 11)
      sulfuras = new Item("Sulfuras, Hand of Ragnaros", 0, 80);

      subject = new GildedRose([
        dexterityVest,
        backstagePasses,
        sulfuras,
        agedBrie,
        conjuredManaCake
      ]);
    })

    it('updates items correctly', () => {
      subject.updateQuality();

      expect(dexterityVest.sellIn).toEqual(9)
      expect(dexterityVest.quality).toEqual(19)

      expect(backstagePasses.sellIn).toEqual(4);
      expect(backstagePasses.quality).toEqual(18);

      expect(sulfuras.sellIn).toEqual(0);
      expect(sulfuras.quality).toEqual(80);

      expect(agedBrie.sellIn).toEqual(3);
      expect(agedBrie.quality).toEqual(12);

      expect(conjuredManaCake.sellIn).toEqual(2);
      expect(conjuredManaCake.quality).toEqual(4);
    });

    describe('dexterity vest', () => {
      describe('has sellIn of -1', () => {
        beforeEach(() => {
          dexterityVest.sellIn = -1
        })

        it('degrades quality by 2', () => {
          subject.updateQuality();
          expect(dexterityVest.quality).toEqual(18)
        })
      })
    })

    describe('conjured mana cake', () => {
      describe('has quality of 1', () => {
        beforeEach(() => {
          conjuredManaCake.quality = 1
        })

        it('does not decrease quality below 0', () => {
          subject.updateQuality();
          expect(conjuredManaCake.quality).toEqual(0)
        })
      })

      describe('has sellIn date of -1', () => {
        beforeEach(() => {
          conjuredManaCake.sellIn = -1
        })

        describe('and quality is 6', () => {
          beforeEach(() => {
            conjuredManaCake.quality = 6;
          })

          it('quality should be 2', () => {
            subject.updateQuality();

            expect(conjuredManaCake.sellIn).toEqual(-2)
            expect(conjuredManaCake.quality).toEqual(2)
          })
        })

        describe('and quality is 0', () => {
          beforeEach(() => {
            conjuredManaCake.quality = 0;
          })

          it('does not decrease quality below 0', () => {
            subject.updateQuality();

            expect(conjuredManaCake.sellIn).toEqual(-2)
            expect(conjuredManaCake.quality).toEqual(0)
          })
        })
      })
    })

    describe('aged brie', () => {
      describe('has quality of 50', () => {
        beforeEach(() => {
          agedBrie.quality = 50
        })

        it('does not decrease quality below 0', () => {
          subject.updateQuality();

          expect(agedBrie.sellIn).toEqual(3)
          expect(agedBrie.quality).toEqual(50)
        })
      })
    })

    describe('backstage passes', () => {
      describe('has sellIn of 10', () => {
        beforeEach(() => {
          backstagePasses.sellIn = 10
        })

        it('increases quality by 2', () => {
          subject.updateQuality();

          expect(backstagePasses.sellIn).toEqual(9)
          expect(backstagePasses.quality).toEqual(17)
        })
      })

      describe('has sellIn of 20', () => {
        beforeEach(() => {
          backstagePasses.sellIn = 20
        })

        it('increases quality by 1', () => {
          subject.updateQuality();

          expect(backstagePasses.sellIn).toEqual(19)
          expect(backstagePasses.quality).toEqual(16)
        })
      })

      describe('has sellIn of -1', () => {
        beforeEach(() => {
          backstagePasses.sellIn = -1
        })

        it('increases quality by 2', () => {
          subject.updateQuality();

          expect(backstagePasses.sellIn).toEqual(-2)
          expect(backstagePasses.quality).toEqual(0)
        })
      })
    })
  })
})
