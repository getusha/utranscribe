import { Button, Card, SimpleGrid, Textarea } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


function Finalize() {

    const ref = useRef();
    console.log(ref.current?.innerText);
    const [value, setValue] = useState("");
    const [theVerses, setTheVerses] = useState([]);
    // const [allChilds, setAllChilds] = useState([]);

    let timeStamRegex = /\d+[:]/gm;
    let myFinalGuess = /\b[A-G]\b|#7b13|7sus2|7sus4|7Sus4|add2|add4|add9|add11|addb9|add#11|add13|aug\b|dim|dim7|maj7|m6|m7|M7|m7b5|m9|m11|m13|min\b|maj7|Maj7|maj9|maj11|maj13|mmaj7|mb5|mb6|\bM\b|sus|sus2|sus2#11|sus2b6|sus4|\bBm\b|\bEm\b|\bFm|\bAm\b|\bCm\b|\bDm\b|\bGm\b/;

    let finalized;
    let onlyVerses = [];
    let theChilds;

    let passableIndex = [];
    function collectChilds() {
        let allChilds = [];
        if (document.querySelector(".ql-editor") != null && document.querySelector(".ql-editor").children.length > 1) {
            theChilds = document.querySelector(".ql-editor").children
            console.log(theChilds)
            for (let i = 0; i < theChilds.length; i++) {

                if (theChilds[i].innerHTML.includes("[")) {
                    console.log(theChilds[i])
                    onlyVerses.push(theChilds[i].innerText);
                    console.log(onlyVerses)
                }

                else {
                    if (timeStamRegex.test(theChilds[i].innerText)) {
                        const grouped = []
                        // onlyVerses.push(theChilds[i].innerText)
                        timeStamRegex.test(theChilds[i].innerText) == true && grouped.push(theChilds[i].innerText)
                        timeStamRegex.test(theChilds[i+1].innerText) == false && grouped.push(theChilds[i+1].innerText)
                        // alert(typeof theChilds[i+3].innerText)

                        // for(let j = 1; j<20; j++){
                        //     theChilds[i + j] != null && timeStamRegex.test(theChilds[i + j].innerText) == false && grouped.push(theChilds[i + j].innerText);
                        // }

                        
                        // console.log("hey"+passableIndex)

                        for(let l = 0; l < passableIndex.length; l++){
                            console.log("HEY "+theChilds[passableIndex[l]].innerText)
                        }

                        function isPassable(){
                            for(let l = 0; l < passableIndex.length; l++){
                                return i = l ? true : false;
                            }
                            return true;
                        }
                        // if(passableIndex.incl)
                        // if(passableIndex.length > 0 && isPassable){

                        // for(let o = 1; o < 4; o++){
                        //     if(theChilds[i + o] != null && timeStamRegex.test(theChilds[i + o].innerText) == false && myFinalGuess.test(theChilds[i + o].innerHTML) == true){
                        //         grouped.push(theChilds[i + o].innerText);
                        //         passableIndex.push(i+o)
                        //     }
                        // }

                        if(theChilds[i + 1] != null && timeStamRegex.test(theChilds[i + 1].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == true){
                            grouped.push(theChilds[i + 1].innerText);
                            passableIndex.push(i+1)
                        }
                        if(theChilds[i + 2] != null && timeStamRegex.test(theChilds[i + 2].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == true){
                            grouped.push(theChilds[i + 2].innerText);
                            passableIndex.push(i+2)
                        }
                        if(theChilds[i + 3] != null && timeStamRegex.test(theChilds[i + 3].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == true){
                            grouped.push(theChilds[i + 3].innerText);
                            passableIndex.push(i+3)
                        }
                        if(theChilds[i + 4] != null && timeStamRegex.test(theChilds[i + 2].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == true){
                            grouped.push(theChilds[i + 4].innerText);
                            passableIndex.push(i+4)
                        }
                        // if(theChilds[i + 5] != null && timeStamRegex.test(theChilds[i + 2].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == true){
                        //     grouped.push(theChilds[i + 4].innerText);
                        //     passableIndex.push(i+4)
                        // }
                        // if(theChilds[i + 4] != null && timeStamRegex.test(theChilds[i + 2].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == true){
                        //     grouped.push(theChilds[i + 4].innerText);
                        //     passableIndex.push(i+4)
                        // }


                        // if(theChilds[i + 1] != null && timeStamRegex.test(theChilds[i + 1].innerText) == false && myFinalGuess.test(theChilds[i + 1].innerHTML) == false){
                        //     grouped.push(theChilds[i + 1].innerText);
                        //     passableIndex.push(i+1)
                        // }
                        // if(theChilds[i + 2] != null && timeStamRegex.test(theChilds[i + 2].innerText) == false && myFinalGuess.test(theChilds[i + 2].innerHTML) == false){
                        //     grouped.push(theChilds[i + 2].innerText);
                        //     passableIndex.push(i+2)
                        // }
                        // if(theChilds[i + 3] != null && timeStamRegex.test(theChilds[i + 3].innerText) == false && myFinalGuess.test(theChilds[i + 3].innerHTML) == false){
                        //     grouped.push(theChilds[i + 3].innerText);
                        //     passableIndex.push(i+3)
                        // }
                        // if(theChilds[i + 4] != null && timeStamRegex.test(theChilds[i + 4].innerText) == false && myFinalGuess.test(theChilds[i + 4].innerHTML) == false){
                        //     grouped.push(theChilds[i + 4].innerText);
                        //     passableIndex.push(i+4)
                        // }

                        // theChilds[i + 2] != null && timeStamRegex.test(theChilds[i + 2].innerText) == false && grouped.push(theChilds[i + 2].innerText);
                        // theChilds[i + 3] != null && timeStamRegex.test(theChilds[i + 3].innerText) == false && grouped.push(theChilds[i + 3].innerText);
                    // }

                        // theChilds[i + 3] != null && theChilds[i+3].innerHTML.includes("[") == false && timeStamRegex.test(theChilds[i + 3].innerText) == false && grouped.push(theChilds[i + 3].innerText);
                        onlyVerses.push(grouped);
                        console.log(onlyVerses);
                        setTheVerses(() => {
                            return [...onlyVerses];
                        })
                    }

                    if (theChilds[i].innerText == "\n") {
                        theChilds[i].outerHTML = "";
                    }

                    const idk = theChilds[i];
                    if(typeof idk != "undefined"){
                     allChilds.push(theChilds[i].outerHTML)
                     if (timeStamRegex.test(theChilds[i].innerText)) {
                         console.log(theChilds[i].innerText);
                         theChilds[i].classList.add("lystyle");
                         theChilds[i].setAttribute("data-timestamp", theChilds[i].innerText);
                         //   console.log(theChilds[i].outerHTML.replace(/p>/g, "span>").replace(/<p/, "<span"));
                         // allChilds.push(theChilds[i].outerHTML.replace(/p>/g, "span>").replace(/<p/, "<span"))
                         // theChilds[i].innerText = theChilds[i+1].innerText + "\n" + theChilds[i+2].innerText;
                         // allChilds[i] = ` `;
                     }
                    }
                }


            }


            const joinedChilds = allChilds.join("");
            console.log(joinedChilds)
            // document.getElementById("joined").innerHTML = joinedChilds;

            // const [finalized, setFinalized] = useState("");





            // finalized = joinedChilds.replace(/<p>/g, "<span class=\"lystyle\" data-timestamp=\"\"><br>");
            // finalized = finalized.replace(/<p/g, "<br><span");
            // finalized = finalized.replace(/<p><br><\/p>/, "Hehehehe empty")
            // finalized = finalized.replace(/<\/p>/g, "<br><\/span>");
            // // var re = new RegExp(String.fromCharCode(160), "g");
            // finalized = finalized.replace(/&nbsp;/g, " ");
            // finalized = finalized.replace(/<br>/g, "\n");




            //   finalized = joinedChilds.replace(/<p>/g, "<span class=\"lystyle\" data-timestamp=\"\"><br>");
            //   finalized = joinedChilds.replace(/<p>/g, "<span><br>");
            //   finalized = finalized.replace(/<p><br><\/p>/, "Hehehehe empty")
            //   finalized = finalized.replace(/<\/p>/g, "<\/span>");
            //   // var re = new RegExp(String.fromCharCode(160), "g");
            // //   finalized = finalized.replace(/&nbsp;/g, " ");
            //   finalized = finalized.replace(/<br>/g, "\n");

            // document.getElementById("outputEditor").innerHTML = finalized;

            // setAllChilds(()=>{
            //   return [...theChilds];
            // })
        }
    }

    useEffect(() => {
        collectChilds()
    }, [value])



    // finalized = finalized.replace(/<span class="lystyle" data-timestamp="">\n/g, "Shet space")
    // `<span class="lystyle" data-timestamp="">

    // </span>`
    // finalized.match(/^\s*[\r\n]/)
    // let newLineRegex = /^\s*[\r\n]/;
    // newLineRegex.test(finalized)

    // finalized = finalized.replace("&nbsp;", " ");
    // console.log(value.replace(/<p>/, "<span>"))
    // setFinalized(()=>{
    //   return value.replace(/<p>/, "<span>");
    // })
    // setFinalized(value.replace(/<\/p>/, "<\/span>"))
    // console.log(finalized)

    



    const startingTag = "[bookmarkcwz]";
    const endingTag =[];
    // &lt;

    return (
        <>
            {/* <Button fullWidth p={5} m={4}>Finalize</Button> */}
            {/* <h1>{value}<  /h1> */}
            <p id="joined"></p>
        <Card sx={{minHeight: "85vh"}} radius={"md"} ml={10} mr={10}>
            <SimpleGrid cols={2} sx={{width: "100%"}} mr={20} ml={20}>
                <div className="theEditor">
                    {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                    <ReactQuill placeholder="Paste the prepared text here" style={{ whiteSpace: "pre", height: "85vh" }} id="theEditorBox" modules={{ toolbar: false }}  formats={[]} value={value} onChange={setValue} />
                </div>

                {/* <Prism> */}
                    {/* {typeof ref.current != "undefined" ? ref.current?.innerText : ``} */}
                    {/* {ref.current?.innerText} */}
                {/* </Prism> */}


                {
                    console.log(theVerses)
                //  theVerses.map((child)=>{
                //     return(
                //         <>
                //         hey
                //         </>
                //     )
                //  })   
                }
                <div className="theOutPut" ref={ref}>
                   <span>{startingTag.replace(" ", "")}</span><br></br>
                    {
                        theVerses.map((verse, i) => {
                            return (
                                <>
                                    {/* <div style={{backgroundColor: "red", margin: "10px"}}> */}

                                    {typeof verse == "string" ? ( i > 0 ? `</span>\n\n<span class="lystyle" data-timestamp="">\n${verse}\n` : `<span class="lystyle" data-timestamp="">\n${verse}\n`) :
                                        <>
                                            {i > 0 ? `</span>\n\n<span class="lystyle" data-timestamp="${verse[0]}">` : `<span class="lystyle" data-timestamp="${verse[0]}">`}
                                            {verse.slice(1).map((final, i) => {
                                                return (
                                                    <>
                                                        {i == 0 && <br></br>}<span>{final}<br></br></span>
                                                    </>

                                                )
                                            })}
                                            {/* {i} */}
                                            {/* {theve.length} */}
                                            {i + 1 == theVerses.length && `</span>`}
                                            {/* </div> */}
                                        </>
                                    }

                                </>
                            )
                        })
                    }
                    <br></br>{"[/bookmarkcwz]"}
                    {/* <Textarea sx={{fontFamily: "monospace"}} id="outputEditor" autosize maxRows={30}></Textarea> */}
                    {/* <Prism language="markup">{`Mn Aynet neger new`}</Prism> */}

                    {/* <textarea className="outputEditor" value={value}></textarea> */}
                </div>
            </SimpleGrid>
            {/* <h1>{editorValue[0].children[0].text}</h1> */}
            </Card>
        </>
    );
}

export default Finalize;