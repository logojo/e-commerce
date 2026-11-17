'use client'

import { User } from "@/generated/prisma/client"
import { changeProfile } from "@/app/actions/users/change-profile"
import clsx from "clsx"



interface Props {
    users: User[]
}

const RowsTable = ({ users } : Props ) => {

  return (
  
      <div className="mb-10">
             <table className="min-w-full">
               <thead className="bg-gray-200 border-b border-b-gray-400">
                 <tr>
                   <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                     Nombre completo
                   </th>
                   <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                     Email
                   </th>
                   <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                     Estado
                   </th>
                   <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                     Perfil
                   </th>
                 </tr>
               </thead>
               <tbody>        
                {
                    users.length === 0 
                    ? (
                    <tr>
                    <td colSpan={5} className='w-full h-10 p-5 text-center'>
                            <div className='flex justify-center items-center text-red-600'>No existen ordenes</div>
                    </td>
                    </tr>
                    )
                    :
                    users.map( user => (
                    <tr key={user.id} className="bg-white border-b border-b-gray-300 transition duration-300 ease-in-out hover:bg-gray-100 fade-in">
            
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        { user.name }
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        { user.email }
                        </td>
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span className={
                            clsx(
                            'mx-2', {
                                'text-green-800': !user.banned,
                                'text-orange-800': user.banned
                            }
                            )
                        }>{ user.banned ? 'Inactivo' : 'Activo'}</span>
            
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <select value={user.role ?? 'user'} 
                                onChange={ (e) => changeProfile( user.id, e.target.value) } 
                                className="text-sm text-gray-800 w-full p-1">
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                        </select>
                        </td>
            
                    </tr>
                    ))
                }
        </tbody>
        </table>
      </div>
  )
}

export default RowsTable
