import React from "react";
import { Newspaper, CalendarPlus, MessageSquare } from "lucide-react"; // icons

export default function CommunityPlusSidebar() {
  return (
    <div className="w-56 bg-gray-50 border-r border-gray-200 h-screen flex flex-col py-4">
      {/* Profile (top section) */}
      <div className="flex items-center px-4 py-2 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-700 font-bold">C+</span>
        </div>
        <span className="ml-3 font-semibold text-gray-800">Adefope Oloyede</span>
      </div>

      {/* Menu List */}
      <ul className="space-y-2">
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
          <Newspaper className="w-6 h-6 text-blue-600 mr-3" />
          <span>Add News</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
          <CalendarPlus className="w-6 h-6 text-green-600 mr-3" />
          <span>Add Event</span>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
          <MessageSquare className="w-6 h-6 text-purple-600 mr-3" />
          <span>OPINION</span>
        </li>
      </ul>
    </div>
  );
}
