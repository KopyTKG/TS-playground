import {MongoClient} from "mongodb"

export class Mongo {
    private Client: MongoClient;
    constructor() {
        this.Client = new MongoClient(String(process.env.MONGO_URL));
        this.Client.connect()        
    }


}