

function authLogin(email, password) {
    let url = `http://localhost:5004/login`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => result) 
      .catch((error) => console.log(error));
}

export default authLogin;
    
