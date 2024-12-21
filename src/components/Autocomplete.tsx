import React, { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import SuggestionsList from './SuggestionsList'

interface AutocompleteProps<T> {
  fetchSuggestions: (query: string) => Promise<T[]>
  dataKey: keyof T
  customLoading: JSX.Element
  onSelect?: (selected: T) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (input: string) => void
  staticData?: T[]
  placeholder?: string
  customStyles?: React.CSSProperties
}

const Autocomplete = <T,>({
  placeholder,
  staticData,
  fetchSuggestions,
  dataKey,
  customLoading,
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customStyles,
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<T[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedValue = useDebounce(inputValue, 500)

  const getSuggestions = useCallback(
    async (query: string) => {
      setError(null)
      setLoading(true)
      try {
        let result: T[] = []
        const queryValue = query.toLowerCase()

        if (staticData) {
          result = staticData.filter((item) => {
            const value = String(item[dataKey]).toLowerCase()
            return value.includes(queryValue)
          })
        } else {
          result = await fetchSuggestions(query)
        }

        setSuggestions(result)
      } catch (e: unknown) {
        setError(`Failed to fetch data: ${JSON.stringify(e)}`)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    },
    [staticData, fetchSuggestions, dataKey]
  )

  useEffect(() => {
    if (debouncedValue.length > 1) {
      getSuggestions(debouncedValue)
    } else {
      setSuggestions([])
    }
  }, [getSuggestions, debouncedValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleSuggestionClick = (suggestion: T) => {
    setInputValue(String(suggestion[dataKey]))
    onSelect?.(suggestion)
    setSuggestions([])
  }

  return (
    <div className="container">
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionsList<T>
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  )
}

export default Autocomplete
