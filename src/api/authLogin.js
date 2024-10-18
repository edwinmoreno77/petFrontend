

async function authLogin(email, password) {
  console.log({email, password})
    let url = `http://localhost:5004/login`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    };

    let response = await fetch(url, options)
    
      let result = await response.json()
      console.log(result)
      return result
}

export default authLogin;
    
