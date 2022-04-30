import React  from 'react'
import {nanoid} from 'nanoid'
import {firebase} from '../firebase'

const Formulario = () => {
    const [nombre, setNombre] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [estudios, setEstudios] = React.useState('')
    const [edad, setEdad] = React.useState('')
    const [idiomas, setIdiomas] = React.useState('')


    const [listaPersonas, setListaPersonas] = React.useState([])
    
    const [id, setId] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
         const obtenerDatos= async () =>{
             try{
                 const db = firebase.firestore()
                 const data = await db.collection('personas').get()
                 const arrayData= data.docs.map(item => (
                     {
                         id:item.id, ...item.data()
                     }
                 ))
                 //console.log(arrayData)

                 listaPersonas(arrayData)

             }catch(error){
                 console.log(error)
             }
         }

         obtenerDatos();
    })


    const guardarInfo = async (e) =>{
        e.preventDefault()

        if(!nombre.trim()){
           setError('Digite el nombre')
            return
        }

        if(!descripcion.trim()){
            setError('Digite su perfil')
            return
        }
        if(!estudios.trim()){
          setError('Digite sus estudios')
          return
        }
        if(!edad.trim()){
          setError('Digite su edad')
          return
        }
        if(!idiomas.trim()){
          setError('Digite idiomas que habla')
          return
        }
        try{
            const db = firebase.firestore()
            const nuevaPersona = {
                nombreNombre: nombre,
                nombreDescripcion: descripcion,
                nombreEstudios: estudios,
                nombreEdad: edad,
                nombreIdiomas: idiomas

            }

            await db.collection('personas').add(nuevaPersona)

            setListaPersonas([
                ...listaPersonas,
                {id:nanoid(), nombreNombre:nombre, nombreDescripcion:descripcion,
                  nombreEstudios: estudios,
                  nombreEdad: edad,
                  nombreIdiomas: idiomas}
            ])

            e.target.reset()
            setNombre('')
            setDescripcion('')
            setEstudios('')
            setEdad('')
            setIdiomas('')
            setError(null)
        }catch(error){
            console.log(error)
        }
        
    }

    const editar = item =>{
      setNombre(item.nombreNombre)
        setDescripcion(item.nombreDescripcion)
        setEstudios(item.nombreEstudios)
        setEdad(item.nombreEdad)
        setIdiomas(item.nombreIdiomas)
        setModoEdicion(true)
        setId(item.id)
    }

    const editarPersonas = async e =>{
        e.preventDefault()

        if(!nombre.trim()){
            setError('Escriba el nombre')
             return
         }
 
         if(!descripcion.trim()){
          setError('Digite su perfil')
          return
      }
      if(!estudios.trim()){
        setError('Digite sus estudios')
        return
      }
      if(!edad.trim()){
        setError('Digite su edad')
        return
      }
      if(!idiomas.trim()){
        setError('Digite idiomas que habla')
        return
      }

         try{
             const db = firebase.firestore()
             await db.collection('personas').doc(id).update({
                nombreNombre:nombre,
                nombreDescripcion: descripcion,
                nombreEstudios: estudios,
                nombreEdad: edad,
                nombreIdiomas: idiomas
            
             })
        
             const arrayEditado = listaPersonas.map(
                item => item.id ===id ? {id:id, nombreNombre:nombre,
                 nombreDescripcion: descripcion,
                 nombreEstudios: estudios,
                 nombreEdad: edad,
                 nombreIdiomas: idiomas}: item
            )
    
            setListaPersonas(arrayEditado)
            setNombre('')
            setDescripcion('')
            setEstudios('')
            setEdad('')
            setIdiomas('')
            setId('')
            setModoEdicion(false)
            setError(null)

         }catch(error){
             console.log(error)
         }

        
    } 

    const eliminar = async id =>{
        try{
            const db = firebase.firestore()
            await db.collection('personas').doc(id).delete()
            const aux = listaPersonas.filter(item => item.id !== id)
            setListaPersonas(aux)
        }catch(error){
            console.log(error)
        }

        
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setNombre('')
        setId('')
        setDescripcion('')
        setEstudios('')
        setEdad('')
        setIdiomas('')

        setError(null)
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>Registro Vacantes  </h1>
        <br/>
        <br/>
        <h4 className='text-center'> Coloque su información personal para recibir nuestras nuevas vacantes laborales</h4>
        <br/>
        <br/>
        <hr/>
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-center'>Editar información</h4>
                <ul className='list-group'>
                    {
                        listaPersonas.map(item=>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombreNombre}-{item.nombreDescripcion}-
                                {item.nombreEstudios}-{item.nombreEdad}-{item.nombreIdiomas}
                                -{item.nombreVacantes}-{item.nombreReferencia}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>
                                Eliminar
                                </button>
                                <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>
                                Editar
                                </button>
                            </li>    
                        ))
                    }
                </ul>
            </div>
            <div className='col-4'>
                <h4 className='text-center'>
                    {
                        modoEdicion ? 'Editar información' : 'Agregar Información Personal'
                    }
                    </h4>
                <form onSubmit ={modoEdicion ? editarPersonas: guardarInfo}>
                    {
                        error ? <span className='text-danger'>{error}</span> : null
                    }
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese nombres'
                    onChange={(e)=> setNombre(e.target.value)}
                    value = {nombre}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Escriba un breve perfil'
                    type="text"
                    onChange={(e)=> setDescripcion(e.target.value)}
                    value={descripcion}
                    />
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese estudios profesionales'
                    onChange={(e)=> setEstudios(e.target.value)}
                    value = {estudios}
                    />
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese edad'
                    onChange={(e)=> setEdad(e.target.value)}
                    value = {edad}
                    />
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese idiomas que habla'
                    onChange={(e)=> setIdiomas(e.target.value)}
                    value = {idiomas}
                    />
                    {
                        modoEdicion ?
                        (
                            <>
                                <button 
                                className='btn btn-warning btn-block'
                                type='submit'
                                >Editar</button>
                                <button 
                                className='btn btn-dark btn-block mx-2'
                                onClick={() => cancelar()}
                                >Cancelar</button>
                            </>
                        )
                        :

                            <button 
                            className='btn btn-primary btn-block'
                            type='submit'
                            >Agregar</button>

                        }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Formulario