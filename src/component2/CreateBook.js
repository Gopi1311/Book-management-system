import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateBook = () => {
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/create", values)
      .then((res) => navigate("/book"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Add a Book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter Publisher Name"
            name="publisher"
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Book Name"
            name="name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Publish Date:
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            placeholder="Enter description here..."
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

export default CreateBook;
