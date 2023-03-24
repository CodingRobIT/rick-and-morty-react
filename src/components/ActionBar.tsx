import {ChangeEvent} from "react";

type ActionBarProps = {
    inputText: string,
    onChange: (value: string) => void
}
export default function ActionBar(props: ActionBarProps) {

    //Wird aufgerufen wenn der Nutzer was eintippt
    function onTextChange(event: ChangeEvent<HTMLInputElement>) {
        //Die Callback Funktion wird aufgerufen mit dem Wert den der Nutzer eingetippt hat(event.target.value)
        props.onChange(event.target.value)
    }

    return (
        <div>
            <br/>
            {/* value: Was wird im input Feld angezeigt? onChange: Was soll passieren wenn der nutzer was eintippt? */}
            <input value={props.inputText} onChange={onTextChange}/>
                <br/>
            <br/>
        </div>
    )
}
