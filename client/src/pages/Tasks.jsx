import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTasksQuery } from "../redux/slices/api/taskApiSlice";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const location = useLocation();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";
  const { data, isLoading, refetch } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  useEffect(() => {
    // Refetch data when the location changes to '/tasks'
    if (location.pathname === '/tasks') {
      refetch();
    }
  }, [location, refetch]);

  const refetchStatusTasks = (status) => {
    refetch({
      strQuery: status,
      isTrashed: "",
      search: "",
    });
  };

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 text-[#fff]">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-[#2B2A4C] text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle
              label="To Do"
              className={TASK_TYPE.todo}
              onClick={() => refetchStatusTasks('todo')}
            />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
              onClick={() => refetchStatusTasks('in progress')}
            />
            <TaskTitle
              label="Completed"
              className={TASK_TYPE.completed}
              onClick={() => refetchStatusTasks('completed')}
            />
          </div>
        )}

        {data?.tasks?.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            No tasks available 🚫📝
          </div>
        ) : selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
