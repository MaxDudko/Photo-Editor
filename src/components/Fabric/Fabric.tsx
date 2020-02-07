import React, {useEffect} from "react";
import styles from "./Fabric.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import {fabric} from "fabric";
import logo from "../../logo.svg"

interface IProps {
    images: any,
    selectedImage: number,
    texts: any,
    selectedText: number,
    shapes: any,
    stylesCommon: any,
}

const Fabric :React.FC<IProps> = (props) => {
    // let [canvas, createCanvas] = React.useState();
    let style = {
        left: 100,
        top: 100
    };

    // let testURL =  "http://i.imgur.com/8rmMZI3.jpg";
    var canvas = new fabric.Canvas("NewImage");

    // useEffect(() => {
    //     createCanvas(new fabric.Canvas("NewImage"));
    // }, []);

    function addImage (url: any, n: number) {
        fabric.Image.fromURL(url, function (img) {
            img.set({
                left: style.left + n * 100,
                top: style.top + n *100,
                hasBorders: true,
                hasControls: true,
                hasRotatingPoint: true,
                selectable: true,
            });
            canvas.add (img);
        });
    }

    useEffect(() => {
        // fabric.Image.fromURL(props.images[props.images.length - 1], function (img) {
        //     canvas.add(img);
        //     canvas.renderAll();
        // });
        props.images.map((img: string, i: number) => {
            console.log(canvas);
            addImage(img, i)
        });
        canvas.renderAll();
    },[props.images]);

    useEffect(() => {
        props.texts.map((text: string, i: number) => {
            let options = props.selectedText === i ?
                {
                    hasBorders: true,
                    hasControls: true,
                    hasRotatingPoint: true,
                    selectable: true,
                }
                :
                {
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false,
                };

            canvas.add(new fabric.Text(text, options));
        });
    }, [props.texts]);

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
        selectedImage: state.styles.selectedImage,
        texts: state.styles.texts,
        selectedText: state.styles.selectedText,
        shapes: state.styles.shapes,
        stylesCommon: state.styles.stylesCommon
    };
}, (dispatch) => {
    return {

    }
})(Fabric)
/*
let options = props.selectedImage === i ?
                {
                    hasBorders: true,
                    hasControls: true,
                    hasRotatingPoint: true,
                    selectable: true,
                }
                :
                {
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false,
                };
            fabric.Image.fromURL(img, function (img) {
                img.set(options);
                img.selectable = true;
                // img.setControlsVisibility({
                //     mt: true,
                //     mb: true,
                //     ml: true,
                //     mr: true,
                //     tr: true,
                //     tl: true,
                //     br: true,
                //     bl: true,
                //     mtr: true //the rotating point (defaut: true)
                // });
                // img.hasBorders = true;

                canvas.add(img);
                canvas.setActiveObject(img);
                // canvas.renderAll();
                // showControls(img);
                console.log(img)
                // canvas.add(img.set({ left: 250, top: 250, angle: 30 }).scale(0.25));

            });
        });
        canvas.renderAll();
*/