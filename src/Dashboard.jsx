import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { MainTable } from "./components/ui/MainTable";
import Navbar from "./components/ui/Navbar";
import { Cohort, courses, status } from "./constants/constants";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { superbase } from "../createClient";
import CoursesSelectTag from "./components/ui/CoursesSelectTag";
import SelectTag from "./components/ui/SelectTag";

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [filters, setFilters] = useState({
    cohort: "",
    courses: [],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open state
  const [studentData, setStudentData] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    students_Name: "",
    last_login: "",
    date_of_joining: date,
    cohort: "",
    courses: [],
    status: false,
  });

  // Fetch students from the database
  async function fetchUsers() {
    const { data } = await superbase.from("students").select("*");
    setStudentData(data);
    setStudentInfo(data);
  }


  function handleChange(e) {
    setStudentInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSetDate(date) {
    if (!date) return;
    const formattedDate = format(date, "yyyy-MM-dd");
    setDate(formattedDate);
    setStudentInfo((prev) => ({
      ...prev,
      date_of_joining: formattedDate,
    }));
  }

  useEffect(() => {
    setStudentInfo((prev) => ({
      ...prev,
      courses: selectedCourses,
    }));
  }, [selectedCourses]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const currentTimestamp = new Date().toISOString(); 
    const { students_Name, date_of_joining, cohort, status, courses } =
      studentInfo;

    try {
      const { data, error } = await superbase.from("students").insert({
        students_Name,
        last_login: currentTimestamp,
        date_of_joining: date_of_joining,
        cohort,
        courses,
        status,
      });

      if (error) {
        console.error("Error adding student:", error);
        return;
      } else {
        console.log("Student added successfully:", data);
        setIsDialogOpen(false);
        window.location.reload()
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const handleSearchChange = async (value) => {
    const { data, error } = await superbase
      .from("students")
      .select("*")
      .ilike("students_Name", `%${value}%`);
    if (error) {
      console.error("Error fetching data:", error);
      setStudentData([]);
    } else {
      setStudentData(data);
    }
  };
  return (
    <div className="flex flex-col gap-7 h-[90%] px-4 md:px-8">
      <Navbar onSearch={handleSearchChange} />
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Cohort Select */}
          <Select
            onValueChange={async (value) => {
              const { data } = await superbase
                .from("students")
                .select("*")
                .eq("cohort", value);
              setStudentData(data);
            }}
          >
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select a Cohort" />
            </SelectTrigger>
            <SelectContent>
              {Cohort.map((cohort) => (
                <SelectItem key={cohort.name} value={cohort.name}>
                  {cohort.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Courses Select */}
          <Select
            onValueChange={async (value) => {
              const { data, error } = await superbase
                .from("students")
                .select("*")
                .filter("courses", "cs", JSON.stringify([value]));
              if (error) {
                console.error("__errorFetchingData", error);
                setStudentData([]);
                return;
              }
              setStudentData(data || []);
            }}
          >
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select courses" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((cor) => (
                <SelectItem key={cor.name} value={cor.name}>
                  {cor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reload Icon */}
          <RotateCcw
            className="cursor-pointer text-lg md:text-xl"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>

        {/* Add Student Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="flex gap-2">
              <Plus className="text-sm md:text-lg" />
              <h4 className="text-sm md:text-base">Add New Student</h4>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90%] md:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-sm md:text-lg">
                Add New Student
              </DialogTitle>
              <DialogDescription>
                Add Student by filling all the details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {/* Student Name */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="students_Name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter Student's Name"
                    className="col-span-3"
                    name="students_Name"
                    onChange={handleChange}
                  />
                </div>

                {/* Cohort Select */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="Cohort" className="text-right">
                    Cohort
                  </Label>
                  <SelectTag
                    data={Cohort}
                    placeHolder="Select a Cohort"
                    setStudentInfo={setStudentInfo}
                    Name="cohort"
                  />
                </div>

                {/* Courses Select */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <Label className="text-right">Courses</Label>
                  <CoursesSelectTag
                    courses={courses}
                    setSelectedCourses={setSelectedCourses}
                    selectedCourses={selectedCourses}
                  />
                </div>

                {/* Status Select */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <SelectTag
                    data={status}
                    placeHolder="Status"
                    setStudentInfo={setStudentInfo}
                    Name="status"
                  />
                </div>

                {/* Date Picker */}
                <div className="grid grid-cols-1 items-center gap-4 ml-0 md:ml-8">
                  <div className="flex flex-col gap-y-2">
                    <Label className="text-right w-full md:w-[100px]">
                      Date of Joining
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full md:w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date of joining</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleSetDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Student</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <MainTable
        filters={filters}
        studentInfoFromDashBoard={studentData}
        className="overflow-x-auto"
      />
    </div>
  );
}

export default Dashboard;