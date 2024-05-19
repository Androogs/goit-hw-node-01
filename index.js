// Importación del paquete "yargs" para analisis de argumentos
const argv = require("yargs").argv;

// Importación de funciones desde contacts.js
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

// Invocando funciones desde contacct.js
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts((err, contacts) => {
        if (err) {
          return console.error("Error leyendo contactos:", err);
        }
        console.log("Contactos:", contacts);
      });
      break;

    case "get":
      getContactById(id, (err, contact) => {
        if (err) {
          return console.error("Error obteniendo contacto:", err);
        }
        console.log("Contacto encontrado:", contact);
      });
      break;

    case "add":
      addContact(name, email, phone, (err, contact) => {
        if (err) {
          return console.error("Error añadiendo contacto:", err);
        }
        console.log("Contacto añadido:", contact);
      });
      break;

    case "remove":
      removeContact(id, (err, result) => {
        if (err) {
          return console.error("Error eliminando contacto:", err);
        }
        console.log(result.message);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Invocar acción con argumentos de la línea de comandos
invokeAction(argv);
