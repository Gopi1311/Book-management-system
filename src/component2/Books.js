
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import './book.css' ;

axios.defaults.withCredentials = true;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [ filterText,setFilterText] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/book")
      .then((res) => {
        setBooks(res.data)
        setFilterText(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/profile")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.name);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then(() => setBooks(books.filter((book) => book.id !== id)))
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
      const searchText=e.target.value.toLowerCase();
      const filterText =books.filter((book) => book.publisher.toLowerCase().includes(searchText) || book.name.toLowerCase().includes(searchText));
      setFilterText(filterText);
  }

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center ">
    <div className="container  bg-light p-4 shadow-sm rounded" style={{ marginTop: '-10%' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="profile text-dark text-uppercase d-flex align-items-center fs-5">
          <CgProfile size={30} className="mx-2 text-dark" />
          {name}
        </h2>
       
        <div>
        <Link to="/create" className="btn btn-success btn-sm me-2 ">
            Create Book
          </Link>
          <Link to="/" className="btn btn-danger btn-sm ">
            Logout
          </Link>
        </div>
      </div>
      <div>
      <input type="text" placeholder="🔍 Search Text Here.." onChange={handleSearch} className=" input-field w-25 mb-3 fs-5"/>
      </div>
 
      {books.length > 0 ? (
        <table className="table table-striped">
          <thead className="thead bg-primary" >
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Publisher</th>
              <th scope="col">Book Name</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterText.map((book,index) => (
              <tr key={book.id}>
                <td>{index+1}</td>
                <td>{book.publisher}</td>
                <td>{book.name}</td>
                <td>{book.date}</td>
                <td>
                <Link
                    to={`/view/${book.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    View
                  </Link>
                <Link
                    to={`/update/${book.id}`}
                    className="btn btn-info text-white btn-sm me-2"
                  >
                    Update
                  </Link>
                  
                  <button
                    type="button"
                    onClick={() => handleDelete(book.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Records</h2>
      )}
      </div>
    </div>
  );
};

export default Books;
