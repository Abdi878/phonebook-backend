import { useEffect, useState } from "react";
import People from "./components/People";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import { getAll, create, update, remove } from "./services/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notif, setNotif] = useState("");
  useEffect(() => {
    getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);
  const addFilter = (event) => {
    setFilter(event.target.value);
  };
  const addName = (event) => {
    setNewName(event.target.value);
  };
  const addNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const changeNumber = (duplicate, newPerson) => {
    if (
      window.confirm(
        `${duplicate.name} is already in the phonebook. Would you like to update their number?`
      )
    ) {
      update(duplicate.id, newPerson);
      setPersons(
        persons.map((person) =>
          person.id == duplicate.id ? newPerson : person
        )
      );
      setNotif(`Updated ${newPerson.name}`);
    }
  };
  const addToPage = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const duplicate = persons.filter(
      (person) => person.name === newPerson.name
    )[0];
    if (
      persons.every(
        (person) =>
          JSON.stringify(person.name) !== JSON.stringify(newPerson.name)
      )
    ) {
      create(newPerson).then((res) => setPersons(persons.concat(res.data)));
      setNotif(`Added ${newPerson.name}`);
    } else {
      changeNumber(duplicate, newPerson);
    }
    setNewName("");
    setNewNumber("");
  };

  const removeFromPage = (id) => {
    if (window.confirm("Are you sure you would like to delete this?")) {
      console.log(id);
      console.log(persons.filter((person) => person.id === id));
      remove(id);
      setNotif(`Deleted ${persons.filter((person) => person.id === id)[0].name}`);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} />
      <Filter filter={filter} addFilter={addFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addToPage={addToPage}
        newName={newName}
        addName={addName}
        newNumber={newNumber}
        addNumber={addNumber}
      />
      <h2>Numbers</h2>
      <People people={persons} filter={filter} remove={removeFromPage} />
    </div>
  );
};

export default App;
