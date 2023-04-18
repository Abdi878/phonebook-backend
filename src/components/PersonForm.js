const PersonForm = (props) =>{
    return(<form onSubmit={props.addToPage}>
        <div>
          name: <input value={props.newName} onChange={props.addName} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.addNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

export default PersonForm