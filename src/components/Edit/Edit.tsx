import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT, EDIT_TEXT, EDIT_COMMON_STYLES} from "../../store/actions";
import AddText from "../AddText/AddText";
import Upload from "../Upload/Upload";
import {FaRegImages, IoMdOptions, MdTextFields} from "react-icons/all";

interface IProps {
    images: any,
    selectedText: number,

    ADD_TEXT: any,
    EDIT_TEXT: any,
    EDIT_COMMON_STYLES: any,

}

const Edit: React.FC<IProps> = (props) => {
    let [selected, select] = React.useState("");

    const optionsSelected = () => {
        if (selected === "common") {
            return (
               <div className={styles.options}>
                   <label>
                       <p>background-color: </p>
                       <input type="color" onChange={(e) => props.EDIT_COMMON_STYLES({backgroundColor: e.target.value})}/>
                   </label>
                   <label>
                       <p>width: </p>
                       <input type="number" onChange={(e) => props.EDIT_COMMON_STYLES({width: e.target.value + "px"})} />
                   </label>
                   <label>
                       <p>height: </p>
                       <input type="number" onChange={(e) => props.EDIT_COMMON_STYLES({height: e.target.value + "px"})} />
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
        } else {
            return null;
        }
    };

    return(
        <div className={styles.edit}>
            <div className={styles.sidebar}>
                <div className={styles.item}
                     onClick={() => selected === "common" ? select("") : select("common")}
                >
                    <IoMdOptions />
                </div>
                <div className={styles.item}
                     onClick={() => selected === "image" ? select("") : select("image")}
                >
                    <FaRegImages />
                </div>
                <div className={styles.item}
                     onClick={() => selected === "text" ? select("") : select("text")}
                >
                    <MdTextFields />
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
        images: state.styles.images,
        selectedText: state.styles.selectedText
    };
}, (dispatch) => {
    return {
        ADD_TEXT: (text: string) => dispatch(ADD_TEXT(text)),
        EDIT_TEXT: (index: number, styles: any) => dispatch(EDIT_TEXT(index, styles)),
        EDIT_COMMON_STYLES: (styles: any) => dispatch(EDIT_COMMON_STYLES(styles)),
    }
})(Edit)