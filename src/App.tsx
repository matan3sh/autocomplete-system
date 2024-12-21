import { fetchSuggestions } from './actions'
import Autocomplete from './components/Autocomplete'

export type Recipe = {
  id: number
  name: string
}

// const staticData = [
//   'apple',
//   'banana',
//   'orange',
//   'grapes',
//   'mango',
//   'pineapple',
//   'pear',
//   'peach',
//   'plum',
//   'strawberry',
// ]

function App() {
  return (
    <>
      <h1>Autocomplete / Typeahead</h1>
      <Autocomplete<Recipe>
        placeholder="Enter recipe"
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey="name"
        customLoading={<>Loading Recipes...</>}
      />
    </>
  )
}

export default App
