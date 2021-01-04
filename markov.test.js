/** Textual markov chain generator */
const { METHODS } = require('http');
const process = require('process')
const isCapitalized = require('is-capitalized')
  const strict = true
const { MarkovMachine, randomWord } = require('./markov')


// const randomWord = (arr) => arr[Math.floor(Math.random() * arr.length)]
describe('Testing MarkovMachine class', ()=>{
  let MM
  beforeEach(()=>{
    MM = new MarkovMachine("The cat in the hat has a mouse in a house. They are the best of friends.")
  })
  test('constructor function of Markov Machine class',()=>{
    
    expect(MM.words.length).toEqual(17)
    expect(MM.starters.length).toEqual(2)
    expect(MM.chain).toEqual(expect.any(Object))
  })
  test('sortStartingWords function of Markov Machine class',()=>{
    MM.words= ['Hello', 'goodbye', 'Once', 'upon', 'a', 'time']
    MM.sortStartingWords()
    expect(MM.starters.length).toEqual(2)
    expect(MM.starters).toContain('Hello')
    expect(MM.starters).toContain('Once')
  })
  test('MakeChains function of Markov Machine class',()=>{
    MM.words.push('now')
    MM.makeChains()
    expect(MM.chain).toEqual(expect.any(Object))
    expect(MM.chain).toEqual({
      'The': ['cat'],
      'cat': ['in'],
      'the': ['hat','best'],
      'hat': ['has'],
      'has': ['a'],
      'a' : ['mouse','house.'],
      'mouse' : ['in'],
      'in': ['the', 'a'],
      'house.' : ['They'],
      'They': ['are'],
      'are': ['the'],
      'best': ['of'],
      'of' : ['friends.'],
      'friends.' : ['now'],
      'now' : [null]
    })

  })
  test('makeText function of Markov Machine class',()=>{
    let text = MM.makeText(50)
    expect(text.split(/[ .,\r\n]+/).length).toEqual(50)
    text = MM.makeText(10)
    expect(text.split(/[ .,\r\n]+/).length).toEqual(10)
    expect(text).toEqual(expect.any(String))
    expect(text[text.length-1]).toBe(".")
  })
})

describe('Testing helper functions', ()=>{
  let arr = ['the','cat','in','the','hat']
  let arr2 = ['the','cat']
  
  test('randomWord picks a word from an array', () => {
    expect(randomWord(arr)).toEqual(expect.any(String))
    expect(randomWord(arr2)).toEqual(expect.any(String))
    expect(randomWord([])).toBe(undefined)
  })
  
})

// class MarkovMachine {

//   /** build markov machine; read in text.*/

//   constructor(text) {
//     let words = text.split(/[ .,\r\n]+/);
//     this.words = words.filter(c => c !== "" && c !== ".")
//     // .map(c => c.toLowerCase())
//     this.makeChains();
//     this.sortStartingWords();
//   }

//   /** set markov chains:
//    *
//    *  for text of "the cat in the hat", chains will be
//    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

//   makeChains() {
//     let chain = {}
//     this.words.reduce((acc, word, idx, words) => {
//       let next
//       if (words[idx+1]){
//         next = words[idx+1]
//       } else {
//         next = null
//       }

//       if (chain[String(word)]){
//         chain[String(word)].push(next)
//       } else {
//         chain[String(word)] = [next]
//       }
//     }, chain)
//     this.chain = chain
//   }

//   sortStartingWords() {
//     this.starters = this.words.filter( c => isCapitalized(c, strict)=== true)
//   }


//   // /** return random text from chains */
//   makeText(numWords = 100) {
//     let output = []
//     output.push(randomWord(this.starters))
//     for(let i=1 ; i<=numWords; i++){
//       let preceding = output[i-1]
//       if (!this.chain[preceding]){
//         output.push(randomWord(this.starters))
//       } else {
//         let next = randomWord(this.chain[preceding])
//         if (next === null){
//           output[i-1] = preceding+'.'
//         }
//         output.push(next)
//       }
//     }
//     let lastWord = output[output.length -1]
//     let lastChar = lastWord[lastWord.length-1]
//     if ( lastChar !== "."){
//       output[output.length -1] = lastWord+"."
//     }
//     return output.join(" ")
//   }
// }


// const m = new MarkovMachine(process.argv[2])

// console.log(m.makeText(100))



// async function handleInput(args){


