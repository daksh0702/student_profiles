import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { Row, Col } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import styles from '../resources/styles.module.css'
const Card = ({ val, data, setData, vkey }) => {
  console.log('DATA', data)
  const [dropDown, setDropDown] = useState(false)
  const [tag, setTag] = useState('')
  const [tagArray, setTagArray] = useState([])
  const onClick = () => {
    setDropDown(!dropDown)
  }
  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      var ar = tagArray
      ar.push(tag)
      setTagArray(ar)
      setTag('')
      var ndata = data
      ndata.tagObj[data[`${vkey}`].name] = ar
      setData(ndata)
    }
  }
  const onChange = (event) => {
    setTag(event.target.value)
  }

  return (
    <div className={styles.card_container}>
      <Row>
        <Col span={5}>
          <Avatar
            name={val['1'].name}
            size="160"
            round={true}
            style={{ marginTop: '30px' }}
          />
        </Col>
        <Col span={15}>
          <div className={styles.card_center_container}>
            {val['1'].name}
            <div className={styles.card_main_content}>
              Email: {val['1'].email}
              <br />
              Company: {val['1']['company']['name']}
              <br />
              Skill: {val['1']['company']['bs']}
              <br />
              Average: N/A
              {dropDown && (
                <div style={{ marginTop: '20px' }}>
                  Test1: 80% <br />
                  Test2: 80% <br />
                  Test3: 80% <br />
                  Test4: 80% <br />
                  Test5: 80% <br />
                  Test6: 80% <br />
                  Test7: 80% <br />
                  Test8: 80% <br />
                  <br />
                  {data.tagObj[val['1'].name] !== undefined &&
                    data.tagObj[val['1'].name].length > 0 &&
                    data.tagObj[val['1'].name].map((val, i) => (
                      <div
                        key={`${data.tagObj[val['1'].name]}` + i}
                        className={styles.input_tag_container}
                      >
                        {val}
                      </div>
                    ))}
                  <div>
                    <input
                      type="input"
                      placeholder="Add a tag"
                      className={styles.input_tag}
                      onChange={(event) => onChange(event)}
                      onKeyDown={(event) => onKeyDown(event)}
                      value={tag}
                    ></input>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.plus_minus_button_pos}>
            {!dropDown && (
              <PlusOutlined
                className={styles.plus_minus_button}
                onClick={onClick}
              />
            )}
            {dropDown && (
              <MinusOutlined
                className={styles.plus_minus_button}
                onClick={onClick}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Card
