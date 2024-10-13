export function createUser(userData) {
  fetch("http://localhost:5004/createUser", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}
