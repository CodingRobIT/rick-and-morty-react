import {ChangeEvent} from "react";

type ActionBarProps = {
    text: string,
    onTextChange: (value: string) => void
}
export default function ActionBar(props: ActionBarProps) {

    function onTextChange(event: ChangeEvent<HTMLInputElement>) {
        props.onTextChange(event.target.value)
    }

    return (
        <div>
            <p>{props.text}</p>
            <input value={props.text} onChange={onTextChange}/>
        </div>
    )
}
