import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userList, setUserList] = useState();
  const [theme, setTheme] = useState("OFF");
  const [sort, setSort] = useState(true);
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUserList();
  }, [sort]);

  const getUserList = async () => {
    try {
      const getUser = await fetch("https://reqres.in/api/users");
      const user = await getUser.json();
      let userData = user.data;
      if (sort === true) {
        const data = userData.sort((a, b) => {
          if (a.first_name < b.first_name) {
            return -1;
          }
          if (a.first_name > b.first_name) {
            return 1;
          }
          return 0;
        });
        setUserList(data);
      } else if (sort === false) {
        const data = userData.sort((a, b) => {
          if (a.first_name > b.first_name) {
            return -1;
          }
          if (a.first_name < b.first_name) {
            return 1;
          }
          return 0;
        });
        setUserList(data);
      } else {
        setUserList(user.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const changeThemeMode = (e) => {
    e.preventDefault();
    let themeMode = e.target.value;
    if (themeMode === "OFF") {
      setTheme("ON");
    } else if (themeMode === "ON") {
      setTheme("OFF");
    } else {
      setTheme("OFF");
    }
  };

  const toggleSort = () => {
    if (!sort) setSort(true);
    else setSort(false);
  };

  const setVisible = (a) => {
    if (!hide) {
      setHide(true);
      clear();
    } else {
      setHide(false);
      clear()
    }

  };

  const clear = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    // setMessage()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && firstName && lastName) {
        const res = await fetch("https://reqres.in/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            firt_name: firstName,
            last_name: lastName,
          }),
        });
        const response = await res;
        if (response.status === 201) {
          setMessage("Successfully data added...");
          clear();
          setTimeout(() => {
            setMessage("");
          }, 1000);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={`App ${theme === "ON" ? "dark-mode" : "light-mode"}`}>
      <div className="right">
        <button
          type="button"
          className={`${theme === "ON" ? "dark-mode" : "light-mode"}`}
          value={theme}
          onClick={(e) => changeThemeMode(e)}
        >
          {theme === "OFF" ? "LIGHT" : "DARK"}
        </button>
      </div>
      <div className="">
        <div className="">
          <p>
            <u>User List</u>
          </p>
        </div>
        <div className="flex">
          <div className="right">
            <button
              className={` sort-btn ${
                theme === "ON" ? "dark-mode" : "light-mode"
              }`}
              onClick={(e) => setVisible(false)}
            >
              Add User
            </button>
          </div>
          <div className="right">
            <button
              className={` sort-btn ${
                theme === "ON" ? "dark-mode" : "light-mode"
              }`}
              onClick={(e) => toggleSort()}
            >
              Sort By Name
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      {!hide && (
          <div className="form-section">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" value="submit">
                Submit
              </button>
            </div>
          </form>
          <p className="center">{message}</p>
        </div>
      )}
    

      <br />
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.length &&
              userList.map((item, pos) => {
                return (
                  <tr key={pos}>
                    <td>
                      <img src={item.avatar} alt="avatatr" />
                    </td>
                    <td>{item.id}</td>
                    <td>{`${item.first_name} ${item.last_name}`}</td>
                    <td>{item.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
