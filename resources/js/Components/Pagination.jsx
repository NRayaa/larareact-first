import { Link } from '@inertiajs/react'
import React from 'react'

const Pagination = ({ todo }) => {
    const links = todo.links;
    const currentPage = todo.current_page
    const lastPage = todo.last_page

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
                {links.map((link, i) => {
                    return (
                        <li key={i}>
                            <Link
                                href={link.url}
                                className={`${
                                    link.active
                                        ? "z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                        : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }
                                ${link.current}
                                ${i === 0 && currentPage === 1 ? "hidden" : ""}
                                ${i == links.length - 1 && currentPage === lastPage ? "hidden" : ""}`}
                            >
                                <div dangerouslySetInnerHTML={{ __html: link.label }}></div>
                            </Link>

                        </li>
                    )
                })}
            </ul>
        </nav>

    )
}

export default Pagination
