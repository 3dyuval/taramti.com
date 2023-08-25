import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import request from '../../api/request'
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const  data  = await request()
    .catch((err) => {
        console.error(err)
        Promise.reject({reason: 'Could not fetch mada data', error: err})
    })

    if (!data) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Could not fetch mada data'}),
        }
    }
    
  return {
    statusCode: 200,
    body: data,
  };

};

export { handler };