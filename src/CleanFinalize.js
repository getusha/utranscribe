import { Card, SimpleGrid } from "@mantine/core";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";

const CleanFinalize = () => {

    let outPutRef = useRef();
    const [value, setValue] = useState("");
    let output = value.replaceAll("<br>", "");

    const outHolder = document.createElement("div");
    // console.log(output)
    let allLines = [];
    let timeStamRegex = /\d+[:]/gm;
    let myFinalGuess = /\b[A-G]\b|#7b13|7sus2|7sus4|7Sus4|add2|add4|add9|add11|addb9|add#11|add13|aug\b|dim|dim7|maj7|m6|m7|M7|m7b5|m9|m11|m13|min\b|maj7|Maj7|maj9|maj11|maj13|mmaj7|mb5|mb6|\bM\b|sus|sus2|sus2#11|sus2b6|sus4|\bBm\b|\bEm\b|\bFm|\bAm\b|\bCm\b|\bDm\b|\bGm\b/;
    let groupedLines = [];
    let counter = 0;


    if (typeof outHolder != "undefined") {
        // (outPutRef.current.innerHTML = output);
        outHolder.innerHTML = output;
        // console.log(outHolder)
        if (outHolder.children.length > 0) {
            for (let i = 0; i < outHolder.children.length; i++) {
                allLines.push(outHolder.children[i].innerHTML)
                // console.log(allLines)
            }

            for (let j = 0; j < allLines.length; j++) {
                // timeStamRegex.test(allLines[j]) == true && console.log(allLines[j]);
                if (typeof allLines[j] != "undefined" && allLines[j].includes("[")) {
                    groupedLines.push(allLines[j])
                    // console.log(allLines[j])
                } else {
                    if (timeStamRegex.test(allLines[j]) == true) {

                        // if(typeof allLines[j + g] != "undefined" && allLines[j+g].includes("[")){
                        //     // groupedLines.push(allLines[j+g])
                        //     console.log(allLines[j+g])
                        // } else{


                        let group = [];
                        group.push(allLines[j])
                        counter = 0;

                        for (let g = 1; g < 20; g++) {
                            // if(typeof allLines[j + g] != "undefined" && allLines[j+g].includes("[")){
                            //     // groupedLines.push(allLines[j+g])
                            //     console.log(allLines[j+g])
                            // }
                            // console.log(allLines[j+g].includes("["))
                            // else 
                            // {


                            if ((timeStamRegex.test(allLines[j + g]) != true) && (counter < g) && (typeof allLines[j + g] != "undefined") && (counter < 1) && (allLines[j+g].includes("[") == false)) {
                                group.push(allLines[j + g])
                            } else {
                                counter++;
                            }
                            // }
                        }
                        groupedLines.push(group)
                        // }
                    }
                }
            }

            // console.log(groupedLines)
        }

    }




    return (
        <>
        <Card sx={{minHeight: "85vh"}} radius={"md"} ml={10} mr={10}>

            <SimpleGrid cols={2} sx={{width: "100%"}} mr={20} ml={20}>
                <ReactQuill placeholder="Paste the prepared text here" style={{ whiteSpace: "pre", height: "75vh" }} id="theEditorBox" modules={{ toolbar: false }} formats={[]}
                    value={value} onChange={setValue} />

                <Card className="theOutPut">
                    {`[bookmarkcwz]`}<br/>
                    {
                        groupedLines.map((line, i) => {
                            return (

                                <>
                                    {typeof line == "string" ?
                                        <span>
                                            
                                            {`<span class="lystyle" data-timestamp="">`}
                                            {<span><br />{line}</span>}
                                            <br />
                                            {`</span>`}
                                            <br />
                                            <br/>
                                        </span> :
                                        <span>{`<span class="lystyle" data-timestamp="${line[0]}">`}
                                            {line.slice(1).map((l) => {
                                                {
                                                    return l.replace(/\s/g, "").length > 0 ? <span><br />{l}</span> : "";
                                                }
                                                // return <span>{l}<br/></span>;
                                            })}
                                            <br />
                                            {`</span>`}
                                            {/* <br/> <br/> */}
                                            {/* {<h1>{i}</h1>} */}
                                            {/* {<h1>{groupedLines.length}</h1>} */}
                                            {i == groupedLines.length-1 ? <><br/></> : <><br/><br/></>}
                                            
                                        </span>
                                    }

                                </>

                            )
                        })
                    }
                    {`[bookmarkcwz]`}
                </Card>

            </SimpleGrid>
            {/* <div id="output" ref={outPutRef}></div> */}
                </Card>
</>
    )
}

export default CleanFinalize;