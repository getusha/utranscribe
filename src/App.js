import { Button, Card, SimpleGrid, Tabs, Textarea } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Route, Router, Routes } from "react-router";
import Finalize from "./Finalize";
import { IconFileExport, IconKeyboardShow, IconLoader, IconTextCaption } from "@tabler/icons";
import Transcribe from "./Transcribe";
import Prepare from "./Prepare";
import { Link } from "react-router-dom";
import NewPrepare from "./NewPrepare";
import CleanFinalize from "./CleanFinalize";

function App() {
  return (
    <>
      <Tabs color="red" variant="pills" p={20} radius="xl" sx={{ width: "80%"}} mr={"auto"} ml={"auto"} pl={100} pr={100} pt={20} pb={10} defaultValue={"prepare"}>
        
        <Card radius={"md"} >

        <Tabs.List>
          <Link to={"/"}>
          <Tabs.Tab p={10} value="prepare" icon={<IconLoader size={14} />}>Prepare</Tabs.Tab>
          </Link>
          <Link to={"/transcribe"}>
          <Tabs.Tab p={10}  value="transcribe" icon={<IconTextCaption size={14} />}>Transcribe</Tabs.Tab>
          </Link>
          <Link to={"/finalize"}>
          <Tabs.Tab p={10} value="finalize" icon={<IconFileExport size={14} />}>Finalize</Tabs.Tab>
          </Link>
          {/* <Link to={"/finalize"}>
          <Tabs.Tab p={10} value="shortcuts" icon={<IconKeyboardShow size={14} />}>Shortcuts</Tabs.Tab>
          </Link> */}
        </Tabs.List>
        </Card>

      </Tabs>

      <Routes>
        <Route path="/" element={<Prepare />} />
        <Route path="/transcribe" element={<Transcribe />} />
        <Route path="/finalize" element={<CleanFinalize />} />
        {/* <Route path="/new" element={<NewPrepare />} /> */}
        {/* <Route path="/haha" element={<CleanFinalize />} /> */}
        {/* <Route path="/" element={<Finalize />} /> */}
      </Routes>
      {/* <Finalize /> */}
    </>
  )
}

export default App;