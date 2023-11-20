import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

export const SearchBar = ({ onSearchChange }) => {
    const [input, setInput] = useState(null);

    const loadOptions = async (search, prevOptions, { page }) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=87c1389b96ffca4894593c489a3c30af`
            );
            const json = await response.json();

            const options = json.map(location => ({
                label: location.name, // Fix typo here (was .name)
                value: location.id
            }));

            return {
                options,
                hasMore: options.length === 10,
                additional: {
                    page: page + 1
                }
            };
        } catch (error) {
            console.error('Error fetching location:', error);
            // Handle the error, e.g., display an error message or fallback options
            return {
                options: [],
                hasMore: false
            };
        }
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
                        debounceTimeout={600} // Add debounceTimeout if needed
                        placeholder="Search for locations..."
                    />
                </div>
            </div>
        </div>
    );
};
