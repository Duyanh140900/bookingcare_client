import React, { createRef, useRef, useState } from "react";
import Modal from "react-modal";
import "./styles/ModalAddUser.scss";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};

const ModalAddUser = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  Modal.setAppElement("body");

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const inputFile = createRef();
  const defaultValue = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    numberPhone: "",
    gender: 1,
    roleId: 1,
  };
  const [data, setData] = useState(defaultValue);

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [numberPhone, setNumberPhone] = useState("");
  //   const [gender, setGender] = useState(1);
  //   const [roleId, setRoleId] = useState(1);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    props?.handleAddUser(data);
  };

  const onValueInputChange = (type, value) => {
    let newData = { ...data };
    newData[type] = value;
    setData(newData);
  };

  const onChangeFile = () => {};

  const {
    email,
    password,
    firstName,
    lastName,
    address,
    numberPhone,
    gender,
    roleId,
  } = data;

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className="text-center mb-4">Add new user</h1>
        <form>
          <div class="row mb-4">
            <div class="col-6 input-form">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => onValueInputChange("email", e.target.value)}
                type="text"
                name="email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="col-6 input-form">
              <label>Password</label>
              <input
                onChange={(e) => onValueInputChange("password", e.target.value)}
                value={password}
                type="text"
                name="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-6 input-form">
              <label>First name</label>
              <input
                onChange={(e) =>
                  onValueInputChange("firstName", e.target.value)
                }
                value={firstName}
                name="firstname"
                type="text"
                class="form-control"
                placeholder="First name"
              />
            </div>
            <div class="col-6 input-form">
              <label>Last name</label>
              <input
                onChange={(e) => onValueInputChange("lastName", e.target.value)}
                value={lastName}
                type="text"
                name="lastname"
                class="form-control"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div class="col-12 input-form">
              <label>Address</label>
              <input
                onChange={(e) => onValueInputChange("address", e.target.value)}
                value={address}
                name="address"
                type="text"
                class="form-control"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="row mb-5">
            <div class="col-4 input-form">
              <label>NumberPhone</label>
              <input
                onChange={(e) =>
                  onValueInputChange("numberPhone", e.target.value)
                }
                value={numberPhone}
                name="numberphone"
                type="number"
                class="form-control"
                placeholder="NumberPhone"
              />
            </div>
            <div class="col-4 input-form">
              <label>Gender</label>
              <select
                onChange={(e) => onValueInputChange("gender", e.target.value)}
                name="gender"
                class="form-control"
              >
                <option selected value={roleId}>
                  male
                </option>
                <option value={2}>female</option>
              </select>
            </div>
            <div class="col-4 input-form">
              <label>RoleId</label>
              <select
                onChange={(e) => onValueInputChange("roleId", e.target.value)}
                name="roleId"
                class="form-control"
              >
                <option value={gender} selected>
                  admin
                </option>
                <option value={2}>doctor</option>
                <option value={3}>patient</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <input
              id="myInput"
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={onChangeFile}
            />
            <button
              onClick={(e) => {
                inputFile?.current?.click();
                e.preventDefault();
              }}
            >
              Choose File
            </button>
          </div>
          <div className="row">
            <div className="col-6 button">
              <button onClick={closeModal} className="btn-action btn-cancel">
                Cancel
              </button>
            </div>
            <div className="col-6 button">
              <button onClick={handleAddUser} className="btn-action btn-add">
                Add
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
});

export default ModalAddUser;
