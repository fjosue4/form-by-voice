import React from "react";

function BrowserAlert (props) {
    const currentBrowser = props.browser
    return(
        <div className="web-alert">
            ⚠️ This website is optimized for Google Chrome, {currentBrowser} could have issues.
        </div>
    )
}

export default BrowserAlert;