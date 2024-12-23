import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

const CoursesSelectTag = ({ courses, setSelectedCourses, selectedCourses }) => {
  const toggleSkill = (skill) => {
    setSelectedCourses((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill) // Remove if already selected
        : [...prev, skill] // Add if not selected
    );
  };

  // Conditionally render the courses in the popover trigger
  const displaySelectedCourses = selectedCourses.length > 2 
    ? `${selectedCourses.slice(0, 2).join(", ")}...` 
    : selectedCourses.join(", ");

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 border border-gray-300 w-max py-2 bg-[#E9EDF1] px-3 rounded-md">
        {selectedCourses.length > 0 ? (
          <span>{displaySelectedCourses}</span>
        ) : (
          <span>Select Courses</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="bg-white border border-gray-200 p-2 rounded-md w-64">
        {courses.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={() => toggleSkill(item.name)}
          >
            <input
              type="checkbox"
              checked={selectedCourses.includes(item.name)}
              readOnly
              className="cursor-pointer"
            />
            <span>{item.name}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CoursesSelectTag;
