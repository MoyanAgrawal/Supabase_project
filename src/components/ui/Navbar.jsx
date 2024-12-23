import React from "react";
import { Input } from "./input";
import { Bell, CircleHelp, MessageSquareMore, Settings2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar({ onSearch }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full justify-center items-center bg-[#fff] ">
      <Input
        type="text"
        placeholder="Search for Student"
        className=""
        onChange={handleSearchChange}
      />
      <div className="flex gap-5">
        <CircleHelp className="cursor-pointer	" />
        <MessageSquareMore className="cursor-pointer	" />
        <Settings2 className="cursor-pointer	" />
        <Bell className="cursor-pointer	" />
      </div>
      <div className="flex gap-5 justify-center items-center">
        <Avatar className="cursor-pointer	">
          <AvatarImage src="src/assets/images/avatar.png"  />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <h2 className="w-full font-semibold whitespace-nowrap cursor-pointer overflow-hidden text-ellipsis">
          Adeline H. Dancy
        </h2>
      </div>
    </div>
  );
}

export default Navbar;
