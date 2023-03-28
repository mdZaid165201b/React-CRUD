import { useState, useEffect } from "react";
import { Button, Stack, Modal } from "react-bootstrap";
const EditModal = ({ show, onHide, userID }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      let response = await fetch("/api/user/" + userID);
      response = await response.json();
      console.log(response);
      setUser(response);
    };
    fetchUser();
  }, [userID]);

  useEffect(() => {
    if (user) {
      setAge(user.age);
      setName(user.name);
    }
  }, [user]);
  const handleSubmit = async() => {
    let response = await fetch("/api/update/"+userID,{
        method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({name,age})
    });
    response = await response.json();
    onHide(false)
    console.log(response);
  };
  return (
    <Modal
      show={show}
      onHide={() => onHide(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="">Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}

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
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit}
          className="d-flex justify-content-center"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
