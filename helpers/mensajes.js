require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log("=========================".cyan);
    console.log("  Seleccione una opción".cyan);
    console.log("=========================\n".cyan);

    console.log(`${"1.".red} Crear tarea`);
    console.log(`${"2.".red} Listar tareas`);
    console.log(`${"3.".red} Listar tareas completadas`);
    console.log(`${"4.".red} Listar tareas pendientes`);
    console.log(`${"5.".red} Completar tarea(s)`);
    console.log(`${"6.".red} Eliminar tarea`);
    console.log(`${"0.".red} Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausar = () => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(`\nPresione ${"Enter".cyan} para continuar\n`, (opt) => {
    readline.close();
  });
};

module.exports = {
  mostrarMenu,
  pausar,
};
