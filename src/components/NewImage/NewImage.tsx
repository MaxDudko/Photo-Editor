import React from "react";
import styles from "./NewImage.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import Draggable from "../Draggable/Draggable";
import {SELECT_TEXT} from "../../store/actions";


interface IProps {
    images: string[],
    texts: string[],
    stylesCommon: any,

}

const NewImage: React.FC<IProps> = (props) => {


    return(
        <div className={styles.imageBox} id="NewImage" style={{...props.stylesCommon}}>
            {
                props.images.map((e: any, i: number) => (
                    <Draggable key={i}
                               index={i}
                               isImage={true}
                               content={e}
                    />
                ))
            }
            {
                props.texts.map((e: any, i: number) => (
                    <Draggable key={i}
                               index={i}
                               isImage={false}
                               content={e}
                    />
                ))
            }
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        images: state.styles.images,
        texts: state.styles.texts,
        stylesCommon: state.styles.stylesCommon,
    };
}, (dispatch) => {
    return {
    }
})(NewImage)