import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import "../Navbar/Navbar.css"
import {fetchLocation} from "../../API/FetchWeather";

export const SearchBar = ({onSearchChange }) => {
    const [input, setInput] = useState(null);
    const loadOptions = async (search, prevOptions, { page }) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${search}&_page=${page}&_limit=10`);
        const json = await response.json();

        const options = json.map(user => ({
            label: user.name,
            value: user.id
        }));

        return {
            options,
            hasMore: options.length === 10,
            additional: {
                page: page + 1
            }
        };
    };

    const handleChange = selectedOption => {
        setInput(selectedOption);

    };

    return (
        <div className="">
            <div className="md:w-96">
                <div className="flex w-full flex-wrap items-stretch">
                    <AsyncPaginate
                        value={input}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        debounceTimeout={600} // เพิ่ม debounceTimeout ถ้าต้องการ
                        placeholder="Search for users..."
                    />
                </div>
            </div>
        </div>
    );
};
