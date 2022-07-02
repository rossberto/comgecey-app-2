import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function Fetching(props) {
  return (
    <React.Fragment>
      {<ClipLoader
        css={{
          display: "inline-block",
          margin: "0 auto",
          borderColor: "inherit",
          verticalAlign:"middle"
        }}
        size={35}
        color={"#123abc"}
        loading={!props.fetched}
      />}
      {props.fetched ? '' : <p style={{margin: "auto 20px", display: "inline-block", verticalAlign:"middle"}}> Cargando...</p> }

    </React.Fragment>
  );
}
