import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import AddText from "../AddText/AddText";
import {
    AiOutlineAlignCenter,
    AiOutlineAlignLeft, AiOutlineAlignRight,
    AiOutlineBold,
    AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline,
    FaFont,
    GiSplitCross,
    MdFormatColorFill,
    MdFormatColorText
} from "react-icons/all";
import {DELETE_TEXT, EDIT_TEXT_STYLES, SELECT_TEXT} from "../../store/actions";

interface IProps {
    // isFilter: boolean,
    // filterOpen: any,

    texts: any,
    stylesTexts: any,
    selectedText: number,
    EDIT_TEXT_STYLES: any,
    SELECT_TEXT: any,
    DELETE_TEXT: any,
}

const Texts: React.FC<IProps> = (props) => {

    const onClickIconHandler = (property: string, value_1: string, value_2: string) => {
        console.log(property, value_1, value_2);
        props.stylesTexts[props.selectedText][property] === value_2 ?
            props.EDIT_TEXT_STYLES(props.selectedText, property, value_1)
            :
            props.EDIT_TEXT_STYLES(props.selectedText, property, value_2)
    };

    const classSelect = (property: string, value: string) => {
        if(props.stylesTexts[props.selectedText][property] === value) {
            return " " + styles.selected
        } else {
            return ""
        }
    };

    return (
        <div className={styles.options}>
            <p>Add Text: </p>
            <AddText />
            <div className={styles.list}>
                {
                    props.texts.map((text: any, i: number) => {
                        return (
                            <div className={`${styles.wrapper} ${i === props.selectedText ? styles.selectedItem : ""}`}
                                 style={{width: "calc(100% - 2px)", display: "flex", justifyContent: "center", border: "1px dashed"}}
                                 key={i}
                                 onClick={() => props.SELECT_TEXT(i)}
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
                                <span className={styles.icon} style={{width: "auto", paddingLeft: "5px"}}>
                                    <FaFont />
                                    <select onChange={(e) => props.EDIT_TEXT_STYLES(props.selectedText, "fontFamily", e.target.value)}>
                                        <option value='sans-serif' style={{fontFamily: "sans-serif"}}>sans-serif</option>
                                        <option value='serif' style={{fontFamily: "serif"}}>serif</option>
                                        <option value='monospace' style={{fontFamily: "monospace"}}>monospace</option>
                                        <option value='cursive' style={{fontFamily: "cursive"}}>cursive</option>
                                        <option value='fantasy' style={{fontFamily: "fantasy"}}>fantasy</option>
                                        <option value='system-ui' style={{fontFamily: "system-ui"}}>system-ui</option>

                                    </select>
                                </span>
                        <span className={styles.icon} style={{width: "auto", paddingLeft: "5px"}}>
                                    <MdFormatColorText />
                                    <input type="color" onChange={(e) => props.EDIT_TEXT_STYLES(props.selectedText, "color", e.target.value)}/>
                                </span>
                        <span className={styles.icon} style={{width: "auto", paddingLeft: "5px"}}>
                                    <MdFormatColorFill />
                                    <input type="color" onChange={(e) => props.EDIT_TEXT_STYLES(props.selectedText, "backgroundColor", e.target.value)}/>
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
};

export default connect((state: IReduxState) => {
    return {
        texts: state.styles.texts,
        stylesTexts: state.styles.stylesTexts,
        selectedText: state.styles.selectedText,
    };
}, (dispatch) => {
    return {
        EDIT_TEXT_STYLES: (index: number, property: string, value: any) => dispatch(EDIT_TEXT_STYLES(index, property, value)),
        SELECT_TEXT: (index: number) => dispatch(SELECT_TEXT(index)),
        DELETE_TEXT: (index: number) => dispatch(DELETE_TEXT(index)),
    }
})(Texts)