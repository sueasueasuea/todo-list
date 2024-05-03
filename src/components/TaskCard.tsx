import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Task } from "../app/features/task/taskSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { useAppDispatch } from "../app/hook";
import { deleteTask, updateTask } from "../app/features/task/taskSlice";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";

const CustomCardActions = styled(CardActions)({
  "& > :not(style) ~ :not(style)": {
    marginLeft: "0px",
  },
});

const TaskCard = ({ task, id }: { task: Task; id: string }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteTask({ id }));
    handleClose();
  };
  return (
    <Fragment key={id}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this task?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{
          minWidth: 672,
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              overflow: "hidden", // Prevents text from spilling outside its container
              whiteSpace: "nowrap", // Keeps the text on a single line
              textOverflow: "ellipsis", // Adds an ellipsis at the end if the text overflows
              width: 400, // Set a specific width to demonstrate overflow (adjust as needed)
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
              textDecorationColor: "#78CFB0",
              color: task.status === "completed" ? "#78CFB0" : "#9E78CF",
            }}
            color="primary"
          >
            {task.title}
          </Typography>
          {task.description ? (
            <Typography
              sx={{
                fontSize: 14,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: 400,
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
                textDecorationColor: "#78CFB0",
                color: task.status === "completed" ? "#FFFFFF" : "",
              }}
              color="primary"
            >
              {task.description}
            </Typography>
          ) : null}
        </CardContent>
        <CustomCardActions className="flex" sx={{ marginLeft: 0 }}>
          {task.status !== "completed" ? (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => dispatch(updateTask({ id, status: "completed" }))}
              size="small"
              className="flex flex-col gap-2"
            >
              <TaskAltIcon color="success" />
              <p className="text-[10px]">Done</p>
            </Button>
          ) : null}

          {task.status === "todo" ? (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => dispatch(updateTask({ id, status: "incomplete" }))}
              size="small"
              className="flex flex-col gap-2"
            >
              <PublishedWithChangesIcon color="info" />
              <p className="text-[10px]">Doing</p>
            </Button>
          ) : null}

          <Button
            sx={{ textTransform: "none" }}
            onClick={() => handleOpen()}
            size="small"
            className="flex flex-col gap-2"
          >
            <DeleteOutlineIcon color="error" />
            <p className="text-[10px]">Delete</p>
          </Button>
        </CustomCardActions>
      </Card>
    </Fragment>
  );
};

export default TaskCard;
