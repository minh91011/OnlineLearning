import React from "react";

function ReadMoreLess(props) {
    const [isReadMoreShown, setReadMoreShown] = React.useState(false)

    function toggle() {
        setReadMoreShown(prevState => !prevState)
    }

    return (
        <div className="readMoreLess">
            <p>{isReadMoreShown ? props.text : props.text.substring(0, props.limit)}
                <span>
                    {props.text.length > props.limit &&
                        <button className="readMoreLess--button" onClick={toggle}>
                            {isReadMoreShown ? "...Show less" : "...Read more"}
                        </button>
                    }

                </span>
            </p>

        </div>

    )
}

export default ReadMoreLess