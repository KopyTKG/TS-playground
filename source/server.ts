// .env file load into memory
import dotenv from "dotenv"
dotenv.config()

import { Cache } from "./interface/cache.interface"
import {Mongo} from "./interface/mongo.interface"

function Main() {
    const cache = new Cache()
    cache.set('true','{data: true}')
    .then(status => {
        console.log(status);
    }).catch(error => {
        console.log(error);
    })

    cache.get('true').then((data) => {
        console.log(data)
    })
}


Main()