import React from "react"
import MultiSelectList from "./MultiSelect"
import ArticleIdSelect from "./articleIdSelect";

const Parameters = () => {
    return (
        <div className="w-full h-full px-[5%]">
            <h1 className="text-center text-[14px] font-semibold">Filters</h1>
            <div className="border-2  border-gray-400 h-[25%]">
                <MultiSelectList />
            </div>
            {/* <div className="border-2 border-gray-400 rounded h-[35%]">
                <ArticleIdSelect />
            </div> */}
        </div>
    )
}

export default Parameters
