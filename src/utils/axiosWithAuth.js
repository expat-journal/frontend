import axios from "axios";
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

export default () => {
  const length = localStorage.length;
  let token = null;
  for(let i = 0; i < length; i++){
    const key = localStorage.key(i);
    try {
      const decryptKey = cryptr.decrypt(key);
      if (decryptKey === "token"){
        token = localStorage.getItem(key);
      }
    }catch{

    }
    
  }

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
};
