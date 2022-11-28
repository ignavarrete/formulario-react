import React, { useState} from 'react';
import { PacientesCollection } from '../../api/PacientesCollection';
import ComunasRegiones from './comunas-regiones.json';
import { useForm } from 'react-hook-form';
import { validateRut } from 'rutlib';

const Formulario = () => {

    const {register, formState: {errors} , handleSubmit } = useForm();

    const [nombre, setNombre] = useState("");
    const [apellidop, setApellidop] = useState("");
    const [apellidom, setApellidom] = useState("");
    const [rut, setRut] = useState("");
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedComuna, setSelectedComuna] = useState([]);
    const [codpostal, setCodpostal] = useState("");


    const obtenerComuna = ComunasRegiones.regiones.find((obj) => obj.region === selectedRegion);

    const validarRut = validateRut(rut)

    const onSubmit = (data, e) => {
        e.preventDefault();

        if([nombre, apellidop, apellidom, selectedRegion, selectedComuna, codpostal].includes('')){
            return;
        }

        PacientesCollection.insert({
            nombre,
            apellidop,
            apellidom,
            rut,
            region: selectedRegion,
            comuna: selectedComuna,
            codpostal,
        });

        alert('Paciente ingresado correctamente');

        e.target.reset();

        setNombre("");
        setApellidop("");
        setApellidom("");
        setRut("");
        setSelectedRegion([]);
        setSelectedComuna([]);
        setCodpostal(null);
    }
 
    return (
        <div className='max-w-3xl mx-auto'>
            <form className='shadow-2xl rounded-lg py-10 px-5' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="text-gray-800">Nombre:</label>
                    <input type="text" id="nombre" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Nombre del paciente" 
                    {...register("nombre", { required: true, minLength: 3, maxLength: 40, pattern: /^[A-Za-z]+$/i})}
                    value={nombre} 
                    onChange={ (e) => setNombre(e.target.value)}
                    />

                    {errors?.nombre?.type === 'required' && <span className='font-bold text-red-400'>El nombre es obligatorio</span>}
                    {errors?.nombre?.type === 'minLength'  && <span className='font-bold text-red-400'>El nombre debe tener mínimo 3 caracteres</span>}
                    {errors?.nombre?.type === 'maxLength' && <span className='font-bold text-red-400'>El nombre debe tener máximo 40 caracteres</span>}
                    {errors?.nombre?.type === 'pattern' && <span className='font-bold text-red-400'>Solo puedes ingresar caracteres alfabéticos</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="apellidop" className="text-gray-800">Apellido paterno:</label>
                    <input type="text" id="apellidop" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Apellido paterno del paciente" 
                    {...register("apellidop", { required: true, minLength: 3, maxLength: 40, pattern: /^[A-Za-z]+$/i})}
                    value={apellidop}
                    onChange={ (e) => setApellidop(e.target.value)} 
                    />

                    {errors?.apellidop?.type === 'required' && <span className='font-bold text-red-400'>El Apellido Paterno es obligatorio</span>}
                    {errors?.apellidop?.type === 'minLength' && <span className='font-bold text-red-400'>El Apellido Paterno debe tener mínimo 3 caracteres</span>}
                    {errors?.apellidop?.type === 'maxLength' && <span className='font-bold text-red-400'>El Apellido Paterno debe tener máximo 40 caracteres</span>}
                    {errors?.apellidop?.type === 'pattern' && <span className='font-bold text-red-400'>Solo puedes ingresar caracteres alfabéticos</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="apellidom" className="text-gray-800">Apellido materno:</label>
                    <input type="text" id="apellidom" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Apellido materno del paciente"
                    {...register("apellidom", { required: true, minLength: 3, maxLength: 40, pattern: /^[A-Za-z]+$/i})}
                    value={apellidom}
                    onChange={ (e) => setApellidom(e.target.value)} 
                    />

                    {errors?.apellidom?.type === 'required' && <span className='font-bold text-red-400'>El apellido Materno es obligatorio</span>}
                    {errors?.apellidom?.type === 'minLength' && <span className='font-bold text-red-400'>El Apellido Materno debe tener mínimo 3 caracteres</span>}
                    {errors?.apellidom?.type === 'maxLength' && <span className='font-bold text-red-400'>El Apellido Materno debe tener máximo 40 caracteres</span>}
                    {errors?.apellidom?.type === 'pattern' && <span className='font-bold text-red-400'>Solo puedes ingresar caracteres alfabéticos</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="rut" className="text-gray-800">RUT:</label>
                    <input type="text" id="rut" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Ingrese su Rut" 
                    {...register("rut", { required: true, validate: rut => {
                        if(validarRut === false){
                            const mensaje = "Formato del Rut es inválido";
                            return mensaje;
                        }
                    } })}
                    value={rut}
                    onChange={ (e) => setRut(e.target.value)} 
                    />

                    {errors?.rut?.type === 'required' && <span className='font-bold text-red-400'>El Rut es obligatorio</span>}
                    {errors?.rut?.type === 'validate' && <span className='font-bold text-red-400'>El Rut no tiene un formato válido</span>}
                   
                </div>

                <div className="mb-4">
                    <label htmlFor="region" className="text-gray-800">Region:</label>
                    <select id="region" className='mt-2 block w-full p-3 bg-gray-50'
                     {...register("region", { required: true})}
                    value={selectedRegion}  
                    onChange={ (e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="" disabled selected>--Seleccione una region--</option>
                        {
                            ComunasRegiones.regiones.map((result, key) => (
                            <option value={result.region} key={key}>{result.region}</option>
                            ))
                        }
                    </select>

                    {errors?.region?.type === 'required' && <span className='font-bold text-red-400'>Seleccione una region</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="comuna" className="text-gray-800">Comuna:</label>
                    <select id="comuna" className='mt-2 block w-full p-3 bg-gray-50'
                    {...register("comuna", { required: true})}
                    value={selectedComuna}
                    onChange={e => setSelectedComuna(e.target.value)}
                    >
                        <option value="" disabled selected>--Seleccione una comuna--</option>
                        { 
                            obtenerComuna?.comunas.map((result, key) => (
                            <option value={result.region} key={key}>{result}</option>
                            ))
                        }
                    </select>

                    {errors?.comuna?.type === 'required' && <span className='font-bold text-red-400'>Seleccione una comuna</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="codpostal" className="text-gray-800">Código postal:</label>
                    <input id="codpostal" type="number" min="0" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Código postal" 
                    {...register("codpostal", { required: true, min: 1 })}
                    value={codpostal}
                    onChange={ (e) => setCodpostal(e.target.value)} 
                    />

                    {errors?.codpostal?.type === 'required' && <span className='font-bold text-red-400'>El código postal es obligatorio</span>}
                    {errors?.codpostal?.type === 'min' && <span className='font-bold text-red-400'>El código postal debe ser mayor a 0</span>}
                </div>
               
                <input type="submit" className='bg-pink-700 w-full p-3 text-white uppercase rounded-lg font-bold hover:bg-pink-800 cursor-pointer transition-all'value="Agregar Paciente"/>

            </form>
            
        </div>
    )
}

export default Formulario


