import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT} from "../../store/actions";
import AddText from "../AddText/AddText";
import Upload from "../Upload/Upload";
import {EDIT_TEXT} from "../../store/actions/texts";
import {FaRegImages, IoMdOptions, MdTextFields} from "react-icons/all";
import {EDIT_ALL} from "../../store/actions/common";

interface IProps {
    images: any,
    selectedText: number,

    ADD_TEXT: any,
    EDIT_TEXT: any,
    EDIT_ALL: any,
}

const Edit: React.FC<IProps> = (props) => {
    let [selected, select] = React.useState("common");

    const optionsSelected = () => {
        if (selected === "common") {
            return (
               <div className={styles.options}>
                   <label>
                       <p>background-color: </p>
                       <input type="color" onChange={(e) => props.EDIT_ALL({backgroundColor: e.target.value})}/>
                   </label>
                   <label>
                       <p>width: </p>
                       <input type="number" onChange={(e) => props.EDIT_ALL({width: e.target.value + "px"})} />
                   </label>
                   <label>
                       <p>height: </p>
                       <input type="number" onChange={(e) => props.EDIT_ALL({height: e.target.value + "px"})} />
                   </label>
               </div>
            )
        } else if(selected === "image") {
            return (
                <div className={styles.options}>
                    <p>Upload Image: </p>
                    <Upload />
                    <div className={styles.list}>
                        {
                            props.images.map((e: any, i: number) => {
                                return <img src={e} alt="#" key={i} />
                            })
                        }
                    </div>
                </div>
            )
        } else if (selected === "text") {
            return (
                <div className={styles.options}>
                    <p>Edit Text: </p>
                    <AddText />
                    <label>
                        <p>color: </p>
                        <input type="color" onChange={(e) => props.EDIT_TEXT(props.selectedText, {color: e.target.value})}/>
                    </label>
                    <label>
                        <p>font-family: </p>
                        <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontFamily: e.target.value})}>
                            <option value="serif">serif</option>
                            <option value="sans-serif">sans-serif</option>
                            <option value="monospace">monospace</option>
                            <option value="cursive">cursive</option>
                            <option value="fantasy">fantasy</option>
                            <option value="system-ui">system-ui</option>
                        </select>
                    </label>
                    <label>
                        <p>text-decoration: </p>
                        <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {textDecoration: e.target.value})}>
                            <option value="none">none</option>
                            <option value="underline">underline</option>
                            <option value="overline">overline</option>
                            <option value="line-through">line-through</option>
                        </select>
                    </label>
                    <label>
                        <p>font-style: </p>
                        <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontStyle: e.target.value})}>
                            <option value="normal">normal</option>
                            <option value="italic">italic</option>
                            <option value="oblique">oblique</option>
                        </select>
                    </label>
                    <label>
                        <p>font-weight: </p>
                        <input type="number" min={100} max={900} step={100}
                               onChange={(e) => props.EDIT_TEXT(props.selectedText, {fontWeight: e.target.value})}
                        />
                    </label>
                    <label>
                        <p>text-align: </p>
                        <select onChange={(e) => props.EDIT_TEXT(props.selectedText, {textAlign: e.target.value})}>
                            <option value="center">center</option>
                            <option value="left">left</option>
                            <option value="right">right</option>
                        </select>
                    </label>
                </div>
            )
        }
    };

    return(
        <div className={styles.edit}>
            <div className={styles.sidebar}>
                <div className={styles.item}>
                    <IoMdOptions onClick={() => select("common")} />
                </div>
                <div className={styles.item}>
                    <FaRegImages onClick={() => select("image")} />
                </div>
                <div className={styles.item}>
                    <MdTextFields onClick={() => select("text")} />
                </div>
            </div>
            {
                optionsSelected()
            }
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        images: state.images.images,
        selectedText: state.texts.selectedText
    };
}, (dispatch) => {
    return {
        ADD_TEXT: (text: string) => dispatch(ADD_TEXT(text)),
        EDIT_TEXT: (index: number, styles: any) => dispatch(EDIT_TEXT(index, styles)),
        EDIT_ALL: (styles: any) => dispatch(EDIT_ALL(styles))
    }
})(Edit)