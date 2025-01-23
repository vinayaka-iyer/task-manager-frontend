import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

  const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user)

    const handleLogout = () => {
      logout();
      navigate("/login");
  };
    return (
      <Card className="bg-card py-2 px-4 border-0 md:justify-around  justify-between flex gap-6 rounded-2xl mt-5 w-full">
        <div className="font-bold text-lg">
          Task Manager
        </div>
  
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          {user &&
          <>
            <li>
            <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/tasks/create">Create</Link>
            </li>
            </>
          }
          
          <li>
            <Link to="/docs">Docs</Link>
          </li>
        </ul>
  
        <div className="flex items-center">
          <Button onClick={() => navigate('/login')} variant="secondary" className="hidden md:block md:mx-2 px-2">
            Login
          </Button>
  
          <div className="flex md:hidden mr-2 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger>
            </DropdownMenu>
  
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                <Link to="/tasks">Tasks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link to="/tasks/create">Create</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link to="/docs">Docs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={() => navigate('/login')} variant="secondary" className="w-full text-sm">
                    Login
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
  
          <ThemeToggle />
        </div>
      </Card>
    );
  };

  // return (
  //   <nav className="bg-neutral-100 text-white p-4">
  //     <div className="flex justify-between items-center">
  //       <Link to="/" className="text-lg font-bold">Task Manager</Link>
  //       <div>
  //         {user ? (
  //           <>
  //             <Link to="/tasks" className="mx-2">Tasks</Link>
  //             <Link to="/tasks/create" className="mx-2">Create Task</Link>
  //             <button onClick={handleLogout} className="mx-2">Logout</button>
  //           </>
  //         ) : (
  //           <>
  //             <Link to="/login" className="mx-2">Login</Link>
  //             <Link to="/register" className="mx-2">Register</Link>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </nav>
  // );

export default Navbar;
