import React from 'react';

export const Paciente = ({ paciente, onDeleteClick }) => {

    const { nombre, apellidop, apellidom, rut, region, comuna, codpostal} = paciente;

    return (
        <tbody className='text-center'>
            <tr className='border-b'>
                <td className='py-2 whitespace-nowrap'>{nombre}</td>
                <td>{apellidop}</td>
                <td>{apellidom}</td>
                <td>{rut}</td>
                <td>{region}</td>
                <td>{comuna}</td>
                <td>{codpostal}</td>
                <button className='bg-red-500 m-2 text-white px-1'
                onClick={ () => onDeleteClick(paciente)}>&times;</button>
            </tr>
        </tbody>
               
    )
};

