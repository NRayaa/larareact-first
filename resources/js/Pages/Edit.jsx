import AdminLayout from '@/layouts/AdminLayout'
import { router, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const Edit = ({ todo }) => {
    console.log(todo)

    const { flash, errors } = usePage().props

    const { data, setData, post, processing, reset } = useForm({
        name: todo.name || '',
        is_complete: todo.is_complete || false,
    })
    console.log(data)

    function submitTodo(e) {
        e.preventDefault()
        router.put('/todo/update/' + todo.id, data, {
            onSuccess: () => { reset() }
        })
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className='font-semibold text-4xl my-8 text-center'>EDIT TODO</h2>
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
                    <div className="mb-6">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={data.is_complete} onChange={e => setData('is_complete', e.target.checked)}/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Is_Complete</span>
                        </label>

                    </div>
                </form>
            </div>

        </AdminLayout>
    )
}

export default Edit
