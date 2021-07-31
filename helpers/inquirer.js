const inquirer = require('inquirer');
require('colors')

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Qué desea hacer',
        choices: [
            {
                value: '1',
                name: `${ '1.'.red } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.red } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.red } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.red } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.red } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.red } Eliminar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.red } Salir`
            },
        ]
    }
];


const inquirerMenu =  async () => {
    console.clear();
    
    console.log('========================='.cyan);
    console.log('  Seleccione una opción'.white);
    console.log('=========================\n'.cyan);

    const { option } = await inquirer.prompt( questions );

    return option;

}

const pausa = async () => {
    const continuar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'Enter'.cyan } para continuar`
        }
    ]
    
    console.log('\n');
    await inquirer.prompt( continuar );
}

const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt( question );

    return desc;
}

const listadoTareasEliminar = async ( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.white;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.white + ' Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Eliminar'.red,
            choices
        }
    ];

    const { id } = await inquirer.prompt( questions );

    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message.white
        }
    ];

    const { ok } = await inquirer.prompt( question );

    return ok;
}

const mostrarListadoChecklist = async ( tareas = [] ) => {
    
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.white;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones'.white,
            choices
        }
    ];

    const { ids } = await inquirer.prompt( questions );

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasEliminar,
    confirmar,
    mostrarListadoChecklist
}