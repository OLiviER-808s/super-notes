import { createContext, useContext, useState } from "react"

const ItemsContext = createContext<any>(null)
const SetItemsContext = createContext<any>(null)

export const useItems = () => {
  const items = useContext(ItemsContext)
  const setItems = useContext(SetItemsContext)

  const notes = items.filter(item => item.type === 'note')
  const folders = items.filter(item => item.type === 'folder')

  const selectedItems = items.filter(item => item.selected)
  const selectedNotes = items.filter(item => item.type === 'note' && item.selected)
  const selectedFolders = items.filter(item => item.type === 'folder' && item.selected)

  const notesWithAudio = items.filter(item => item.type === 'note' && !!item.audioRef)

  const selectItem = (id) => {
    setItems(items.map(item => ({ ...item, selected: item.id === id ? true : item.selected })))
  }

  const deselectItem = (id) => {
    setItems(items.map(item => ({ ...item, selected: item.id === id ? false : item.selected })))
  }

  const toggleItemSelect = (id) => {
    setItems(items.map(item => ({ ...item, selected: item.id === id ? !item.selected : item.selected })))
  }

  const selectAll = () => {
    setItems(items.map(item => ({ ...item, selected: true })))
  }

  const deselectAll = () => {
    setItems(items.map(item => ({ ...item, selected: false })))
  }

  const updateItems = (docs, type) => {
    setItems(prev => {
      const updatedItems = docs.map(doc => {
        const selected = prev.filter(i => i.id === doc.id)[0]?.selected || false

        return { ...doc.data(), id: doc.id, selected: selected, type: type }
      })

      return [ ...prev.filter(item => item.type !== type), ...updatedItems ]
    })
  }

  const changeColor = (color) => {
    setItems(items.map(item => {
      if (item.selected) return { ...item, color: color }
      else return item
    }))
  }

  return { 
    items, 
    notes, 
    folders, 
    selectedItems,
    selectedNotes,
    selectedFolders,
    notesWithAudio,
    setItems, 
    selectItem,
    deselectItem,
    toggleItemSelect,
    updateItems, 
    selectAll, 
    deselectAll,
    changeColor
  }
}

const ItemsProvider = ({ children }: any) => {
  const [items, setItems] = useState([])

  return (
    <ItemsContext.Provider value={items}>
      <SetItemsContext.Provider value={setItems}>
        { children }
      </SetItemsContext.Provider>
    </ItemsContext.Provider>
  )
}

export default ItemsProvider