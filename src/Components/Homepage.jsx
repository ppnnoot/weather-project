import {
    Card,
    // Typography,
    // List,
    // ListItem,
    // ListItemPrefix,
    // ListItemSuffix,
    // Chip,
  } from "@material-tailwind/react";
  import {
    // PresentationChartBarIcon,
    // ShoppingBagIcon,
    // UserCircleIcon,
    // Cog6ToothIcon,
    // InboxIcon,
    // PowerIcon,
  } from "@heroicons/react/24/solid";

  export function DefaultSidebar() {
    return (
        <>
            <Card className="h-screen w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 bg-blue-500 grid justify-items-center py-[150px]">
                <div className="flex justify-center items-center bg-red-500 w-full">
                    Home
                </div>
                <div className="flex justify-center items-center bg-red-500 w-full">
                    Forecast
                </div>
                <div className="flex justify-center items-center bg-red-500 w-full">
                    Location
                </div>
                <div className="flex justify-center items-center bg-red-500 w-full">
                    Analytics
                </div>
            </Card>
            <div className="bg-red-800 w-screen">
                
            </div>
        
        </>
    ); 
  }