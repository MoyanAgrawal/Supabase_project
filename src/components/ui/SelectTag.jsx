import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

function SelectTag({data, placeHolder,Name,setStudentInfo}) {
    function handleValueChange(value){
        setStudentInfo((prev)=>({
            ...prev,
            [Name]:value
        }))
    }
  return (
    <div>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>AY 2024-25</SelectLabel> */}
            {data?.map((item, idx) => (
              <SelectItem value={item?.name} key={idx}>
                {item?.name}
              </SelectItem>
            ))}
          </SelectGroup>    
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectTag;
