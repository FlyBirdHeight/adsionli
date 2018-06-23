let ws
function getConnect(){
    if(!ws){
        ws = new WebSocket("ws://101.132.71.227:2364");   
    }
    return ws;
}
export default getConnect();