import { Input } from "antd";
import { useState } from "react";



export default function SimpleInput() {

    const [value, setValue] = useState("");

    return <Input value={value} onChange={e => setValue(e.target.value)}></Input>
}