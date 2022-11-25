// npm i react-hook-form yup @hookform/resolvers --- validacion de forms
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"; // para agregar un post nuevo y asignar a cual tabla de la db debe ser asignado
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  const schema = yup.object().shape({
    description: yup.string().required("You must add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <div className="post-box">
    <form onSubmit={handleSubmit(onCreatePost)}>
      <div className="post-input"> 
      <img
              src={user?.photoURL || ""}
              width="50"
              height="50"
              alt="your pic"
            />
      <textarea placeholder="What's happening?" {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      </div>
      <button type="submit" className="submitForm"> Post </button>
    </form>
    </div>
  );
};
