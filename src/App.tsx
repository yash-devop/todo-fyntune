import { Plus } from "lucide-react";
import { Button } from "./components/ui/Button";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./lib/fetcher";
import { ExtendedTodoSchemaType } from "./lib/types/types";
type FilterType = "all" | "pending" | "completed";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const FILTER_ITEMS = ["all", "pending", "completed"] as FilterType[];

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilterItem, setSelectedFilterItem] =
    useState<FilterType>("all");

  const handleFilter = (value: FilterType) => {
    setSelectedFilterItem(value);
    setSearchParams();

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("filterBy", value);
      return newParams;
    });
  };

  const { data } = useQuery<ExtendedTodoSchemaType[]>({
    queryKey: ["todos", selectedFilterItem],
    queryFn: () => {
      let filterQuery = "";

      if (selectedFilterItem === "pending") {
        filterQuery = "&status=pending";
      } else if (selectedFilterItem === "completed") {
        filterQuery = "&status=completed";
      }
      return fetcher({
        body: "",
        method: "GET",
        path: `/todos?_sort=dueDate&_order=asc${filterQuery}`,
      });
    },
  });

  useEffect(() => {
    const filterFromParams = searchParams.get("filterBy") as FilterType;

    if (filterFromParams && FILTER_ITEMS.includes(filterFromParams)) {
      setSelectedFilterItem(filterFromParams);
    } else {
      setSelectedFilterItem("all");
      setSearchParams((prevParams) => {
        console.log("prevParams", prevParams);
        const newParams = new URLSearchParams(prevParams);
        newParams.set("filterBy", "all");
        return newParams;
      });
    }
  }, [searchParams]);

  return (
    <>
      <div className="max-w-[820px] mx-auto py-10 min-h-screen tracking-tight">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-medium">Tasks {selectedFilterItem}</p>
          <Menu>
            <MenuButton
              className={
                "transition-all outline-[3px] outline-primary/40  border border-primary px-4 py-1.5 rounded-lg cursor-pointer"
              }
            >
              Filter
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="my-1 w-[110px] border border-border rounded-md"
            >
              {FILTER_ITEMS.map((item) => (
                <MenuItem>
                  <p
                    onClick={() => handleFilter(item)}
                    className="block bg-accent px-4 py-2 rounded-lg hover:text-primary cursor-pointer capitalize"
                  >
                    {item}
                  </p>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
        <div className="flex flex-col gap-2 my-10">
          <TodoList todos={data} />
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary-foreground w-fit gap-2 text-black/50 hover:text-primary hover:bg-transparent cursor-pointer items-center"
            variant={"ghost"}
          >
            <Plus size={15} className="mt-0.5 text-primary" />
            Add Task
          </Button>
          {open && <Modal open={open} setOpen={setOpen} type="add" />}
        </div>
      </div>
    </>
  );
}

export default App;
