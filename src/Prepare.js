import { Card, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import ReactQuill from "react-quill";

function Prepare(props) {

    const [value, setValue] = useState("");
    return (
        <>
            <Card sx={{ minHeight: "85vh" }} radius={"md"} ml={10} mr={10}>
                <SimpleGrid cols={2} sx={{ width: "100%" }} mr={20} ml={20}>
                    <div className="theEditor">
                        <ReactQuill placeholder="Paste the transcribed text here" style={{ whiteSpace: "pre" }} id="theEditorBox" modules={{ toolbar: false }} formats={[]} value={value} onChange={setValue} />
                    </div>
                    <div className="theOutPut">
                       This will be the prepared <br></br>
                        output
                    </div>
                </SimpleGrid>
            </Card>
        </>
    )
}


export default Prepare;