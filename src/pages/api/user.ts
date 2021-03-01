import {NowRequest, NowResponse} from '@vercel/node';

export default(request:NowRequest, response:NowResponse) =>{
    return response.json({name:'Visitante', picture:'https://cdn2.vectorstock.com/i/1000x1000/59/11/cartoon-animal-head-icon-dog-face-avatar-vector-7375911.jpg'})
}