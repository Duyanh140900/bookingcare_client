import React, { createRef, useEffect, useState } from "react";
import { baseUrl } from "../../utils/domain";
import { pathApi } from "../../utils";
import axios from "axios";
import "./styles/UserManage.scss";
import ModalAddUser from "../../components/modals/ModalAddUser";

export default function UserManage() {
  const [listUsers, setListUsers] = useState([]);
  const modalAddUser = createRef();

  useEffect(() => {
    getuser();
  }, []);
  const getuser = () => {
    let url = baseUrl + pathApi.GET_USER;
    axios
      .get(url, { params: { id: "all" } })
      .then((res) => {
        const { error_code, data } = res.data;
        if (error_code == 0 && data) {
          setListUsers(data);
        }
      })
      .catch((e) => {
        console.log("err getUser", e);
      });
  };

  const handleAddUser = (data) => {
    let url = baseUrl + pathApi.CREATE_USER;
    // console.log("handleAddUser", handleAddUser);
    axios
      .post(url, data)
      .then((res) => {
        console.log("resss", res.data);
        modalAddUser.current?.closeModal();
      })
      .catch((e) => {
        console.log("err adduser", e);
      });
  };

  const deleteUser = (e) => {
    console.log("deleteUserdeleteUser", e.target.id);
  };

  return (
    <div className="">
      <button
        onClick={() => modalAddUser.current?.openModal()}
        className="add_user"
      >
        Add new user
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Adress</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Gender</th>
            <th scope="col">RoleId</th>
            <th scope="col">PositionId</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.gender}</td>
                <td>{item.roleId}</td>
                <td>{item.positionId}</td>
                <td>
                  <button>Edit</button>
                  <button id={item.id} onClick={deleteUser}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalAddUser ref={modalAddUser} handleAddUser={handleAddUser} />
    </div>
  );
}
