import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT, EDIT_TEXT, EDIT_COMMON_STYLES, DELETE_IMAGE, DELETE_TEXT} from "../../store/actions";
import AddText from "../AddText/AddText";
import Upload from "../Upload/Upload";
import {
    AiOutlineAlignCenter,
    AiOutlineAlignLeft, AiOutlineAlignRight,
    AiOutlineBold,
    AiOutlineItalic, AiOutlineStrikethrough,
    AiOutlineUnderline,
    FaRegImages, TiDeleteOutline,
    IoMdOptions,
    MdTextFields, GiSplitCross, MdFormatColorText, MdFormatColorFill
} from "react-icons/all";

interface IProps {
    images: any,
    texts: any,
    selectedText: number,
    selectedImage: number,

    stylesImages: any,
    stylesTexts: any,
    stylesCommon: any,

    ADD_TEXT: any,
    EDIT_TEXT: any,
    EDIT_COMMON_STYLES: any,
    DELETE_IMAGE: any,
    DELETE_TEXT: any,

}

const Edit: React.FC<IProps> = (props) => {
    let [selected, select] = React.useState("");

    const onClickIconHandler = (property: string, value_1: string, value_2: string) => {
        props.stylesTexts[props.selectedText][property] === value_2 ?
            props.EDIT_TEXT(props.selectedText, property, value_1)
            :
            props.EDIT_TEXT(props.selectedText, property, value_2)
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
                       <input type="color" defaultValue={props.stylesCommon.backgroundColor}
                              onChange={(e) => props.EDIT_COMMON_STYLES({backgroundColor: e.target.value})}
                       />
                   </label>
                   <label>
                       <p>width: </p>
                       <input type="number"  defaultValue={props.stylesCommon.width}
                              onChange={(e) => props.EDIT_COMMON_STYLES({width: e.target.value + "px"})}
                       />
                   </label>
                   <label>
                       <p>height: </p>
                       <input type="number" defaultValue={props.stylesCommon.height}
                              onChange={(e) => props.EDIT_COMMON_STYLES({height: e.target.value + "px"})}
                       />
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
                            props.images.map((image: any, i: number) => {
                                return (
                                    <div className={`${styles.wrapper} ${i === props.selectedImage ? styles.selectedItem : ""}`} key={i}>
                                        <img src={image} alt="#" />
                                        <div className={styles.delete}>
                                            <GiSplitCross style={{width: "20px", height: "100%", cursor: "pointer"}}
                                                             onClick={() => props.DELETE_IMAGE(i)}
                                            />
                                        </div>
                                    </div>
                                )
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
                    <div className={styles.list}>
                        {
                            props.texts.map((text: any, i: number) => {
                                return (
                                    <div className={`${styles.wrapper} ${i === props.selectedText ? styles.selectedItem : ""}`}
                                         style={{width: "calc(100% - 2px)", display: "flex", justifyContent: "center", border: "1px dashed"}}
                                         key={i}
                                    >
                                        <span style={props.stylesTexts[props.selectedText]}>{text}</span>
                                        <div className={styles.delete} style={{right: "0"}}>
                                            <GiSplitCross style={{width: "20px", height: "100%", cursor: "pointer"}}
                                                             onClick={() => props.DELETE_TEXT(i)}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        props.stylesTexts[props.selectedText] ?
                            <div className={styles.topList}>
                                <span className={styles.icon} style={{width: "auto"}}>
                                    <MdFormatColorText />
                                    <input type="color" onChange={(e) => props.EDIT_TEXT(props.selectedText, "color", e.target.value)}/>
                                </span>
                                <span className={styles.icon} style={{width: "auto"}}>
                                    <MdFormatColorFill />
                                    <input type="color" onChange={(e) => props.EDIT_TEXT(props.selectedText, "backgroundColor", e.target.value)}/>
                                </span>
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
                <div className={`${styles.item} ${selected === "common" ? styles.selected : ""}`}
                     onClick={() => selected === "common" ? select("") : select("common")}
                >
                    <IoMdOptions />
                </div>
                <div className={`${styles.item} ${selected === "image" ? styles.selected : ""}`}
                     onClick={() => selected === "image" ? select("") : select("image")}
                >
                    <FaRegImages />
                </div>
                <div className={`${styles.item} ${selected === "text" ? styles.selected : ""}`}
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
        texts: state.styles.texts,
        selectedText: state.styles.selectedText,
        selectedImage: state.styles.selectedImage,
        stylesImages: state.styles.stylesImages,
        stylesTexts: state.styles.stylesTexts,
        stylesCommon: state.styles.stylesCommon
    };
}, (dispatch) => {
    return {
        ADD_TEXT: (text: string) => dispatch(ADD_TEXT(text)),
        EDIT_TEXT: (index: number, property: string, value: any) => dispatch(EDIT_TEXT(index, property, value)),
        EDIT_COMMON_STYLES: (styles: any) => dispatch(EDIT_COMMON_STYLES(styles)),
        DELETE_IMAGE: (index: number) => dispatch(DELETE_IMAGE(index)),
        DELETE_TEXT: (index: number) => dispatch(DELETE_TEXT(index)),
    }
})(Edit)