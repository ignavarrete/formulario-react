import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {PacientesCollection} from '../api/PacientesCollection';
import { Paciente } from './components/Paciente';
import Formulario from './components/Formulario';


export const App = () => {

  const pacientes = useTracker(() => PacientesCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  const eliminarPaciente = ({ _id }) => PacientesCollection.remove(_id);

  return (

    <div className='mt-10'>
      <h1 className='font-bold text-3xl text-center'>Añade a tus <span className='text-orange-700 font-bold'>Pacientes</span></h1>

      <div className='mt-10'>
        <Formulario/>
      </div>


      <div className='my-20 mx-10 xl:mx-auto max-w-7xl '>
        <h2 className='font-bold text-3xl text-center mb-10'>Listado de <span className='text-orange-700 font-bold'>Pacientes</span></h2>
         
        <div className='overflow-x-auto relative shadow-md rounded-lg'>
          <table className='w-full border'> 
            <thead className='bg-gray-800'>
              <tr>
                <th className='text-white'>Nombre</th>
                <th className='text-white'>Apellido Paterno</th>
                <th className='text-white'>Apellido Materno</th>
                <th className='text-white'>Rut</th>
                <th className='text-white'>Región</th>
                <th className='text-white'>Comuna</th>
                <th className='text-white'>Código postal</th>
                <th className='text-white'>Eliminar</th>
              </tr>
            </thead>
          
            { pacientes.map(paciente => 
            <Paciente key={ paciente._id } paciente={ paciente } onDeleteClick={eliminarPaciente} />) }  
                
          </table>
        </div>
    
      </div>

    </div>
  
  )
};

