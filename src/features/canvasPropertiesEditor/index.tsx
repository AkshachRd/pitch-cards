import DragNumInput from "entities/dragNumInput";
import {useAppDispatch, useAppSelector} from "shared/hooks";
import {changeFilter, changeTitle, resize, selectCanvasState} from "widgets/canvas/model/canvasSlice";
import {ChangeEvent, useEffect, useState} from "react";
import {Filters} from "shared/types";
import {isFilter} from "shared/lib";

const CanvasPropertiesEditor = () => {
    const dispatch = useAppDispatch();
    const canvas = useAppSelector(selectCanvasState);
    const [title, setTitle] = useState(canvas.title);
    const [size, setSize] = useState({width: canvas.width, height: canvas.height});
    const [filter, setFilter] = useState(canvas.filter);

    useEffect(() => {
        dispatch(changeTitle(title));
    }, [title]);

    useEffect(() => {
        dispatch(resize(size))
    }, [size.width, size.height]);

    useEffect(() => {
        dispatch(changeFilter(filter));
    }, [filter]);

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const filter = e.target.value;
        if (!isFilter(filter)) throw new Error("Unknown filter");
        setFilter(filter);
    };

    return (
        <div>
            <p>CANVAS</p>
            <input type="text" name="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <DragNumInput
                name="Width"
                value={canvas.width}
                minValue={100}
                onChange={(width) => setSize((prev) => ({...prev, width}))}
            />
            <DragNumInput
                name="Height"
                value={canvas.height}
                minValue={100}
                onChange={(height) => setSize((prev) => ({...prev, height}))}
            />
            <select name="Filter" value={filter} onChange={handleFilterChange}>
                {Object.entries(Filters).map(([filterName, filterValue]) => {
                    return (
                        <option
                            key={filterName}
                            value={filterValue}
                        >
                            {filterName}
                        </option>
                    )
                })}
            </select>
        </div>
    )
};

export default CanvasPropertiesEditor;