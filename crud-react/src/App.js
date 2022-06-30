import React from "react";
import { useState } from "react";
import UserTable from "./components/UserTable";
import { v4 as uuidv4 } from "uuid";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";

function App() {

  const usersData = [
    { id: uuidv4(), name: "Tania", username: "Taniathebest" },
    { id: uuidv4(), name: "Maria", username: "TCasal" },
    { id: uuidv4(), name: "Victoria", username: "Mamadeagustin" }
  ]

    //state, aca hay un estado que tiene informacion adicional
    const [users, setUsers] = useState(usersData);

  //creamos ahora el usuario
    const addUser = user => {
      user.id = uuidv4()
      setUsers([...users, user])
    }

    //eliminar usuarios
    const deleteUser = (id) => {
        //  console.log(id)
        //le pregunto, si es igual que lo saque sino que lo deje.
         const arrayFiltrado = users.filter(user => user.id !== id)
        
         setUsers(arrayFiltrado)
    }

    //Editar usuarios
   const [editing, setEditing] = useState(false);
   //en falso porque quiero que aparezca un formulario o el otro
   const [currentUser, setCurrentUser] = useState({
     id: null, name: "", username: ""
   })
   //van a estar vacios porque tengo que tomarlos desde la tabla cuando lo edite

   const editRow = (user) => {
     setEditing(true);
     setCurrentUser({
       id: user.id, name: user.name, username: user.username
     })
   }

 //vamos a hacer una nueva funcion para que actualice

 const updateUser = (id, updateUser) => {
   setEditing(false);

   setUsers(users.map(user => (user.id === id ? updateUser : user)))
 } //si el id coincide, que actualice el nuevo,sino que me siga trayendo lo que tenia


  return (
     <div className="container">
       <h1>CRUD App whit Hooks</h1>
       <div className="flex-row">
         <div className="flex-large">
           {
            editing ? (
             <div>
         <h2>Edit user</h2>
           <EditUserForm 
           currentUser={currentUser}
           updateUser={updateUser}
           />
           </div>
           ) : <div>
             <h2>Add user</h2>
           <AddUserForm addUser={addUser}/>
             </div>
          }
           
         </div>
         <div className="flex-large">
           <h2>View users</h2>
           <UserTable users={users}
            deleteUser={deleteUser}
            editRow={editRow} />
         </div>
       </div>
     </div>
  );
}

export default App;
