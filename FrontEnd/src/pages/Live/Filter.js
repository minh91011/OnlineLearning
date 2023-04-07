import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function Filter(props) {
    function handleChange(event) {
        const { value } = event.target
        props.setContent(prev => value)
        
        //Disable this if you don't want update every time input change
        props.setNum(prev => -prev)
    }
    function submitChange() {
        props.setNum(prev => prev + 1)
    }
    function clearFilter(){
        props.setOrderby("")
        props.setContent("")
        props.setNum(prev => prev + 1)
    }
    function upvoteAsc(){
        props.setOrderby("upvoteAsc")
        props.setNum(prev => -prev)
    }
    function upvoteDes(){
        props.setOrderby("upvoteDes")
        props.setNum(prev => -prev)
    }
    function downvoteAsc(){
        props.setOrderby("downvoteAsc")
        props.setNum(prev => -prev)
    }
    function downvoteDes(){
        props.setOrderby("downvoteDes")
        props.setNum(prev => -prev)
    }
    function dateDes(){
        props.setOrderby("dateDes")
        props.setNum(prev => -prev)
    }
    function dateAsc(){
        props.setOrderby("dateAsc")
        props.setNum(prev => -prev)
    }
    
    return (
        <div className="filter--container">
            <div className="filter--input--container">
                <input
                    className="filter--input"
                    placeholder="Search post...."
                    value={props.content}
                    onChange={handleChange}
                />
                <button className="filter--input--button" onClick={submitChange}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="filter--input--icon" />
                </button>
            </div>
            <div className="filter--button--container">
                <div className="filter--button--item">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="filter--icon"
                    />
                    <button className="filter--button">
                        <FontAwesomeIcon
                            icon={faArrowUpWideShort}
                            className={props.orderby === "upvoteDes" ? "filter--icon blue" : "filter--icon"}
                            onClick={upvoteDes}
                        />
                    </button>
                    <button className="filter--button">
                        <FontAwesomeIcon
                            icon={faArrowUpShortWide}
                            className={props.orderby === "upvoteAsc" ? "filter--icon blue" : "filter--icon"}
                            onClick={upvoteAsc}
                        />
                    </button>


                </div>
                <div className="filter--button--item">
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="filter--icon"
                    />
                    <button className="filter--button">
                        <FontAwesomeIcon
                            icon={faArrowUpWideShort}
                            className={props.orderby === "downvoteDes" ? "filter--icon blue" : "filter--icon"}
                            onClick={downvoteDes}
                        />
                    </button>
                    <button className="filter--button">
                        <FontAwesomeIcon
                            icon={faArrowUpShortWide}
                            className={props.orderby === "downvoteAsc" ? "filter--icon blue" : "filter--icon"}
                            onClick={downvoteAsc}
                        />
                    </button>
                </div>

                <div className="filter--button--item">
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="filter--icon"
                    />
                    <button className="filter--button">
                        <FontAwesomeIcon
                            icon={faArrowUpWideShort}
                            className={props.orderby === "dateDes" ? "filter--icon blue" : "filter--icon"}
                            onClick={dateDes}
                        />
                    </button>
                    <button className="filter--button">
                        <FontAwesomeIcon
                            icon={faArrowUpShortWide}
                            className={props.orderby === "dateAsc" ? "filter--icon blue" : "filter--icon"}
                            onClick={dateAsc}
                        />
                    </button>
                </div>
            </div>
            <button className="filter--button--clear" onClick={clearFilter}>
                Clear filter
            </button>
        </div>

    )
}