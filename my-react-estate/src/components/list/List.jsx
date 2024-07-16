import './list.scss'
import Card from"../card/Card.jsx"
// import {listData} from "../../lib/dummyData.js"

function List({posts =[]}){
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List