import { useEffect, useState } from "react";
import OrderList from "./components/OrderList";
import OrderTotal from "./components/OrderTotal";
import DeleteModal from "./components/DeleteModal"
import { data } from './data'

function App() {
  const [store, setStore] = useState(null)
  const [summary, setSummary] = useState({
    totalItems: 0,
    totalAmount: 0,
    discount: 0,
    typeDiscount: 0,
  })
  const [deletedItems, setDeletedItems] = useState([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('store')){
      let p = JSON.parse(localStorage.getItem('store'))
      setStore(p)
      p = JSON.parse(localStorage.getItem('summary'))
      setSummary(p)
      p = localStorage.getItem('deletedItems')
      if(p){
        console.log(typeof p);
        p = JSON.parse(p)
        if(p){
          console.log(typeof p);
          setDeletedItems(p)
        }
        else{
          setDeletedItems([])
        }
      }
    }
    else{
      setStore(data)
      console.log(data);
    }
  }, [])

  useEffect(() => {
    if(store){
      let totalItems = 0, totalAmount = 0, discount = 0, typeDiscount = 0
      store.forEach(item => {
        if(!deletedItems.includes(item.id)){
          totalItems += item.amount
          totalAmount += item.price * item.amount
          discount = item.discount * item.amount
          if(item.type === "fiction"){
            typeDiscount += 0.15 * totalAmount
          }
        }
      })
      setSummary({ totalItems, totalAmount, discount, typeDiscount})
      localStorage.setItem('store', JSON.stringify(store))
    }
  }, [store, deletedItems])
  
  useEffect(() => {
    if(summary){
      localStorage.setItem('summary', JSON.stringify(summary))
    }
  }, [summary])

  useEffect(() => {
    localStorage.setItem('deletedItems', deletedItems)
  }, [deletedItems])

  const addItem = id =>{
    let storeCopy = store
    storeCopy = storeCopy.map(item => {
      if(item.id === id){
        return {
          ...item,
          amount: item.amount+1
        }
      }
      return item
    })
    setStore(storeCopy)
  }

  const removeItem = id =>{
    let storeCopy = store
    storeCopy = storeCopy.map(item => {
      if(item.id === id){
        return {
          ...item,
          amount: item.amount-1
        }
      }
      return item
    })
    setStore(storeCopy)
  }

  const deleteItem = id => {
    let storeCopy = store
    storeCopy = storeCopy.filter(item => item.id !== id)
    setStore(storeCopy)
    let deletedItemsCopy = deletedItems
    deletedItemsCopy.push(id)
    setDeletedItems(deletedItemsCopy)
    localStorage.setItem('deletedItems', JSON.stringify(deletedItems))
    setOpenModal(true)
  }

  const onClickReload = () => {
    setStore(data)
    setDeletedItems([])
  }

  return (
    <div className="container">
      {
        store && store.length && summary ?
        <>
          <OrderList store={store} summary={summary} addItem={addItem} removeItem={removeItem} deleteItem={deleteItem} />
          <OrderTotal summary={summary} />
        </> : <button className="reload" onClick={onClickReload}>Reload Original Data</button>
      }
      {
        openModal &&
        <DeleteModal close={() => setOpenModal(false)} />
      }
    </div>
  );
}

export default App;
