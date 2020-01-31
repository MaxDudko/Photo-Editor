import React from "react";
import styles from "./Draggable.module.scss";
import ResizableRect from 'react-resizable-rotatable-draggable';
import {TiDeleteOutline} from 'react-icons/ti'
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {SELECT_TEXT, SELECT_IMAGE, DELETE_IMAGE, DELETE_TEXT} from "../../store/actions";


interface IProps {
    content: any,
    index: number,
    isImage: boolean,

    selectedText: number,
    selectedImage: number,

    stylesTexts: any,
    stylesImages: any,

    stylesCommon: any,

    DELETE_IMAGE: any,
    DELETE_TEXT: any,
    SELECT_TEXT: any,
    SELECT_IMAGE: any,
}

const Draggable: React.FC<IProps> = (props) => {
    let [style, change] = React.useState({
        width: 400,
        height: 100,
        top: Math.random() * (300 - 100) + 100,
        left: Math.random() * (600 - 100) + 100,
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
            left: style.left + deltaX >= parseInt(props.stylesCommon.width) ? (style.left + deltaX) - style.width : style.left + deltaX,
            top: style.top + deltaY
        })
    };

    const handleDragEnd = () => {
        if(props.stylesCommon.width >= style.left) {
            change({
                ...style,
                left: props.stylesCommon.width - style.width
            })
        }
        if(props.stylesCommon.height >= style.top) {
            change({
                ...style,
                top: props.stylesCommon.height - style.height
            })
        }
    };

    const {width, top, left, height, rotateAngle} = style;

    const rect = (
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
            onDragEnd={handleDragEnd}
        />
    );
    
    return(
        <div className={styles.draggable}
             onClick={() => props.isImage ? props.SELECT_IMAGE(props.index) : props.SELECT_TEXT(props.index)}
             style={{left: style.left, top: style.top, position: "relative"}}
        >
            {
                props.isImage ?
                    <img src={props.content} alt="#"
                         style={
                             {
                                 width: style.width,
                                 height: style.height,
                                 position: "absolute",
                                 left: style.left,
                                 top: style.top,
                                 transform: `rotate(${style.rotateAngle}deg)`
                             }
                         }
                    />
                    :
                    <div style={
                        {
                            width: style.width,
                            height: style.height,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            ...props.stylesTexts[props.index],
                            position: "absolute",
                            left: style.left,
                            top: style.top,
                            transform: `rotate(${style.rotateAngle}deg)`,
                            fontSize: style.width/10
                            //    (style.width/500*100 + style.height/500*100)/2
                        }
                    }
                    >
                        {props.content}
                    </div>
            }
            {
                props.isImage ?
                    props.selectedImage === props.index ?
                        rect
                        :
                        null
                    :
                    props.selectedText === props.index ?
                        rect
                        :
                        null
            }
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        selectedText: state.styles.selectedText,
        selectedImage: state.styles.selectedImage,

        stylesTexts: state.styles.stylesTexts,
        stylesImages: state.styles.stylesImages,

        stylesCommon: state.styles.stylesCommon,
    };
}, (dispatch) => {
    return {
        DELETE_IMAGE: (index: number) => dispatch(DELETE_IMAGE(index)),
        DELETE_TEXT: (index: number) => dispatch(DELETE_TEXT(index)),
        SELECT_IMAGE: (index: number) => dispatch(SELECT_IMAGE(index)),
        SELECT_TEXT: (index: number) => dispatch(SELECT_TEXT(index)),
    }
})(Draggable)