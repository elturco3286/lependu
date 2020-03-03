import React from "react";
import { Link } from "react-router-dom";

export class Apps extends React.Component {
  render() {
    return (
      <div className="nav">
        <Link to="/pendu">
          <button>Le Pendu</button>
        </Link>
      </div>
    );
  }
}

export default Apps;
