import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Card from './utils/Card'
import styles from './resources/styles.module.css'
function App() {
  const [data, setData] = useState({})
  const [search, setSearch] = useState('')
  const [tagSearch, setTagSearch] = useState('')
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      var persons = res.data
      persons.tagObj = {}
      setData(persons)
    })
  }, [])

  const onSearch = (event, id) => {
    if (id === 1) setSearch(event.target.value)
    else setTagSearch(event.target.value)
  }

  const renderCard = (data) => {
    const cardList = Object.entries(data).map((val, i) => {
      if (val['0'] === 'tagObj') return <></>

      const name = val['1']['name'].split(' ')

      if (search === '' && tagSearch === '') {
        return <Card key={i} val={val} data={data} setData={setData} vkey={i} />
      } else if (search.length > 0 && tagSearch.length === 0) {
        if (
          name[0].substr(0, search.length).toUpperCase() ===
            search.toUpperCase() ||
          name[1].substr(0, search.length).toUpperCase() ===
            search.toUpperCase()
        )
          return (
            <Card key={i} val={val} data={data} setData={setData} vkey={i} />
          )
      } else if (search.length === 0 && tagSearch.length !== 0) {
        if (data['tagObj'] === {} || data.tagObj[val['1'].name] === undefined) {
          return <></>
        }
        for (let tag in data.tagObj[val['1'].name]) {
          if (
            tagSearch ===
            data.tagObj[val['1'].name][tag].substr(0, tagSearch.length)
          ) {
            return (
              <Card key={i} val={val} data={data} setData={setData} vkey={i} />
            )
          }
        }
      } else {
        if (data['tagObj'] === {} || data.tagObj[val['1'].name] === undefined)
          return <></>
        let s = false,
          ts = false
        if (
          name[0].substr(0, search.length).toUpperCase() ===
            search.toUpperCase() ||
          name[1].substr(0, search.length).toUpperCase() ===
            search.toUpperCase()
        )
          s = true
        for (let tag in data.tagObj[val['1'].name]) {
          if (
            tagSearch ===
            data.tagObj[val['1'].name][tag].substr(0, tagSearch.length)
          ) {
            ts = true
          }
        }
        if (s && ts)
          return (
            <Card key={i} val={val} data={data} setData={setData} vkey={i} />
          )
      }
    })
    return cardList
  }

  return (
    <Fragment>
      <input
        type="input"
        placeholder="Search by name"
        className={styles.search_input}
        onChange={(event) => onSearch(event, 1)}
      ></input>
      <input
        type="input"
        placeholder="Search by tag"
        className={styles.search_input}
        onChange={(event) => onSearch(event, 2)}
      ></input>
      {renderCard(data)}
    </Fragment>
  )
}

export default App
