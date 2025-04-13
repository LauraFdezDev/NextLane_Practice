import {useState} from "react";
import { useLocalStorage } from "../app/localStorage";

export default function useClickCounters() {
    const { setItem } = useLocalStorage('clicks');
    const [clicks, setClick] = useState(0);

    const click = () => {
        setClick(clicks + 1);
        setItem(clicks + 1);
    }

    const reset = () => {
        setClick(0);
        setItem(0);
    }

    return { clicks, click, reset}
}