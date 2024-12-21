interface SuggestionsListProps<T> {
  dataKey: keyof T
  highlight: string
  suggestions: T[]
  onSuggestionClick: (suggestion: T) => void
}

const SuggestionsList = <T,>({
  dataKey,
  highlight,
  suggestions,
  onSuggestionClick,
}: SuggestionsListProps<T>) => {
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <span>
        {parts.map((part, index) => (
          <span
            key={index}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: 'bold' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    )
  }

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = String(suggestion[dataKey])

        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-item"
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        )
      })}
    </>
  )
}

export default SuggestionsList
