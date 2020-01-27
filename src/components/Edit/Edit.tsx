import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT} from "../../store/actions";
import AddText from "../AddText/AddText";
import Upload from "../Upload/Upload";
import {EDIT_TEXT} from "../../store/actions/texts";

interface IProps {
    selectedText: number,

    ADD_TEXT: any,
    EDIT_TEXT: any,
}

const Edit: React.FC<IProps> = (props) => {


    return(
        <div className={styles.edit}>
            <div className={styles.right}>
                <label>
                    <p>background-color: </p>
                    <input type="color" />
                </label>
                <label>
                    <p>Load Image: </p>
                    <Upload />
                </label>
                <label>
                    <p>Add Text: </p>
                    <AddText />
                </label>
                <label>
                    <p>color: </p>
                    <input type="color" onChange={(e) => props.EDIT_TEXT(props.selectedText, {fill: e.target.value})}/>
                    <p>font-size: </p>
                    <input type="number" onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontSize: e.target.value + "px"})}/>
                    <p>font-family: </p>
                    <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontFamily: e.target.value})}>
                        <option value="serif">serif</option>
                        <option value="sans-serif">sans-serif</option>
                        <option value="monospace">monospace</option>
                        <option value="cursive">cursive</option>
                        <option value="fantasy">fantasy</option>
                        <option value="system-ui">system-ui</option>
                    </select>
                    <p>text-decoration: </p>
                    <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {textDecoration: e.target.value})}>
                        <option value="none">none</option>
                        <option value="underline">underline</option>
                        <option value="overline">overline</option>
                        <option value="line-through">line-through</option>
                    </select>
                    <p>font-style: </p>
                    <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontStyle: e.target.value + "px"})}>
                        <option value="normal">normal</option>
                        <option value="italic">italic</option>
                        <option value="oblique">oblique</option>
                    </select>
                    <p>font-weight: </p>
                    <input type="number" min={100} max={900} step={100}
                           onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontWeight: e.target.value + "px"})}
                    />
                </label>
            </div>
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        selectedText: state.texts.selectedText
    };
}, (dispatch) => {
    return {
        ADD_TEXT: (text: string) => dispatch(ADD_TEXT(text)),
        EDIT_TEXT: (index: number, styles: any) => dispatch(EDIT_TEXT(index, styles))
    }
})(Edit)