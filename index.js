const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request')
const Country = require('./models/countryModel')

const parseAndSaveHTML = async (html) => {
    try {
        var parsedData = cheerio.load(html)
    } catch (error) {
        console.log("cannot parse the html file")
    }

    try {
        const sections = parsedData('section')
        sections.each(function(i, element){
            if(i!==0){
                parsedData(this).children().each(function(j, node){
                    if(node.name=='ul'){
                        parsedData(this).children().children().children().each(async function(k, val){
                            let url = val.attribs.href
                            let name;
                            val.children.forEach((n,text)=>{
                                name = n.data
                            })

                            const country = await Country.create({name:name, url:url})
                            console.log(country)
                        })
                    }
                })
            }
            
        })
    } catch (error) {
        console.log("cannot save the html file")
    }
}
async function startParser() {
    // Connect to mongoDB
    connectDB();
    const URL = "https://www.britannica.com/topic/list-of-countries-1993160"
    request(URL, (err, response, html) => {
        if(!err && response.statusCode == 200){
            parseAndSaveHTML(html)
        }
    })
    
}

async function run(){
    try {
        await startParser()
        console.log("parsed data stored in db")
        // process.exit()
    } catch (error) {
        console.log("cannot save the parsed url in db", err.message)
        // process.exit(1)
    }
}
  
run()

  