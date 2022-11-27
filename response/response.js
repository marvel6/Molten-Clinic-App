
const response = ({data,msg}) =>{
    return {
        Data:data || null,
        Msg:msg,
        success: true
    }
}

module.exports = response