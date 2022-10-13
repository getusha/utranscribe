import { Badge, Box, Button, Card, Grid, Group, Kbd, MantineProvider, ScrollArea, SimpleGrid, Slider, Text, Textarea, TextInput, Tooltip } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Mousetrap from "mousetrap";
import "mousetrap/plugins/global-bind/mousetrap-global-bind";
import { Form } from "react-router-dom";
import { IconCircleDot, IconClock, IconPlayerPause, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward, IconPlayerTrackNext, IconPlayerTrackPrev, IconTimeline } from "@tabler/icons";
import { Shortcut, Shortcuts } from "shortcuts";
function Transcribe(props) {

    const shortcuts = new Shortcuts();
    const [youtubeVideo, setYoutubeVideo] = useState("");
    const [ytUrl, setYtUrl] = useState("");
    const [keyPressed, setKeyPressed] = useState("");
    const [ytController, setYtController] = useState({ play: true })
    const [transcribedValue, setTranscribedValue] = useState("");

    const [playVideo, setPlayVideo] = useState(false);

    const [videoChangeProgress, setVideoChangeProgress] = useState(0);
    const [currentVideoTimeStamp, setCurrentVideoTimeStamp] = useState(0);

    const [progressInSeconds, setProgressInSeconds] = useState(0);

    const [playBackSpeed, setPlayBackSpeed] = useState(1);

    const playerRef = useRef("");
    const forwardRef = useRef("");
    const backwardRef = useRef("");
    const paustRef = useRef("");
    const richTextEditor = useRef("");
    const timestampRef = useRef("");

    // console.log(transcribedValue.target.value)
    transcribedValue != "" && localStorage.setItem("transcribedValue", transcribedValue);
    let savedTranscribedValue = localStorage.getItem("transcribedValue");
    // console.log("saved")
    // console.log(JSON.stringify(savedTranscribedValue))


    function setVideo(video) {
        localStorage.setItem("currentVideo", video);
        const currentVid = localStorage.getItem("currentVideo");

        setYoutubeVideo(() => {
            return currentVid;
        })
    }

    function theProgress(progress) {
        console.log(progress)
    }

    function getVideoDuration() {
        let videoDuration = new Date(playerRef.current.getDuration() * 1000).toISOString().substring(11, 19);
        console.log(videoDuration)
        return { videoDuration };
    }

    function setVideoProgress(progress) {
        const playedSeconds = progress.playedSeconds;
        const totalSecond = playerRef.current.getDuration();
        const theProgress = (playedSeconds / totalSecond) * 100;

        setProgressInSeconds(playedSeconds)
        console.log(progressInSeconds)

        let theTimeStamp = new Date(playedSeconds * 1000).toISOString().substring(11, 19);
        setCurrentVideoTimeStamp(theTimeStamp)
        /**
         * 
         * played seconds / 100
         * (played seconds / total second) * 100
         * total second / 100
         * 
         * 
         */
        setVideoChangeProgress(theProgress);
        return theProgress;
    }


    // function seekVideo(change){
    //     playerRef.current.seekTo(change/100, "fraction");
    // }

    function changeSpeed(rate) {
        setPlayBackSpeed(rate / 50);
    }

    function logTimestamp() {
        typeof timestampRef != "undefined" && timestampRef.current.click();

    }

    function vidForward() {
        // setProgressInSeconds((prev) => {
        //     return prev + 2;
        // })
        playerRef.current.seekTo(progressInSeconds + 2);
    }

    function vidBackward() {
        // setProgressInSeconds((prev) => {
        //     return prev - 2;
        // })
        progressInSeconds > 2 && playerRef.current.seekTo(progressInSeconds - 2);
    }

    function setVideoStatus() {
        setPlayVideo(!playVideo);
    }

    function insertAtCaret(text) {
        // const textarea = document.querySelector('textarea')
        const richEditor = richTextEditor.current;
        console.log(richEditor.children)
        richEditor.setRangeText(
            text,
            richEditor.selectionStart,
            richEditor.selectionEnd,
            'end'
        )
    }


    const handleKeyPress = useCallback((event) => {
        console.log(event.key);
        if (event.key == "Escape") {
            // setPlayVideo(false)
            // console.log(playVideo)
            typeof paustRef != "undefined" && paustRef.current.click();
            // setYtController({play: !ytController.play})
        }
        if (event.key == "F1") {
            vidBackward();
            return;
        }
        if (event.key == "F2") {
            vidForward();
            return;
        }

        if (event.key == "g") {
            logTimestamp()
            return;
        }
        setKeyPressed(event.key);
    }, [])


    shortcuts.add([ // Adding some shortcuts
        {
            shortcut: 'F1', handler: event => {
                handleKeyPress(event);
                // vidBackward();
                //   console.log ( event );
                return true; // Returning true because we don't want other handlers for the same shortcut to be called later
            }
        },
        // {
        //     shortcut: 'Escape', handler: e => {
        //         // handleKeyPress(e)
        //         // console.log(e)
        //         typeof paustRef != "undefined" && paustRef.current.click();
        //         return;
        //     }
        // },
        {
            shortcut: 'F2', handler: e => {
                typeof forwardRef != "undefined" && forwardRef.current.click();
                // vidForward();
                return true;
            }
        },
        {
            shortcut: 'F1', handler: e => {
                typeof backwardRef != "undefined" && backwardRef.current.click();
                return true;
            }
        },
        // { shortcut: 'Ctrl+B', handler: CtrlBHandler },
        {
            shortcut: 'esc', handler: (event) => {
                // Doing something...
                handleKeyPress(event)
                return true; // Returning true because we don't want other handlers for the same shortcut to be called later
            }
        },
        {
            shortcut: 'g', handler: (event) => {
                // Doing something...
                handleKeyPress(event)
                return true; // Returning true because we don't want other handlers for the same shortcut to be called later
            }
        },
        {
            shortcut: 'tt', handler: (event) => {
                // Doing something...
                handleKeyPress(event)
                return true; // Returning true because we don't want other handlers for the same shortcut to be called later
            }
        },
        // { shortcut: '-Ctrl+A' } // Removing the previous shortcut
    ]);

    useEffect(() => {
        // Mousetrap.bindGlobal(["esc", "F1", "F2"], handleKeyPress);
        // Mousetrap.stopCallback = function () {
        //     return false;
        // }





        const currentVid = localStorage.getItem("currentVideo");

        setYoutubeVideo(() => {
            return currentVid;
        })


        // switch(keyPressed){
        //     case "Escape":
        //         setYtController((prev)=>{
        //             return {
        //                 play: false
        //             }
        //         })
        //         console.log(ytController.play)
        //         break;
        // }
        // document.addEventListener("keypress", handleKeyPress);

        // return ()=>{
        //     document.removeEventListener("keypress", handleKeyPress);
        // }
    }, [handleKeyPress])
    // console.log(typeof forwardRef != "undefined" && forwardRef.current)

    const initialState = `Enter your transcript here... 

	Quick tips: 

		- Ctrl+I adds italic formatting and Ctrl+B adds bold formatting. 

		- Press ESC to play/pause, and Ctrl+J to insert the current timestamp.`;
    return (
        <>
            <Card sx={{ minHeight: "85vh" }} radius={"md"} ml={10} mr={10}>
                {/* <Text>{currentVideoTimeStamp}</Text> */}
                <Grid sx={{ width: "100%" }} ml={"auto"} mr={"auto"}>
                    <Grid.Col span={2}>
                        <Card sx={{ position: "fixed", width: 400, background: "#fff3f3" }} color="red">

                            {/* <Text>{progressInSeconds}</Text> */}
                            <ReactPlayer onPause={() => { setPlayVideo(false) }} onPlay={() => { setPlayVideo(true) }} playbackRate={playBackSpeed} controls={true} onBufferEnd={getVideoDuration} ref={playerRef} onProgress={setVideoProgress} playing={playVideo} width={"100%"} height={205} style={{ borderRadius: "10px", border: "3px solid #fa5252" }} url={youtubeVideo} />
                            {/* <Text>{ytUrl}</Text> */}
                            {/* style={{display: youtubeVideo != "" ? "none" : "block"}} */}
                            <Group mt={10} style={{ display: "flex", justifyContent: "space-between" }} mb={20}>
                                <Tooltip label="F1" position="bottom">
                                    <Button variant="light" radius={"xl"} ref={backwardRef} onClick={vidBackward}><IconPlayerTrackPrev /></Button>
                                </Tooltip>
                                <Tooltip label="Escape / esc" position="bottom">
                                    <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} radius={"xl"} pl={50} pr={50} ref={paustRef} onClick={setVideoStatus} > {playVideo ? <IconPlayerPause /> : <IconPlayerPlay />}</Button>
                                </Tooltip>
                                <Tooltip label="F2" position="bottom">
                                    <Button variant="light" radius={"xl"} ref={forwardRef} id="forward" onClick={vidForward}><IconPlayerTrackNext /></Button>
                                </Tooltip>
                            </Group>
                            <Box>
                                <Slider
                                    mt={5}
                                    thumbChildren={<IconCircleDot size={14} />}
                                    // color="red"
                                    label={playBackSpeed + "x"}
                                    defaultValue={playBackSpeed * 50}
                                    // value={videoChangeProgress}
                                    variant="gradient"
                                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                                    thumbSize={16}
                                    styles={{ thumb: { borderWidth: 2, padding: 3 } }}
                                    onSeeked={(s) => { console.log(s) }}
                                    onDrag={(d) => { console.log(d) }}
                                    onChange={changeSpeed}
                                />
                                <TextInput mt={10} onChange={(e) => { setYtUrl(e.target.value) }} placeholder="Youtube Link" radius={"md"}></TextInput>
                                <Button onClick={() => { setVideo(ytUrl) }} mt={10} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius={"md"}>Add Video</Button>
                            </Box>


                            <Group mt={20}>
                                <Badge color={"green"} >Shortcuts</Badge>
                            </Group>

                            <ScrollArea sx={{ height: 80 }} pr={30} pl={30}>
                                <Group mt={10} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Badge color="cyan" size="md" radius="xs">Start/Stop</Badge>
                                    <Kbd>esc</Kbd>
                                </Group>
                                <Group mt={10} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Badge color="cyan" size="md" radius="xs">Skip Forward</Badge>
                                    <Kbd>F2</Kbd>
                                </Group>
                                <Group mt={10} sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Badge color="cyan" size="md" radius="xs">Skip Backward</Badge>
                                    <Kbd>F1</Kbd>
                                </Group>
                            </ScrollArea>
                        </Card>

                    </Grid.Col>

                    <Grid.Col ml={"auto"} span={8} mt={15}>
                        <Group>
                            <Button variant="light" ref={timestampRef} mb={10} ml={"auto"} radius={"xl"} onClick={() => { insertAtCaret(currentVideoTimeStamp) }}><IconClock /></Button>
                        </Group>
                        {/* <RichTextEditor
                            ref={richTextEditor}
                            onChange={setTranscribedValue}
                            className="mousetrap"
                            sx={{ border: "none" }}
                            id="rte"
                            controls={[
                                ['bold', 'italic']
                            ]}
                            value={(savedTranscribedValue != null && savedTranscribedValue.length > 15) ? savedTranscribedValue : initialState}
                            // value={}
                        /> */}
                        <MantineProvider theme={{ fontFamily: "monospace" }}>

                            <Textarea autosize
                                wrap="off"
                                sx={{ fontFamily: "monospace", fontSize: "11px" }}
                                onChange={(event) => { setTranscribedValue(event.target.value) }}
                                defaultValue={(savedTranscribedValue != null && savedTranscribedValue.length > 15) ? savedTranscribedValue : initialState}
                                ref={richTextEditor}>

                            </Textarea>
                        </MantineProvider>

                        {/* <Textarea autosize minRows={20} ml={"auto"} mr={"auto"} sx={{ width: "80%" }}></Textarea> */}
                    </Grid.Col>
                </Grid>
            </Card>

        </>
    )
}


export default Transcribe;