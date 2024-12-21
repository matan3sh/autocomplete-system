import { Recipe } from '../App'

export const fetchSuggestions = async (query: string): Promise<Recipe[]> => {
  const response = await fetch(
    `https://dummyjson.com/recipes/search?q=${query}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await response.json()
  return data.recipes
}
