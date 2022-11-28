import { Meteor } from 'meteor/meteor';
import { PacientesCollection } from '/imports/api/PacientesCollection';

const insertarPaciente = pacienteNombre => PacientesCollection.insert({ nombre: pacienteNombre });

Meteor.startup(() => {
  if (PacientesCollection.find().count() === 0) {
    [].forEach(insertarPaciente)
  }
});

