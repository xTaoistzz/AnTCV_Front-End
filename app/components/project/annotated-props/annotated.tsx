import Detection from "./typeof_annotated/detection/detection"
import Segmentation from "./typeof_annotated/segmentation/segmentation"

export default function Annotate(){
    const type = window.localStorage.getItem("Type")
    return (
        <div className="p-5">Annotated Page
        { type === "detection" && <Detection/>}
        { type === "segmentation" && <Segmentation/>}
        </div>
    )
}