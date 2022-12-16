import React from "react";
import { queryMapURL } from "../utils";
const Map = (props) => {
  const { address, width, height } = props;
  return (
    <section className="map-container">
      <iframe
        title="college-map"
        height={height - 60 || "400"}
        width={Math.floor((width * 2) / 3)}
        style={{ border: 0, borderRadius: "4px" }}
        referrerpolicy="no-referrer-when-downgrade"
        src={queryMapURL(address)}
      ></iframe>
    </section>
  );
};

export default Map;
