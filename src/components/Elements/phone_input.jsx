import { forwardRef, useState } from "react";
import {Input} from "../Elements/input";
import Label from "../Elements/label";

const countries = [
    { name: "Indonesia", code: "+62", flag: "https://flagcdn.com/id.svg" },
  ];

const PhoneInputForm = forwardRef((props, ref) => {
    const {name,type,placeholder,label,onChange} = props
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="mb-6 relative">
        <Label>{label}</Label>
        <div className="flex items-center space-x-2">
                    {/* Dropdown */}
                    <div className="relative">
                        <button type="button"
                        className="flex items-center bg-gray-50 px-3 py-2 border text-sm rounded"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        >
                        <span className="mr-2"><img src={selectedCountry.flag} alt="flag" className="w-5 h-4 mr-2 object-cover rounded-sm" /></span>
                        {selectedCountry.code}
                        </button>

                        {isDropdownOpen && (
                        <ul className="absolute z-10 mt-1 w-48 bg-white rounded shadow-lg max-h-60 overflow-auto">
                            {countries.map((country, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:opacity-75 cursor-pointer flex items-center"
                                onClick={() => {
                                setSelectedCountry(country);
                                setDropdownOpen(false);
                                }}
                            >
                                <span className="mr-2"><img src={selectedCountry.flag} alt="flag" className="w-5 h-4 mr-2 object-cover rounded-sm" /></span>
                                {country.name} ({country.code})
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <Input name={name} type={type} placeholder={placeholder} ref={ref} onChange={onChange}></Input>
                </div>
        </div>
    )   
});

export default PhoneInputForm