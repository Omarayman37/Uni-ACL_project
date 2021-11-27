# Uni-ACL_project
ACL project of a Airplane management System

Karim Lotfy 
Karim Saad
Omar Aiman
Hazem Maghrby


# Status resposes: when Sending a request and wating for a response from the server our resposes need to be constent
## here always send status(200).Json({// here goes your respose})
## respose = {
    status: ok,
    success: true|false,
    err: null| String to be printed on screen,
    
}

# encryptian uses something called aes128 that takes a 16 bit key and 16 bit init vector and outputs encritian and decriptian 

out key is P6wVBCUaAnRlmBNG used for both encrytian and decritian

 encrypt = (obj)=>{
    let key = "P6wVBCUaAnRlmBNG";
    let iv = key
    console.log(key, key.length)
    const cipher = crypto.createCipheriv("aes128", key, iv); // TODO: Get a real super secret key
    let crypted = cipher.update(JSON.stringify(obj), "utf-8", "hex");
    crypted += cipher.final("hex");
    return crypted
  }

  // UTIL funcitons
const decrypt = (encrypted_response)=>{
  const key = 'P6wVBCUaAnRlmBNG'; 
  const iv= key;
  const decipher = createDecipheriv('aes128', key, iv) 
  let msg = decipher.update(encrypted_response, "hex", "utf-8") + decipher.final('utf8')
  console.log('decrypted msg is '+msg)
  return msg
} 