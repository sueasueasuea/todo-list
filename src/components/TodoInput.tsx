import { Fab } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useAppDispatch } from "../app/hook";
import { addTask } from "../app/features/task/taskSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const TodoInput = () => {
  const [isAddDesc, setIsAddDesc] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const schema = yup.object({
    title: yup.string().required("required."),
    description: yup
      .string()
      .when("$isAddDesc", ([isAddDesc], schema) =>
        isAddDesc ? schema.required("required.") : schema
      ),
  });
  type FormData = yup.InferType<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    context: { isAddDesc },
  });

  const onSubmit = (data: FormData) => {
    dispatch(
      addTask({
        title: data.title,
        description: data.description,
        status: "todo",
      })
    );
    reset(); // Reset the form
    setIsAddDesc(false); // Reset the add description flag
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 justify-center w-full">
        <div className="flex flex-col gap-4">
          <TextField
            {...register("title")}
            helperText={errors.title?.message}
            error={errors.title ? true : false}
            autoComplete="off"
            fullWidth
            sx={{ width: 600 }}
            id="outlined-basic"
            label="Title task"
            color="primary"
            placeholder="Add task title"
            variant="outlined"
          />

          {isAddDesc ? (
            <div className="flex items-center gap-4">
              <Fab
                size="small"
                aria-label="add"
                onClick={() => {
                  setIsAddDesc(false), resetField("description");
                }}
              >
                <RemoveIcon />
              </Fab>
              <TextField
                {...register("description")}
                helperText={errors.description?.message}
                error={errors.description ? true : false}
                autoComplete="off"
                fullWidth
                sx={{ width: 544 }}
                id="outlined-basic"
                label="Task Description"
                multiline
                color="primary"
                variant="outlined"
                placeholder="Add task description"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 h-[56px]">
              <Fab
                type="button"
                size="small"
                aria-label="add"
                onClick={() => setIsAddDesc(true)}
              >
                <AddIcon />
              </Fab>
              <p>Add description (optional)</p>
            </div>
          )}
        </div>
        <Fab type="submit" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </form>
  );
};

export default TodoInput;
