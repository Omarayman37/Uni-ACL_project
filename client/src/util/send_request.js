import axios from 'axios'
const send_request = async (url, data)=>{
    console.group()
    console.log(`sending request to ${url} with data`)
    console.dir(data)
    
    console.groupEnd()
} 