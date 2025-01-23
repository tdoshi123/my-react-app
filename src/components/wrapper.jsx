import React from "react";
import PropTypes from "prop-types";
import "../app.css";

function Wrapper({ children }) {
    return <div className="profiles-container">{children}</div>;
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;