import React from "react";
import { useForm } from "react-hook-form";

const EditUserForm = (props) => {

    // console.log(props.currentUser)

    const {register, errors, handleSubmit, setValue} = useForm({
        defaultValues: props.currentUser
        //para pasarle por defecto los valores
    });

    setValue("name", props.currentUser.name);
    setValue("username", props.currentUser.username);

    const onSubmit = (data, e) => {
        console.log(data)
       data.id = props.currentUser.id
     //la data contiene lo que paso por input
        props.updateUser(props.currentUser.id, data)
        //limpiar campos
        e.target.reset();
    }

    return(
          <form onSubmit={handleSubmit(onSubmit)}>
              <label>Nombre</label>
              <input type="text" name="name" {...register('name', { required: true })}/>
              <div>
                  {errors?.name?.message}
              </div>
              <label>Username</label>
              <input type="text" name="username"{...register('username', { required: true, message:"campo requerido" })} />
              <div>
                  {errors?.username?.message}
              </div>
              <button>Editar usuario</button>
          </form>
    );
}

export default EditUserForm;