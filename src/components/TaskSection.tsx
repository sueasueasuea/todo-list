import { useState } from "react";
import TaskCard from "./TaskCard";
import { useAppSelector } from "../app/hook";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

type Status = "all" | "incomplete" | "completed";
const TaskSection = () => {
  const taskList = useAppSelector((state) => state.tasks);
  const todoList = taskList.filter((task) => task.status === "todo");
  const doingList = taskList.filter((task) => task.status === "incomplete");
  const doneList = taskList.filter((task) => task.status === "completed");
  const [status, setStatus] = useState<Status>("all");
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  };
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex justify-end">
        <div className="flex flex-col gap-2">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            color="primary"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="incomplete">Doing</MenuItem>
            <MenuItem value="completed">Done</MenuItem>
          </Select>
        </div>
      </div>
      {status === "all" && (
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[20px] underline underline-offset-4 decoration-wavy decoration-[#CE93D8]">
              To do
            </p>
            ({todoList.length})
          </div>

          {todoList.map((task) => {
            return <TaskCard key={task.id} id={task.id} task={task} />;
          })}
        </div>
      )}

      {status !== "completed" ? (
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[20px] underline underline-offset-4 decoration-wavy decoration-[#CE93D8]">
              Doing
            </p>
            ({doingList.length})
          </div>

          {doingList.map((task) => {
            return <TaskCard key={task.id} id={task.id} task={task} />;
          })}
        </div>
      ) : null}
      {status !== "incomplete" && (
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[20px] underline underline-offset-4 decoration-wavy decoration-[#CE93D8]">
              Done
            </p>
            ({doneList.length})
          </div>

          {doneList.map((task) => {
            return <TaskCard key={task.id} id={task.id} task={task} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
