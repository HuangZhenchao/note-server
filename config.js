let domain="http://106.55.148.203:8002/"
const os=require("os")
if(os.hostname()=="DESKTOP-A1FBKV0"){
    domain="http://localhost:8002/"
}
module.exports = {
    db: {
        host: 'localhost',
        user: 'node',
        password: '954325',
        database:'db_record',
        port: 3306
    },
    domain:domain
};