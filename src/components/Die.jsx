export default function Die(props) {

    return (
        < button
            className={`dice-button ${props.isHeld ? "held" : ""}`}
            // onClick={() => props.hold(props.id)}
            onClick={props.hold}
        >
            {props.value}
        </button >
    )
}