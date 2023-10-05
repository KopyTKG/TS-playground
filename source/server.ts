// .env file load into memory
import dotenv from "dotenv"
dotenv.config()

import { Cache } from "./interface/cache.interface"
import { Mongo } from "./interface/mongo.interface"

import {Movies} from "./data/Movie"

const cache = new Cache();
const db = new Mongo("movies");


function Main() {

    cache.set('true','{data: true}')
    .then(status => {
        console.log(status);
    }).catch(error => {
        console.log(error);
    })

    cache.get('true').then((data) => {
        console.log(data)
    })
    /*
    db.createCollection("testCollection").catch(err => {
        throw err;
    }).then(()=>{
        db.insert(
            {
                _id: 0,
                name: "Ahoj"
            }
        ).then((status) => {
            console.log(status)
        })
    })
    db.createCollection("movies")
    .catch(err => {
        throw err;
    })
    .then(() => {  
        db.insertMany(Movies)
        .catch(err => {
            throw err;
        })
    })
    */
    db.count("movies")
    .catch(err => {
        throw err;
    }).then(data => {
        console.log(data)
    })
}


Main()