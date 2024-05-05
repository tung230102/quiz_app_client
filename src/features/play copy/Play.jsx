import { useTitleDynamic } from "~/hooks";
import Main from "./components/Main";

function Play() {
    useTitleDynamic("Play");

    return <Main />;
}

export default Play;
