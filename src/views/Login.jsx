import {useState} from "react"






function Login() {
    return (
        <form>
            <div className="container-fluid bg-slate-300 min-h-screen flex justify-center">
                <div className="bg-white h-60 w-80 my-10 rounded-md">
                    <h2 className="text-center font-bold leading-7 text-gray-900 my-4">LOGIN</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4 mx-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuario
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-64">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">email@ejemplo.com</span>
                                </div>
                            </div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 my-3">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-64">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">********</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login;