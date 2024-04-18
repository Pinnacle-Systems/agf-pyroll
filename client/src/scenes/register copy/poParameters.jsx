import React from "react"
import MultiSelectList from "../../components/MultiSelect"

const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
]

const Parameters = () => {
    return (
        <div className="relative ">
            <div className="fixed">
                <div className="Parameters scrollbar">
                    <MultiSelectList options={options} />
                </div>
                <div className="Parameters">
                    <MultiSelectList options={options} />
                </div>
                <div className="Parameters">
                    <MultiSelectList options={options} />
                </div>
            </div>
        </div>
    )
}

export default Parameters
