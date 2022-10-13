import { Card, SimpleGrid } from "@mantine/core";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";

function Prepare(props) {

    const [value, setValue] = useState("");

    const richEditorRef = useRef("");
    const outputRef = useRef("");
    // console.log(richEditorRef)
    let allChilds = [];
    if (richEditorRef.current != "") {
        let thePrepareSeekers = richEditorRef.current.editor.root.children;
        let myFinalGuess = /\b[A-G]\b|#7b13|7sus2|7sus4|7Sus4|add2|add4|add9|add11|addb9|add#11|add13|aug\b|dim|dim7|maj7|m6|m7|M7|m7b5|m9|m11|m13|min\b|maj7|Maj7|maj9|maj11|maj13|mmaj7|mb5|mb6|\bM\b|sus|sus2|sus2#11|sus2b6|sus4|\bBm\b|\bEm\b|\bFm|\bAm\b|\bCm\b|\bDm\b|\bGm\b/;

        for (let i = 0; i < thePrepareSeekers.length; i++) {
            // console.log(allChilds)
            // console.log(thePrepareSeekers[i])
            // console.log(myFinalGuess.test)
            if (myFinalGuess.test(thePrepareSeekers[i].outerHTML) == true) {
                allChilds.push(thePrepareSeekers[i].outerHTML.replace(/<p>/g, `${(i>0) ? "<br><br><div><br>" : "<div>"}`));
                // console.log(allChilds[i])/
            } else {
                allChilds.push(thePrepareSeekers[i].outerHTML);
            }

        }

        if(outputRef.current != ""){
            console.log(outputRef.current.innerHtml)
            outputRef.current.innerHTML = allChilds.join("");
        }
        // richEditorRef.current.editor.root.children[0] = "haha";
        // console.log(richEditorRef.current.editor.root.children)

    }


    return (
        <>
            <Card sx={{ minHeight: "85vh" }} radius={"md"} ml={10} mr={10}>
                <SimpleGrid cols={2} sx={{ width: "100%" }} mr={20} ml={20}>
                    <div className="theEditor">
                        <ReactQuill ref={richEditorRef} placeholder="Paste the transcribed text here" style={{ whiteSpace: "pre" }} id="theEditorBox" modules={{ toolbar: false }} formats={[]} value={value} onChange={setValue} />
                    </div>
                    <div className="theOutPut" ref={outputRef}>
                        {/* This will be the prepared <br></br>
                        output */}
                    </div>
                </SimpleGrid>
            </Card>
        </>
    )
}


export default Prepare;