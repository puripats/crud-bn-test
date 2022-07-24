import {db} from '../connection'

export class PostCodeService {
  constructor(){
    
   }

   public getPostCode = async () => {
    let payLoadPostCode: any = {payload:[],count:0}
    const postCode: any = await db.query(`SELECT post_code FROM home`);
      
    for (const i in postCode) {
      payLoadPostCode['payload'].push(postCode[i]);
      payLoadPostCode['count'] += 1;
  }
    return payLoadPostCode;
  } 
  
    public getPostCodeId = async (id: any) => {
      let payLoadPrice: any = {payload:{average:0,median:0}}
      let arrayPrice: any[] =[]
      const priceObj: any = await db.query(`SELECT price FROM home WHERE post_code=${id}`)
      for (const i in priceObj) {
        arrayPrice.push(priceObj[i]['price'])
      }
      payLoadPrice['payload']['average'] = average(arrayPrice);
      payLoadPrice['payload']['median'] = median(arrayPrice);
    return payLoadPrice   
    } 
}

function median(values:any[]){
  if(values.length ===0) throw new Error("No inputs");

  values.sort(function(a:any,b:any){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}

function average(value: any[]){
  return value.reduce((a, b) => a + b) / value.length;
}