/** Textual markov chain generator */
const { METHODS } = require('http');
const process = require('process')
const isCapitalized = require('is-capitalized')
const strict = true

const randomWord = (arr) => arr[Math.floor(Math.random() * arr.length)]


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[\r \n]+/);
    this.words = words.filter(c => c !== "" && c !== ".")
    // .map(c => c.toLowerCase())
    this.makeChains();
    this.sortStartingWords();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {}
    this.words.reduce((acc, word, idx, words) => {
      let next
      if (words[idx+1]){
        next = words[idx+1]
      } else {
        next = null
      }

      if (chain[String(word)]){
        chain[String(word)].push(next)
      } else {
        chain[String(word)] = [next]
      }
    }, chain)
    this.chain = chain
  }

  sortStartingWords() {
    this.starters = this.words.filter( c => isCapitalized(c, strict)=== true)
  }


  // /** return random text from chains */
  makeText(numWords = 100) {
    let output = []
    output.push(randomWord(this.starters))
    for(let i=1 ; i<numWords-1; i++){
      let preceding = output[i-1]
      if (!this.chain[preceding]){
        output.push(randomWord(this.starters))
      } else {
        let next = randomWord(this.chain[preceding])
        if (next === null){
          output.push(randomWord(this.starters))
        } else {
          output.push(next)
        }
      }
    }
    let lastWord = output[output.length -1]
    
    let lastChar = lastWord ? lastWord[lastWord.length-1] : ""
    if ( lastChar !== "."){
      output[output.length -1] = lastWord+"."
    }
    return output.join(" ")
  }
}




module.exports = { MarkovMachine, randomWord } 


