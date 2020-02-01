import React from "react";
import styles from "./Edit.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {
    ADD_TEXT,
    EDIT_COMMON_STYLES,
    DELETE_IMAGE,
    DELETE_TEXT,
    SELECT_IMAGE,
    SELECT_TEXT, EDIT_TEXT_STYLES
} from "../../store/actions";
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
    MdTextFields, GiSplitCross, MdFormatColorText, MdFormatColorFill, IoIosColorFilter, FaFont
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
    EDIT_TEXT_STYLES: any,
    EDIT_COMMON_STYLES: any,
    DELETE_IMAGE: any,
    DELETE_TEXT: any,
    SELECT_IMAGE: any,
    SELECT_TEXT: any,
}

const Edit: React.FC<IProps> = (props) => {
    let [selected, select] = React.useState("common");
    let [isFilter, filterOpen] = React.useState(false);

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

    const optionsSelected = () => {
        if (selected === "common") {
            return (
               <div className={styles.options} style={{background: "transparent"}}>
                   <div className={styles.topList}>
                       <span style={{display: "flex", alignItems: "center", padding: "0 5px"}}>
                           <p>width: </p>
                           <input type="number" defaultValue={props.stylesCommon.width.replace("px", "")}
                                  onChange={(e) => props.EDIT_COMMON_STYLES({width: e.target.value + "px"})}
                           />
                       </span>
                       <span style={{display: "flex", alignItems: "center", padding: "0 5px"}}>
                           <p>height: </p>
                           <input type="number" defaultValue={props.stylesCommon.height.replace("px", "")}
                                  onChange={(e) => props.EDIT_COMMON_STYLES({height: e.target.value + "px"})}
                           />
                       </span>
                       <span className={styles.icon} style={{width: "auto", paddingLeft: "5px"}}
                             placeholder="Background-Color"
                       >
                           <MdFormatColorFill />
                           <input type="color" defaultValue={props.stylesCommon.backgroundColor}
                                  onChange={(e) => props.EDIT_COMMON_STYLES({backgroundColor: e.target.value})}
                           />
                       </span>
                       <div className={styles.iconContainer}>
                                    <span className={styles.icon}
                                          onClick={(e) => filterOpen(!isFilter)}
                                          placeholder="Filters"
                                    >
                                        <IoIosColorFilter />
                                    </span>
                                        {
                                            isFilter ?
                                                <div className={styles.options}>
                                                    <span>
                                                        <p>blur: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `blur(${e.target.value}px)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>brightness: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `brightness(${e.target.value}%)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>contrast: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `contrast(${e.target.value}%)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>grayscale: </p>
                                                        <input type="range" step={.1} defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `grayscale(${e.target.value})`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>saturate: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `saturate(${e.target.value}%)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>sepia: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `sepia(${e.target.value}%)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>hue-rotate: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `hue-rotate(${e.target.value}deg)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>invert: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `invert(${e.target.value}%)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <p>opacity: </p>
                                                        <input type="range" defaultValue={0}
                                                               onChange={(e) => props.EDIT_COMMON_STYLES({filter: `opacity(${e.target.value}%)`})}
                                                        />
                                                    </span>
                                                    <span>
                                                        <button onClick={(e) => props.EDIT_COMMON_STYLES({filter: `none`})}
                                                        >NONE</button>
                                                    </span>
                                                </div>
                                                :
                                                null
                                        }
                       </div>
                   </div>
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
                                    <div className={`${styles.wrapper} ${i === props.selectedImage ? styles.selectedItem : ""}`}
                                         key={i}
                                         onClick={() => props.SELECT_IMAGE(i)}
                                    >
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
        EDIT_TEXT_STYLES: (index: number, property: string, value: any) => dispatch(EDIT_TEXT_STYLES(index, property, value)),
        EDIT_COMMON_STYLES: (styles: any) => dispatch(EDIT_COMMON_STYLES(styles)),
        DELETE_IMAGE: (index: number) => dispatch(DELETE_IMAGE(index)),
        DELETE_TEXT: (index: number) => dispatch(DELETE_TEXT(index)),
        SELECT_IMAGE: (index: number) => dispatch(SELECT_IMAGE(index)),
        SELECT_TEXT: (index: number) => dispatch(SELECT_TEXT(index))
    }
})(Edit)