const People = ({ people, filter, remove }) => {
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );
  return (
    <ul>
      {filteredPeople.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => remove(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default People;
