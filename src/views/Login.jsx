import { useState } from "react"
export function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);

    const handlerSubmit = () => {
        let url = `https://https://refactored-space-goggles-r4vrq9q9656f4wr-5173.app.github.dev/login/${username}`;
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(username)
            };

            fetch(url, options)
                .then((respuesta) => {
                    if (respuesta.ok) {
                        return respuesta.json();
                    } else {
                        throw new Error("Hubo un error");
                    }
                })
                .then((result) => {
                    getUser()
                })
                .catch((error) => console.log(error));
            setUser({ label: "", is_done: false })
        }



    return (
        <>
            <div className="grid grid-cols-2">
                <div className="flex justify-center bg-slate-300 min-h-screen">
                    <div className="bg-white w-80 h-80 my-10 rounded-md">
                        <h2 className="text-center font-bold text-gray-900 my-5">LOGIN</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4 mx-4">
                                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                                    Usuario
                                </label>
                                <input 
                                className="block bg-white w-full border border-slate-300 rounded-md sm:text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" 
                                placeholder="ejemplo@email.com" 
                                type="text" 
                                name="user"
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)} 
                                />
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-6">
                                    Contraseña
                                </label>
                                <input className="block bg-white w-full border border-slate-300 rounded-md sm:text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" 
                                placeholder="********" 
                                type="text" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button 
                            className="rounded-md bg-lime-500 mt-10 text-white font-bold shadow-md"
                            onClick={(e) => handlerSubmit(e)}
                            >
                                <h1 className="my-1 mx-14">Ingresar</h1>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src=""></img>
                </div>
            </div>
        </>
    )
}
