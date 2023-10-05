import { table } from "console";
import { ClientSession, MongoClient } from "mongodb"

export class Mongo {
    private Client: MongoClient;
    private DB: string;
    private session: ClientSession;
    private collection: string;

    constructor(db: string) {
        this.DB = db;
        this.Client = new MongoClient(String(process.env.MONGO_URL));
        this.Client.connect();
        this.session = this.Client.startSession();  
        this.collection = "";
    }

    public setCollection(collection: string) {
        this.collection = collection;
    }

    /**
    * createTable
        * Creates a table (Collection) in mongoDB
    */
    public async createCollection(name: string) {
        try {
            this.session.startTransaction();
            const Table = await this.Client.db(this.DB).createCollection(name);
            if(Table === undefined || Table === null) {
                throw new Error("Collection cannot be created");
            }
            this.collection = name;
            await this.session.commitTransaction();
        } catch(err) {
            throw err;
        }
    }

    /**
    * insert
        * Inserts one line into collection 
     */
    public async insert(data: object) {
        try {
            this.session.startTransaction();
            const coll = await this.Client.db(this.DB).collection(this.collection);
            const res = await coll.insertOne(data);
            if(res === undefined || res === null) {
                throw new Error("Data cannot be inserted");
            }
            await this.session.commitTransaction();
        } catch(err) {
            throw err;
        }
    }

    /**
    * insertMany
        * Insert array of objects into collection 
     */
    public async insertMany(data: Array<object>) {
        try {
            this.session.startTransaction();
            const coll = await this.Client.db(this.DB).collection(this.collection);
            const res = await coll.insertMany(data);
            if(res === undefined || res === null) {
                throw new Error("Array of data cannot be inserted");
            }
            await this.session.commitTransaction();
        } catch(err) {
            throw err;
        }
    }

    /**
    * drop
        * Drops current collection 
     */
    public async drop() {
        try {
            this.session.startTransaction();
            await this.Client.db(this.DB).dropCollection(this.collection);
            await this.session.commitTransaction();
        } catch(err) {
            throw err;
        }     
    }

    public async count(collection: string): Promise<Number> {
        try {
            this.session.startTransaction();
            const count = await this.Client.db(this.DB).collection(collection).countDocuments();
            await this.session.commitTransaction();
            if(count === undefined || count === null) {
                throw new Error("Collection cannot be counted");
            }
            return Number(count);
        } catch(err) {
            throw err;
        } 
    }
}