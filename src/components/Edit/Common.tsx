import React from "react";
import styles from "./Edit.module.scss";
import {IoIosColorFilter, MdFormatColorFill} from "react-icons/all";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {
    EDIT_COMMON_STYLES,
} from "../../store/actions";

interface IProps {
    isFilter: boolean,
    filterOpen: any,

    stylesCommon: any,
    EDIT_COMMON_STYLES: any,
}

const Common: React.FC<IProps> = (props) => {
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
                          onClick={(e) => props.filterOpen(!props.isFilter)}
                          placeholder="Filters"
                    >
                        <IoIosColorFilter />
                    </span>
                    {
                        props.isFilter ?
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
};

export default connect((state: IReduxState) => {
    return {
        stylesCommon: state.styles.stylesCommon,
    };
}, (dispatch) => {
    return {
        EDIT_COMMON_STYLES: (styles: any) => dispatch(EDIT_COMMON_STYLES(styles))
    }
})(Common)