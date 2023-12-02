import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {fetchLocation} from "../../API/FetchWeather";
import {useDispatch} from "react-redux";
import {updateSearch} from "../../API/WeatherSlice";

export const SearchBar = ({ onSearchChange }) => {
    const [input, setInput] = useState(null);
    const dispatch = useDispatch();
    const loadOptions = async (search) => {
        try {
            const data = await fetchLocation(search);
            //console.log(data)
            const options = data.map(location => ({
                label: `${location.name}, ${location.country}`, // Fix typo here (was .name)
                value: {
                    lat: location.lat,
                    lon: location.lon
                }
            }));
            console.log(options)
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

    const handleChange = selectedOption => {
        setInput(selectedOption);
        //onSearchChange(selectedOption)
        dispatch(updateSearch(selectedOption))
    };
    //console.log(input)

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
