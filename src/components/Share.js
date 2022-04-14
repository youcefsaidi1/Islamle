import React from "react";
import {Button} from 'reactstrap'

function Share({ label, text, title }) {

    let url = "https://islamle.com"
    const details = { url, title, text };
  
    const share = async () => {
      if (navigator.share) {
        try {
          await navigator
            .share(details)
            .then(() =>
              console.log("Thank you for sharing!")
            );
        } catch (error) {
          alert(`There was an error sharing: ${error}`);
        }
      } else {
        console.log(
          "Sharing is currently not supported by your browser."
        );
      }
    };


    return (
      <Button color='success' className="Share" onClick={share}>
        <span className="ShareText">{label}</span>
      </Button>
    );
  }

export default Share;