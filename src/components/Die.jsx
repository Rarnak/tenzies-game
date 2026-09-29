export default function Die(props) {

    return (
        < button
            className={`dice-button ${props.isHeld ? "held" : ""}`}
            // onClick={() => props.hold(props.id)}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`This is a die with a value of ${props.value}, ${props.isHeld? 'is held' : 'not held'}`}
        >
            {props.value}
        </button >
    )
}