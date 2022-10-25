import { useRef, useState } from "react";
import ReactQuill from "react-quill";

function NewPrepare(){

    const idkRef = useRef("")
    const [value, setValue] = useState("");

    console.log(idkRef.current.innerHTML)
    // document.querySelector("#idk").innerHTML = value;
    return(
        <>
        <ReactQuill value={value} onChange={setValue} />
        <h1>{value.replaceAll("</p>", "<br></p>\n")}</h1>

        <div ref={idkRef} id="idk"></div>
        </>
    )
}

export default NewPrepare;