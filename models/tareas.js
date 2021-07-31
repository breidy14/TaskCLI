const Tarea = require('./tarea.js');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );

        });

        return listado;
    }
    
    constructor() {

        this._listado = {};
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea ( desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        //const listado = this.listadoArr
        //let i = 1;
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            /* Como lo hizo el profesor */
            const idx = `${i + 1}`.white;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            console.log(`${idx}. ${desc.white} :: ${ estado }`);

            /* como lo hice con pequeño arreglo
            const idx = `${i + 1}`.white;
    
            if (tarea.completadoEn !== null){
                console.log(`${idx}. ${tarea.desc} :: ${ 'Completada'.cyan }`);
            }else{
                console.log(`${idx}. ${tarea.desc} :: ${ 'Pendiente'.red }`)
            }
    
            //i++ */
        })
    }

    listarPendientesCompletadas = ( completadas = true) => {
        
        console.log();
        let i = 0;
        
        this.listadoArr.forEach( (tarea, i) =>{

            
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            
            if ( completadas ) {

                if ( completadoEn ){
                    i += 1;
                    console.log(`${i.toString().white}. ${desc.white} :: ${ completadoEn.white }`);
                }
            } else {
                if ( !completadoEn ){
                    i += 1;
                    console.log(`${i.toString().white}. ${desc.white} :: ${ estado }`);
                }
            }
        })
    }
    
    toggleCompletadas (ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id]; 
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea =>{
            if ( !ids.includes(tarea.id )) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

    eliminarTarea ( id = ''){
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }
}

module.exports =  Tareas;