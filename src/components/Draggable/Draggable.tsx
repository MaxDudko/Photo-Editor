import React from "react";
import styles from "./Draggable.module.scss";
import ResizableRect from 'react-resizable-rotatable-draggable';
import {TiDeleteOutline} from 'react-icons/ti'
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {ADD_TEXT, SELECT_TEXT} from "../../store/actions";
import {DELETE_IMAGE} from "../../store/actions/images";
import {DELETE_TEXT} from "../../store/actions/texts";


interface IProps {
    content: any,
    index: number,
    isImage: boolean,

    DELETE_IMAGE: any,
    DELETE_TEXT: any,
    SELECT_TEXT: any,
    // SELECT_IMAGE: any,
}

const Draggable: React.FC<IProps> = (props) => {
    let [style, change] = React.useState({
        width: 300,
        height: 100,
        top: 100,
        left: 100,
        rotateAngle: 0
    });

    const handleResize = (style: any, isShiftKey: any, type: any) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style;
        top = Math.round(top);
        left = Math.round(left);
        width = Math.round(width);
        height = Math.round(height);
        change({
            ...style,
            top: top,
            left: left,
            width: width,
            height: height,
        })
    };

    const handleRotate = (rotateAngle: any) => {
        change({
            ...style,
            rotateAngle: rotateAngle
        })
    };

    const handleDrag = (deltaX: any, deltaY: any) => {
        change({
            ...style,
            left: style.left + deltaX,
            top: style.top + deltaY
        })
    };

    const {width, top, left, height, rotateAngle} = style;

    const select = (isImage: boolean) => {
        props.SELECT_TEXT(props.index)
    };
    return(
        <div className={styles.draggable} onClick={() => props.SELECT_TEXT(props.index)}>
            <div style={
                {
                    ...style,
                    transform: `rotate(${style.rotateAngle}deg)`,
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }>
                {
                    props.content
                }
            </div>
            <ResizableRect
                left={left}
                top={top}
                width={width}
                height={height}
                rotateAngle={rotateAngle}
                // aspectRatio={false}
                // minWidth={10}
                // minHeight={10}
                zoomable='n, w, s, e, nw, ne, se, sw'
                // rotatable={true}
                // onRotateStart={this.handleRotateStart}
                onRotate={handleRotate}
                // onRotateEnd={this.handleRotateEnd}
                // onResizeStart={this.handleResizeStart}
                onResize={handleResize}
                // onResizeEnd={this.handleUp}
                // onDragStart={this.handleDragStart}
                onDrag={handleDrag}
                // onDragEnd={this.handleDragEnd}
            />
            <TiDeleteOutline style={{
                ...style,
                left: style.left + style.width + 4,
                top: style.top - 20,
                transform: `rotate(${style.rotateAngle}deg)`,
                position: "absolute",
                width: "25px",
                height: "25px",
                color: "#eb5648",
                cursor: "pointer"
            }}
                             className="del"
                             onClick={() => {
                                 props.isImage ?
                                     props.DELETE_IMAGE(props.index)
                                     :
                                     props.DELETE_TEXT(props.index)
                             }}
            />
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {

    };
}, (dispatch) => {
    return {
        DELETE_IMAGE: (index: number) => dispatch(DELETE_IMAGE(index)),
        DELETE_TEXT: (index: number) => dispatch(DELETE_TEXT(index)),
        // SELECT_IMAGE: (index: number) => dispatch(SELECT_IMAGE(index)),
        SELECT_TEXT: (index: number) => dispatch(SELECT_TEXT(index)),
    }
})(Draggable)