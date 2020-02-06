import React, {useEffect} from "react";
import styles from "./Fabric.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {fabric} from "fabric";

interface IProps {
    images: any,
    texts: any,
    shapes: any,
    stylesCommon: any,
}

const Fabric :React.FC<IProps> = (props) => {

    useEffect(() => {
        const canvas = new fabric.Canvas("NewImage");

        fabric.Image.fromURL(props.images[0], (img) => {
            // img.set({
            // });
            // canvas.add(img)
            img.set({left: 0, top: 0, angle: 0,width:100, height:100}).scale(0.9);
            canvas.add(img);
            canvas.setActiveObject(img)

        });

    }, [props.images]);

    return(
        <div className={styles.Factory} style={props.stylesCommon}>
            <canvas id="NewImage"
                    width={props.stylesCommon.width}
                    height={props.stylesCommon.height}
            >

            </canvas>
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        images: state.styles.images,
        texts: state.styles.texts,
        shapes: state.styles.shapes,
        stylesCommon: state.styles.stylesCommon
    };
}, (dispatch) => {
    return {

    }
})(Fabric)