const express = require('express')
const request = require('request')

const app = express();

let streetNumber='25-32'
let streetName='35th st'

app.get('/',(req,res)=>{
    request(`https://findmypollsite.vote.nyc/api/pollsiteinfo?county=Queens&streetnumber=${streetNumber}&streetname=${streetName}`,(err,response,data)=>{
        if(!err&&response.statusCode===200){
            res.send(data)
        }else res.send(response.statusCode)
    })


    // curl 'https://findmypollsite.vote.nyc/api/pollsiteinfo?county=Queens&streetnumber=${streetNumber}&streetname=${streetName}' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:80.0) Gecko/20100101 Firefox/80.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'X-Requested-With: XMLHttpRequest' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Referer: https://findmypollsite.vote.nyc/' -H 'Cookie: __cfduid=dbe6065e5d0ee90bc2137c35f2295fb681600803115; ARRAffinity=076b9cca5fb5e130dbe1de8b5153a54784e0c33e0a825a2bd7644b844208c8ce' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'
})
app.listen(3000,()=>{console.log('Node server running on 3000')})