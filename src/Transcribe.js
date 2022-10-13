import { Button, Card, Grid, SimpleGrid, Textarea, TextInput } from "@mantine/core";
import RichTextEditor from "@mantine/rte";



function Transcribe(props) {

    const initialState = `Enter your transcript here... <br>

	Quick tips: <br><br>

		- Ctrl+I adds italic formatting and Ctrl+B adds bold formatting. <br><br>

		- Press ESC to play/pause, and Ctrl+J to insert the current timestamp.`;
    return (
        <>
        <Card sx={{minHeight: "85vh"}} radius={"md"} ml={10} mr={10}>

            <Grid sx={{width: "100%"}} ml={"auto"} mr={"auto"}>
                <Grid.Col span={2}>
                    <Card sx={{ position: "fixed", width: 400, background: "#fff3f3"}} color="red">
                        <TextInput placeholder="Youtube Link" radius={"md"}></TextInput>
                        <Button mt={10} color="red" radius={"md"}>Add Video</Button>
                    </Card>
                </Grid.Col>
                
                <Grid.Col ml={"auto"} span={8}>
                    <RichTextEditor
                    sx={{ border: "none"}}
                        id="rte"
                        controls={[
                            ['bold', 'italic'],
                        ]}
                        value={initialState}
                    />
                    {/* <Textarea autosize minRows={20} ml={"auto"} mr={"auto"} sx={{ width: "80%" }}></Textarea> */}
                </Grid.Col>
            </Grid>
        </Card>

        </>
    )
}


export default Transcribe;