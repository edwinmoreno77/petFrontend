export const createUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5004/createUser", {
      method: "POST",
      body: userData,
    });

    if (!response.ok) {
      if (response.status == 409) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`message: ${response.statusText}`);
      }
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authLogin = async (email, password) => {
  let url = `http://localhost:5004/login`;
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  let response = await fetch(url, options);
  let result = await response.json();
  return result;
};
