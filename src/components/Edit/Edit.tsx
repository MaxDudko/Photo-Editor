import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT, EDIT_TEXT, EDIT_COMMON_STYLES} from "../../store/actions";
import AddText from "../AddText/AddText";
import Upload from "../Upload/Upload";
import {
    AiOutlineAlignCenter,
    AiOutlineAlignLeft, AiOutlineAlignRight,
    AiOutlineBold,
    AiOutlineItalic, AiOutlineStrikethrough,
    AiOutlineUnderline,
    FaRegImages,
    IoMdOptions,
    MdTextFields
} from "react-icons/all";

interface IProps {
    images: any,
    selectedText: number,
    selectedImage: number,

    stylesImages: any,
    stylesTexts: any

    ADD_TEXT: any,
    EDIT_TEXT: any,
    EDIT_COMMON_STYLES: any,

}

const Edit: React.FC<IProps> = (props) => {
    let [selected, select] = React.useState("");

    const onClickIconHandler = (property: string, value_1: string, value_2: string) => {
        props.stylesTexts[props.selectedText][property] === value_2 ?
            props.EDIT_TEXT(props.selectedText, {[property]: value_1})
            :
            props.EDIT_TEXT(props.selectedText, {[property]: value_2})
    };

    const classSelect = (property: string, value: string) => {
        if(props.stylesTexts[props.selectedText][property] === value) {
            return " " + styles.selected
        } else {
            return ""
        }
    };

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
                    {
                        props.stylesTexts[props.selectedText] ?
                            <div className={styles.topList}>
                                <input type="color" onChange={(e) => props.EDIT_TEXT(props.selectedText, {color: e.target.value})}/>
                                <div className={styles.iconContainer}>
                                    <span className={styles.icon + classSelect("fontStyle", "italic")}
                                          onClick={(e) => onClickIconHandler(
                                              "fontStyle",
                                              "normal",
                                              "italic"
                                          )}
                                    >
                                        <AiOutlineItalic />
                                    </span>
                                    <span className={styles.icon + classSelect("fontWeight", "bold")}
                                          onClick={(e) => onClickIconHandler(
                                              "fontWeight",
                                              "normal",
                                              "bold"
                                          )}
                                    >
                                        <AiOutlineBold />
                                    </span>
                                    <span className={styles.icon + classSelect("textDecoration", "underline")}
                                          onClick={(e) => onClickIconHandler(
                                              "textDecoration",
                                              "none",
                                              "underline"
                                          )}
                                    >
                                        <AiOutlineUnderline />
                                    </span>
                                    <span className={styles.icon + classSelect("textDecoration", "line-through")}
                                          onClick={(e) => onClickIconHandler(
                                              "textDecoration",
                                              "none",
                                              "line-through"
                                          )}
                                    >
                                        <AiOutlineStrikethrough />
                                    </span>
                                </div>
                                <div className={styles.iconContainer}>
                                    <span className={styles.icon + classSelect("textAlign", "left")}
                                          onClick={(e) => onClickIconHandler(
                                              "textAlign",
                                              "none",
                                              "left"
                                          )}
                                    >
                                        <AiOutlineAlignLeft />
                                    </span>
                                    <span className={styles.icon + classSelect("textAlign", "center")}
                                          onClick={(e) => onClickIconHandler(
                                              "textAlign",
                                              "",
                                              "center"
                                          )}
                                    >
                                        <AiOutlineAlignCenter />
                                    </span>
                                    <span className={styles.icon + classSelect("textAlign", "right")}
                                          onClick={(e) => onClickIconHandler(
                                              "textAlign",
                                              "",
                                              "right"
                                          )}
                                    >
                                        <AiOutlineAlignRight />
                                    </span>
                                </div>
                            </div>
                            :
                            null
                    }
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
        selectedText: state.styles.selectedText,
        selectedImage: state.styles.selectedImage,
        stylesImages: state.styles.stylesImages,
        stylesTexts: state.styles.stylesTexts
    };
}, (dispatch) => {
    return {
        ADD_TEXT: (text: string) => dispatch(ADD_TEXT(text)),
        EDIT_TEXT: (index: number, styles: any) => dispatch(EDIT_TEXT(index, styles)),
        EDIT_COMMON_STYLES: (styles: any) => dispatch(EDIT_COMMON_STYLES(styles)),
    }
})(Edit)