export const brands = ['Itaipava','Skol','Heineken','Local','Brahma'];
export const formats: Record<string,string> = {latinha:'Latinha',litrao:'Litrão (1 L)','600ml':'600 ml'};
// Prices are in centavos, per fardo. Null means awaiting the owner's price list.
export const packPrices: Record<string, Record<string,number|null>> = Object.fromEntries(brands.map(b=>[b,{latinha:null,litrao:null,'600ml':null}]));
export const extras = ['Gelo','Gelo de sabor','Baly','Beats','Smirnoff','Tanqueray','Johnnie Walker','White Horse','Chopp de vinho Sempel'].map(name=>({name,price:null as number|null}));
export const deliveryFee: number|null = null;
export function calculate(items:{brand:string;format:string;quantity:number}[],adds:{name:string;quantity:number}[],notes:string){
 let known=0,missing=false;
 for(const i of items){const price=packPrices[i.brand]?.[i.format];if(price==null)missing=true;else known+=price*i.quantity;}
 for(const i of adds){const price=extras.find(e=>e.name===i.name)?.price;if(price==null)missing=true;else known+=price*i.quantity;}
 return {knownSubtotal:known,subtotal:missing?null:known,deliveryFee,total:missing||deliveryFee===null||notes.trim()?null:known+deliveryFee};
}
