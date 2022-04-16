import React from "react";
import {Button} from 'reactstrap'

function Share({ label, text, setShow }) {
    let url = "https://islamle.com";
    const details = { url, text };
  
    const share = async () => {
      if (navigator.share) {
        try {
          await navigator
            .share(details)
            .then(() =>
              console.log("Thank you for sharing!")
            ).catch(err => {
              console.log(err)
            });
        } catch (error) {
          console.log(error);
          setShow(false);
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
