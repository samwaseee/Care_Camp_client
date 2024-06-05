import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

import useCamps from "../../hooks/useCamps";
import ACamp from "./ACamp";
import { useState } from "react";

const AVailableCamps = () => {

    const [sort, setSort] = useState("");

    const [camps, loading, refetch] = useCamps(sort);

    const [view, setView] = useState('list');

    const times = new Array(6).fill(null);



    const handleSort = (e) => {
        setSort(e.target.value)
        console.log(sort)
        refetch();
    };

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    return (
        <div className="py-20">
            <div className="card card-side bg-base-100 shadow-xl mb-5 justify-between p-2">
                <div className="flex flex-1">
                    <input type="text" placeholder="Search" className="input input-bordered md:w-auto" />
                    <button className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                <select
                    className="select w-full max-w-xs"
                    value={sort}
                    onChange={handleSort}
                >
                    <option value="" disabled>Sort by</option>
                    <option value="most-registered">Most Registered</option>
                    <option value="fees-high-to-low">Fees: High to Low</option>
                    <option value="fees-low-to-high">Fees: Low to High</option>
                    <option value="camp-name-asc">Camp Name: [A-Z]</option>
                    <option value="camp-name-desc">Camp Name: [Z-A]</option>
                </select>
                <div className="card-actions justify-end">
                    <ToggleButtonGroup
                        orientation="horizontal"
                        value={view}
                        exclusive
                        onChange={handleChange}
                        className=""
                    >
                        <ToggleButton value="list" aria-label="list">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton value="module" aria-label="module">
                            <ViewModuleIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

            <div className={`grid gap-8 ${view === "list" ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {
                    loading ?
                        times.map((_, index) => {
                            return (
                                <div key={index} className="flex gap-4 w-full">
                                    <div className="skeleton h-32 w-1/3"></div>
                                    <div className="space-y-6 w-1/2">
                                        <div className="skeleton h-4 w-28"></div>
                                        <div className="skeleton h-4 w-48"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                    </div>
                                </div>
                            )
                        })
                        :

                    camps.map((camp, index) => <ACamp
                        key={camp._id}
                        index={index}
                        view={view}
                        camp={camp}></ACamp>)
                }
            </div>
        </div>
    );
};

export default AVailableCamps;