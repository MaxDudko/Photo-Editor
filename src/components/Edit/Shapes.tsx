import React from "react";
import styles from "./Edit.module.scss";
import {GiSplitCross, MdBorderStyle, MdFormatColorFill, MdFormatColorText, MdStarBorder} from "react-icons/all";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {
    ADD_SHAPE,
    DELETE_SHAPE,
    EDIT_SHAPE_STYLES,
    SELECT_SHAPE
} from "../../store/actions";

interface IProps {
    shapes: any,
    stylesShapes: any,
    selectedShape: number,
    ADD_SHAPE: any,
    EDIT_SHAPE_STYLES: any,
    SELECT_SHAPE: any,
    DELETE_SHAPE: any,
}
const Shapes: React.FC<IProps> = (props) => {
    return(
        <div className={styles.options}>
            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                <span className={styles.icon} title="Rect">
                    <svg width="50" height="50"
                         xmlns="http://www.w3.org/2000/svg"
                         onClick={(e) => props.ADD_SHAPE('rect')}
                    >
                        <rect width="47" height="47"
                              stroke="white" fill="transparent" strokeWidth="3"
                        />
                    </svg>
                </span>
                <span className={styles.icon} title="Ellipse">
                    <svg width="50" height="50"
                         xmlns="http://www.w3.org/2000/svg"
                         onClick={(e) => props.ADD_SHAPE('ellipse')}
                    >
                        <ellipse cx="25" cy="25" rx="22" ry="22"
                                 stroke="white" fill="transparent" strokeWidth="3"
                        />
                    </svg>
                </span>
                <span className={styles.icon} title="Line">
                    <svg width="50" height="50"
                         xmlns="http://www.w3.org/2000/svg"
                         onClick={(e) => props.ADD_SHAPE('line')}
                    >
                        <line x1="3" x2="47" y1="3" y2="47"
                              stroke="white" fill="transparent" strokeWidth="3"
                        />
                    </svg>
                </span>
                <span className={styles.icon} title="Star" style={{fontSize: "50px"}}>
                    <MdStarBorder />
                </span>
            </div>
            {
                props.stylesShapes[props.selectedShape] ?
                    <div className={styles.topList}>
                        <span className={styles.icon} style={{width: "auto", paddingLeft: "5px"}}>
                            <MdFormatColorText />
                            <input type="color" onChange={(e) => props.EDIT_SHAPE_STYLES(props.selectedShape, "stroke", e.target.value)}/>
                        </span>
                        <span className={styles.icon} style={{width: "auto", paddingLeft: "5px"}}>
                            <MdFormatColorFill />
                            <input type="color" onChange={(e) => props.EDIT_SHAPE_STYLES(props.selectedShape, "fill", e.target.value)}/>
                        </span>
                        <span style={{display: "flex", alignItems: "center", width: "auto", paddingLeft: " 0 5px"}}>
                            <MdBorderStyle />
                            <input type="number" defaultValue={+props.stylesShapes[props.selectedShape]["strokeWidth"]}
                                   onChange={(e) => props.EDIT_SHAPE_STYLES(props.selectedShape, "strokeWidth", e.target.value)}
                            />
                        </span>

                    </div>
                    :
                    null
            }
            <div className={styles.list} style={{width: "100%"}}>
                {
                    props.shapes.map((shape: any, i: number) => {
                        return (
                            <div className={`${styles.wrapper} ${i === props.selectedShape ? styles.selectedItem : ""}`}>
                                <svg style={
                                    {
                                        width: '150px',
                                        height: "100px",
                                    }
                                }
                                     xmlns="http://www.w3.org/2000/svg"
                                     key={i}
                                     onClick={() => props.SELECT_SHAPE(i)}
                                >
                                    {
                                        (
                                            shape === "rect"
                                            &&
                                            <rect width="100%"
                                                  height="100%"
                                                  style={{...props.stylesShapes[props.selectedShape]}}
                                            />
                                        )
                                        ||
                                        (
                                            shape === "ellipse"
                                            &&
                                            <ellipse cx="50%" cy="50%"
                                                     rx={70}
                                                     ry={40}
                                                     style={{...props.stylesShapes[props.selectedShape]}}
                                            />
                                        )
                                        ||
                                        (
                                            shape === "line"
                                            &&
                                            <line x1={5}
                                                  x2={145}
                                                  y1={50}
                                                  y2={50}
                                                  style={{...props.stylesShapes[props.selectedShape]}}
                                            />
                                        )
                                    }
                                </svg>
                                <div className={styles.delete} style={{right: "0"}}>
                                    <GiSplitCross style={{width: "20px", height: "100%", cursor: "pointer"}}
                                                  onClick={() => props.DELETE_SHAPE(i)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        shapes: state.styles.shapes,
        stylesShapes: state.styles.stylesShapes,
        selectedShape: state.styles.selectedShape,
    };
}, (dispatch) => {
    return {
        ADD_SHAPE: (shape: any) => dispatch(ADD_SHAPE(shape)),
        EDIT_SHAPE_STYLES: (index: number, property: string, value: any) => dispatch(EDIT_SHAPE_STYLES(index, property, value)),
        SELECT_SHAPE: (index: number) => dispatch(SELECT_SHAPE(index)),
        DELETE_SHAPE: (index: number) => dispatch(DELETE_SHAPE(index)),
    }
})(Shapes)