import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
    description: "",
  });
  const navigate = useNavigate();
 
  useEffect(() => {
    axios
      .get("http://localhost:8081/getrecord/" + id)
      .then((res) =>
        setValues((values)=>({
          ...values,
          publisher: res.data[0].publisher,
          name: res.data[0].name ,
          date: res.data[0].date ,
          description: res.data[0].description,
        }))
      )
      .catch((err) => console.log(err));
  }, [id]);
   const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/update/"+id, values)
      .then((res) => navigate("/book"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center flex-column ">
      
      <form className="w-50 bg-white rounded p-3" onSubmit={handleSubmit}>
      <h1 className="border-bottom pb-2 d-flex justify-content-center">Update Book</h1>
        <div className="mb-3 mt-3">
          <label htmlFor="er" className="form-label">
           <strong>Publisher:</strong> 
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter Publisher Name"
            name="publisher"
            value={values.publisher}
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
           <strong> Book Name:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Book Name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
           <strong>Publish Date:</strong> 
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           <strong>Description:</strong> 
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
