import { useAnecdotesControls } from "../store"

const Filter = () => {
  const { setFilter } = useAnecdotesControls()

  const handleChange = (event) => {
    const filter = event.target.value

    setFilter(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter" />
    </div>
  )
}

export default Filter
