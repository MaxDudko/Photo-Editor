import React from "react";
import styles from "./NewImage.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import Draggable from "../Draggable/Draggable";
import {SELECT_TEXT} from "../../store/actions";
import Fabric from "../Fabric/Fabric";


interface IProps {
    images: string[],
    texts: string[],
    shapes: string[],
    stylesCommon: any,

}

const NewImage: React.FC<IProps> = (props) => {


    return(
        <div className={styles.imageBox} id="NewImage" style={{...props.stylesCommon}}>
            <Fabric />
            {/*{*/}
            {/*    props.images.map((e: any, i: number) => (*/}
            {/*        <Draggable key={i}*/}
            {/*                   index={i}*/}
            {/*                   type="image"*/}
            {/*                   content={e}*/}
            {/*        />*/}
            {/*    ))*/}
            {/*}*/}
            {/*{*/}
            {/*    props.texts.map((e: any, i: number) => (*/}
            {/*        <Draggable key={i}*/}
            {/*                   index={i}*/}
            {/*                   type="text"*/}
            {/*                   content={e}*/}
            {/*        />*/}
            {/*    ))*/}
            {/*}*/}
            {/*{*/}
            {/*    props.shapes.map((e: any, i: number) => (*/}
            {/*        <Draggable key={i}*/}
            {/*                   index={i}*/}
            {/*                   type="shape"*/}
            {/*                   content={e}*/}
            {/*        />*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        images: state.styles.images,
        texts: state.styles.texts,
        shapes: state.styles.shapes,
        stylesCommon: state.styles.stylesCommon,
    };
}, (dispatch) => {
    return {
    }
})(NewImage)