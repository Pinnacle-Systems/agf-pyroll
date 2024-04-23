import React, { useState } from "react"
import MultiSelectList from "./MultiSelect"
import ArticleIdSelect from "./articleIdSelect";

const Parameters = () => {
    const [searchItem, setSearchItem] = useState('')
    const [selectItem, setSelectItem] = useState('')
    return (
        <div className="w-full h-full px-[5%] side-bar ">
            <h1 className="text-center text-[17px] tab-color font-semibold">Filters</h1>
            <div className="border-2  border-gray-400 h-[30%] rounded-b-xl mb-2">
                <MultiSelectList searchItem={searchItem} setSearchItem={setSearchItem} />
            </div>
            <div className="border-2  border-gray-400 h-[30%] rounded-b-xl ">
                <ArticleIdSelect />

            </div>


        </div>
    )
}

export default Parameters
