import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { Link, useParams } from 'react-router-dom'

const View = () => {
    const {id}=useParams();
    const [books,setBooks]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8081/view/'+id)
        .then(res => {
            console.log(res)
            setBooks(res.data)
        })
        .catch(err => console.log(err))
    },[])

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
      <h2 className="border-bottom pb-2 d-flex justify-content-center">Book Detail</h2>
        <h6 className="mt-2">BookID:</h6>
        <p className="border-bottom pb-2">{books[0]?.id}</p>
        <h6 className="mt-3">Publisher:</h6>
        <p className="border-bottom pb-2">{books[0]?.publisher}</p>
        <h6 className="mt-3">BookName:</h6>
        <p className="border-bottom pb-2">{books[0]?.name}</p>
        <h6 className="mt-3">Date:</h6>
        <p className="border-bottom pb-2">{books[0]?.date}</p>
        <h6 className="mt-3">Description:</h6>
        <p>{books[0]?.description}</p>
      
        
        <Link to="/book" className="btn btn-primary ">Back</Link>

      </div>
    </div>
  )
}

export default View
