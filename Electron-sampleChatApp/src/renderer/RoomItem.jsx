import React from "react";
import { Link } from "react-router";

const LINK_STYLE = {
    color: "inherit",
    textDecoration: "none"
};
/**
 * room1つを返す関数
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function RoomItem(props) {
    const { selected } = props;
    const { description, key } = props.room;
    return (
        <div className={selected ? "list-group-item selected" : "list-group-item"}>
            <Link to={`/rooms/${key}`} state={LINK_STYLE}>
                <div className="media-body">
                    <strong>{description}</strong>
                </div>
            </Link>
        </div>
    );
}