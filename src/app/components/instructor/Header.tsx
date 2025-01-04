"use client"
import { ReactElement, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(): ReactElement {
    return (
      <div className="fixed top-0 left-0 w-full h-16 bg-purple-400 z-10 flex items-center px-4">
        <span className="text-white font-bold text-lg">Header</span>
      </div>
    );
  }