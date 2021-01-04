/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const isUrl = require('is-url')
const { MarkovMachine } = require('./markov')
const striptags = require('striptags');



async function handleInput(args){
    const type = args[2]
    const path = args[3]
    
    if (args[2] === 'file'){
        fs.readFile(path,'utf8',(err,data)=>{
            if (err) {
                // handle possible error
                console.error(`Error reading ${path}: ${err}`)
                console.log(err);
                // kill the process and tell the shell it errored
                process.exit(1);
              }
              let MM = new MarkovMachine(data)
              console.log(MM.makeText())
        })

    } else if (type === 'url' && isUrl(path)){
        let promise = axios.get(path)
        promise
        .then((data)=>{
            let MM = new MarkovMachine(striptags(data.data))
            console.log(MM.makeText())
        })
        .catch((err)=>{
            // handle possible error
            console.log(err)
            // kill the process and tell the shell it errored
            process.exit(1)
        })

    } else {
        console.error(`Error! '${type}' is not a valid command. Try 'file' or 'url' `)
        process.exit(1)
    }

}
handleInput(process.argv)
//FUTURE VERSIONS WRITE TO FILE?
// function handleOutput(data, path){
//     if (path){
//         fs.writeFile(path, data,'utf8',(err)=>{
//             if (err) {
//                 // handle possible error
//                 console.error(`Error writing ${path}: ${err}`)
//                 console.log(err);
//                 // kill the process and tell the shell it errored
//                 process.exit(1);
//             }
//         })
//     } else {
//         console.log(data)
//     }

