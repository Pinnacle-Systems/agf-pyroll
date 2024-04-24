import React, { useState } from "react"
import MultiSelectList from "./MultiSelect"
import ArticleIdSelect from "./articleIdSelect";

const Parameters = ({ selectedSupplier, setSelectedSupplier, selectedArticleId, setSelectedArticleId }) => {

    return (
        <div className="w-full h-full p-[5%] side-bar ">
            <h1 className="text-center text-[22px] py-1 h-[6%] font-semibold bg-white text-center rounded">Filters</h1>
            <div className="border-2  border-gray-400 h-[35%] rounded-b-xl mt-2">
                <MultiSelectList selectedSupplier={selectedSupplier} setSelectedSupplier={setSelectedSupplier} />
            </div>
            <div className="border-2  border-gray-400 h-[35%] rounded-b-xl ">
                <ArticleIdSelect selectedArticleId={selectedArticleId} setSelectedArticleId={setSelectedArticleId} />

            </div>


        </div>
    )
}

export default Parameters
