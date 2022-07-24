import {db} from '../connection'
//import { HomeRepository } from "../repository/home.repository";

interface HomeCreate {
  name: String;
  post_code: Number;
  price: Number;
  desc: String;
}

export class HomeService {
 // private homeRepository: HomeRepository;

  constructor(){
   // this.homeRepository = getConnection("home").getCustomRepository(HomeRepository);
  }

  public index = async (query: any) => {
  //  const home = await this.homeRepository.find();
    const skip = query.skip;
    const take = query.take;
    let payLoadObject: any = {payload:[],count:0}
    const home: any = await db.query(`SELECT * FROM home ORDER BY id DESC LIMIT ${take} OFFSET ${skip}`);
    
    for (const i in home) {
        payLoadObject['payload'].push(home[i]);
        payLoadObject['count'] += 1;
    }
    return payLoadObject;
  } 

  public create = async (body: HomeCreate) => {
  try {
    let result:any;

    const { name, post_code, price, desc } = body
    if (!name || !post_code || !price || !desc) {
      const error = new Error('Missing params')
      return error
    }

    const queryParams = [name, post_code, price, desc]
    const query = 'INSERT INTO home (name, post_code, price, "desc") VALUES ($1, $2, $3, $4)'
    result = await db.query(query, queryParams)
    console.log(`Note successfully inserted: ${name}`)
    console.info(result);
    return result
  } catch (err) {
    console.info(err)
    return
  } 
  } 

  public update =  async(body: any, id: any) => {
    try {
      const { name, post_code, price, desc }:HomeCreate = body;
      console.info(price);
      const queryParams = [name, post_code, price, desc];
      if (!name || !post_code || !price || !desc) {
        const error = new Error('Missing params')
        return error
      }
      const query = 'UPDATE home SET name = $1, post_code = $2, price = $3, "desc" = $4 '+`WHERE id = ${id}`;
      console.info(query);
      const result = await db.query(query, queryParams);
      return result;
    } catch (e){
      console.info(e)
      return
    }
  } 

  public delete = async (id: any) => {
    const query = `DELETE FROM home WHERE id = ${id}`
    const result = await db.query(query)
    return result;
  } 
}