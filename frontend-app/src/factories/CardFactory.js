import shuffle from "@/helpers/shuffle";

class CardFactory {
  constructor(images) {
    this.images = images
    this.cards = []
  }

  generateCardPairs = amount => {
    for(let i=0;i<amount;i++) {
      this.generateCardPair()
    }

    return this
  }

  generateCardPair = () => {
    let pairValue = Math.random()
    this.cards.push(this.generateCard(pairValue))
    this.cards.push(this.generateCard(pairValue))
  }

  generateCard = value => {
    return {
      id: Math.random(),
      type: 'image',
      display: this.images.value[Math.floor(this.cards.length / 2)]?.download_url,
      value: value ?? null,
      visible: false,
      selected: false,
      matched: false
    }
  }

  shuffleCards = () => {
    shuffle(this.cards)
    return this
  }

  getAllCards = () => {
    return this.cards
  }
}

export default CardFactory