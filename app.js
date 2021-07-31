require("colors");

const { guardarDB, leerDB } = require("./helpers/interacturarDB.js");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasEliminar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer.js");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    //estableser tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2": // listar todas
        tareas.listadoCompleto();
        break;

      case "3": // listar completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": //Listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": //completado o pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6": //Eliminar
        const id = await listadoTareasEliminar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Está seguro?");

          if (ok) {
            tareas.eliminarTarea(id);
            console.log("Tarea eliminada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");

  //await pausar()
};

main();
