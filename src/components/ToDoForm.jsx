import { useState } from "react";

export function ToDoForm({onSubmit}) {

    const [newItem, setNewItem] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (newItem === "") return;
    
        onSubmit(newItem);
    
        //clear input
        setNewItem("");
      }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">הוספת פריט:</label>
                <input value={newItem} onChange={e => { setNewItem(e.target.value) }} type="text" name="item" _id="item" />
            </div>
            <button className='btn'>הוסף</button>
        </form>
    )
}