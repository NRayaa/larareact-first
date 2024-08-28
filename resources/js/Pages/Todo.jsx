import Pagination from '@/Components/Pagination';
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const Todo = ({ dataTodo }) => {
    console.log(dataTodo)
    const { flash, errors } = usePage().props

    const { data, setData, post, processing, reset } = useForm({
        // _token: props.csrf_token,
        name: '',
    })
    function submitTodo(e) {
        e.preventDefault()
        router.post('/todo', data, {
            onSuccess: () => { reset() }
        })
    };

    function deleteTodo(id) {
        // id.preventDefault()
        router.delete('/todo/delete/' + id, data, {
            onSuccess: () => { reset() }
        })
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className='font-semibold text-4xl my-8 text-center'>TODO APP</h2>
                {flash.message && (
                    <div className="py-2 px-4 rounded-md bg-green-300 text-black text-center mb-6">
                        {flash.message}
                    </div>
                )}
                <form onSubmit={submitTodo}>
                    <div className="mb-6">
                        <div className="flex gap-4 items-center">
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className='px-4 py-2 rounded-md grow' placeholder='Enter Todo Here...' />
                            <button className='py-2 px-4 rounded-md bg-indigo-500 text-white' type="submit">Save</button>
                        </div>
                        {errors.name && (
                            <p className="text-red-700 text-sm my-2">{errors.name}</p>
                        )}
                    </div>
                </form>

                <div className="flex flex-col gap-4">
                    {dataTodo.data.map((todo, i) => {
                        return (
                            <div
                                key={i}
                                className={`flex justify-between items-center py-2 px-6 ${todo.is_complete ? 'bg-green-300' : 'bg-red-300'} rounded-md`}
                            >
                                <h3>{todo.name}</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <Link href={`/todo/edit/${todo.id}`}> {todo.is_complete ? <FaRegCheckCircle size={20} /> : <BsPencilSquare size={20} />}</Link>
                                    |{" "}
                                    <Link onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt size={19} /></Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-8 flex justify-end items-center">
                    <Pagination todo={dataTodo}></Pagination>
                </div>
            </div>

        </AdminLayout>
    )
}

export default Todo
