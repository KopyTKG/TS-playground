import {RedisClientType, createClient} from "redis";

export class Cache {
    private Client: RedisClientType; 

    constructor() {
        this.Client = createClient({
            url: process.env.REDIS_URL
        })

        this.Client.connect()
    }
   
    /**
    * set
        * Set key and value pair into redis cache
        
    * return [Promise<string>]
        * Returns only redis status which is string  
     */
    public async set(key: string, data: string): Promise<string> {
        
        try {
            let status = await this.Client.set(key, data);
            if(status === undefined || status === null) {
                throw new Error("Not status was given");
            }
            return String(status);
        } catch (err) {
            throw err
        }

    }

    /**
    * get
        * Get value of key from redis cache
     
    * return [Promise<string>]
        * data will be string  
     */
    public async get(key: string): Promise<string> {
        try {
            let data = await this.Client.get(key);
            if (data === undefined || data === null) {
                throw new Error(`Data not found for key: ${key}`);
            }
            return String(data);
        } catch (err) {
            throw err;
        }
    }
    

}