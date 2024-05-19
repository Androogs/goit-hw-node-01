///Importación de módulos para trabajar con sistemas.
const fs = require("fs");
const path = require("path");

// Ruta al archivo contacts.json
const contactsPath = path.join(__dirname, "contacts.json");

// Listar todos los contactos
function listContacts(callback) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      return callback(err, null);
    }
    try {
      const contacts = JSON.parse(data);
      callback(null, contacts);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
}

// Obtener un contacto por ID
function getContactById(contactId, callback) {
  listContacts((err, contacts) => {
    if (err) {
      return callback(err, null);
    }
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      return callback(new Error("Contact not found"), null);
    }
    callback(null, contact);
  });
}

// Añadir un nuevo contacto
function addContact(name, email, phone, callback) {
  listContacts((err, contacts) => {
    if (err) {
      return callback(err);
    }
    const newContact = { id: contacts.length + 1, name, email, phone };
    contacts.push(newContact);
    fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      (writeErr) => {
        if (writeErr) {
          return callback(writeErr);
        }
        callback(null, newContact);
      }
    );
  });
}

// Eliminar un contacto por ID
function removeContact(contactId, callback) {
  listContacts((err, contacts) => {
    if (err) {
      return callback(err);
    }
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    if (newContacts.length === contacts.length) {
      return callback(new Error("Contact not found"));
    }
    fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      (writeErr) => {
        if (writeErr) {
          return callback(writeErr);
        }
        callback(null, { message: "Contact deleted" });
      }
    );
  });
}

// Exportación las funciones
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
