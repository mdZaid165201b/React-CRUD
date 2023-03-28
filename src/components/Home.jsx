import { useEffect, useState } from "react";
import { Table, Button, Stack } from "react-bootstrap";
import EditModal from "./EditModal";

const Home = () => {
  const [users, setUser] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleEdit = (id) => {
    setShowModal(true); 
    setSelectedUserId(id);
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSubmit = async () => {
    try {
      console.log(name, age);
      let response = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
      response = await response.json();
      setName("");
      setAge("");
      fetchUsers();
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDelete = async (id) => {
    let response = await fetch("/api/delete/" + id, {
      method: "DELETE",
    });
    response = await response.json();
    console.log(response);
    fetchUsers();
  };

  return (
    <div className="container my-5">
      <Stack gap={3}>
        <div>
          <label className="my-1">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="my-1">Age</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Stack>
      <div>
        <h1 className="text-center py-4">User Data</h1>
        <Table variant="bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((currentUser, index) => (
              <tr key={currentUser.id}>
                <th>{currentUser.id}</th>
                <th>{currentUser.name}</th>
                <th>{currentUser.age}</th>
                <th style={{ width: "300px" }}>
                  <Button
                    variant="success"
                    className="mx-2"
                    onClick={() => {
                      handleEdit(currentUser.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-5"
                    onClick={() => handleDelete(currentUser.id)}
                  >
                    delete
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
        {
          <EditModal
            show={showModal}
            onHide={() => setShowModal(false)}
            userID={selectedUserId}
          />
        }
      </div>
    </div>
  );
};

export default Home;
