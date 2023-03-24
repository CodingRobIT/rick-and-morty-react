import './App.css';
import CharacterGallery from "./components/CharacterGallery";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import ActionBar from "./components/ActionBar";
import {Character} from "./model/Character";
import axios from "axios";


export default function App() {

    const [characters, setCharacters] = useState<Character[]>([])

    //    wert, setter     zum speichern von dynamischen Daten(user input, daten von einer api) userState(initialWert)
    const [searchText, setSearchText] = useState("")

    // useEffect nutzten wir um gezielt/zu einem bestimmtet Zeitpunkt code auszuführen (Netzwerk Request)
    useEffect(
        //Die Funktione/code der ausgeführt werden soll
        () => {
        loadAllCharacters();

        // dependency Array damit geben wir an WANN der Code ausgeführt werden soll z.B. [] = einmal ganz am Anfang
    }, [])

    // useEffect(
    //     loadAllCharacters
    // , [])


    //alle Charactere die der Bedingung entsprechen    alle charactere werden gefiltert      Name in Kleinbuchstaben entählt suchetxt in Kleinbuchstaben
    const filteredCharacters = characters.filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()))

    //Wird aufgerufen wenn Nutzer was eintippt und dann die ActionBar Komponente die Callback Funktion aufruft
    function onChange(value: string) {
        setSearchText(value)
    }

    function loadAllCharacters() {
        //axios für alle Netzwerk Request
        // .get Http Get Request  in den klammern kommt die URL
        axios.get("https://rickandmortyapi.com/api/character")
            //Wenn der Request erfolgreich war dann .then, wir geben eine Funktion an die ausgeführt wird als Parameter bekommen wir Response
            .then((response) => {
                // Wir speichern die Informationen die im Response Body stehen ab
                setCharacters(response.data.results)
            })
            //.catch für den Fehlerfall
            .catch((reason) => {
                //vorerst nur eine Konsolenausgabe    später Fehlermeldung für den Nutzer
                console.error(reason)
            })
    }

    return (
        <div className="App">

            <Header/>
            {/*inputText: Was soll im Input Feld stehen? onTextChange: Was soll passieren wenn die ActionBar Komponente der App mitteilt das sich der Text geänder hat*/}
            <ActionBar inputText={searchText} onChange={onChange}/>
            {/* Wurden Charactere gefunden? DANN zeige die CharacterGallery an, mit NUR den gefilterten Characteren */}
            {filteredCharacters.length > 0 && <CharacterGallery characters={filteredCharacters}/>}
            {/* Wurden keine Charactere gefunden? DANN zeige Fehlermeldung an */}
            {filteredCharacters.length === 0 && <p className={"noCharacterfoundText"}>Im Sorry, No Character found!</p>}
            {<br/>}


            {/*/!*Wurden Charactere gefunden?*!/*/}
            {/*{filteredCharacters.length > 0*/}
            {/*    // Dann zeige CharacterGallery*/}
            {/*    ? <CharacterGallery characters={filteredCharacters}/>*/}
            {/*    // Sonst zeige Fehlermeldung*/}
            {/*    : <p>No Character found!</p>}*/}
        </div>
    );
}

