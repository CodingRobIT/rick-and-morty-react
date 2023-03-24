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
        let allCharacters: any[] | ((prevState: Character[]) => Character[]) = [];
        let numPages = 34; // Anzahl der Seiten mit Ergebnissen

        for (let page = 1; page <= numPages; page++) {
            axios.get("https://rickandmortyapi.com/api/character?page=" + page)
                .then((response) => {
                    // @ts-ignore
                    allCharacters = [...allCharacters, ...response.data.results];
                    if (page === numPages) {
                        setCharacters(allCharacters);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    return (
        <div className="App">

            <Header/>
            {/*inputText: Was soll im Input Feld stehen? onTextChange: Was soll passieren wenn die ActionBar Komponente der App mitteilt das sich der Text geänder hat*/}
            <ActionBar inputText={searchText} onChange={onChange}/>
            {/* Wurden Charactere gefunden? DANN zeige die CharacterGallery an, mit NUR den gefilterten Characteren */}
            {filteredCharacters.length > 0 && <CharacterGallery characters={filteredCharacters}/>}
            {/* Wurden keine Charactere gefunden? DANN zeige Fehlermeldung an */}
            {filteredCharacters.length === 0 && <p className={"noCharacterFound"}>Im Sorry, No Character found!</p>}
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

