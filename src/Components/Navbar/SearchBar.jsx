import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {fetchLocation} from "../../API/FetchWeather";

export const SearchBar = ({ onSearchChange }) => {
    const [input, setInput] = useState(null);

    const loadOptions = async (search) => {
        try {
            const data = await fetchLocation(search);
            //console.log(data)
            const options = data.map(location => ({
                label: `${location.name}, ${location.country} ${location.local_names?.th || ""}  `, // Fix typo here (was .name)
                value: {
                    lat: location.lat,
                    lon: location.lon
                }
            }));

            return {
                options,
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            return {
                options: []
            }

        }
    };
    //console.log(setInput)
    const handleChange = selectedOption => {
        setInput(selectedOption);
    };

    return (
        <div className="">
            <div className="">
                <div className={"w-64"}>
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
