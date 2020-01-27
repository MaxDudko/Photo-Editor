import React from "react";
import styles from "./NewImage.module.scss";
import {connect} from "react-redux";
import {IReduxState} from "../../store/reducers";
import Draggable from "../Draggable/Draggable";
import {SELECT_TEXT} from "../../store/actions";


interface IProps {
    images: string[],
    selectedImage: number,

    texts: string[],
    selectedText: number,

    stylesCommon: any,
    stylesImages: any,
    stylesTexts: any,

}

const NewImage: React.FC<IProps> = (props) => {


    return(
        <div className={styles.imageBox} id="NewImage" style={{...props.stylesCommon}}>
            {
                props.images.map((e: any, i: number) => (
                    <Draggable key={i}
                               index={i}
                               isImage={true}
                               content={
                                   <img src={e} alt="img" />
                               }
                    />
                ))
            }
            {
                props.texts.map((e: any, i: number) => (
                    <Draggable key={i}
                               index={i}
                               isImage={false}
                               content={
                                   <svg>
                                       <text x="50%" y="50%" textAnchor="middle">{e}</text>
                                   </svg>
                               }
                    />
                ))
            }
        </div>
    )
};

export default connect((state: IReduxState) => {
    return {
        images: state.images.images,
        selectedImage: state.images.selectedImage,

        texts: state.texts.texts,
        selectedText: state.texts.selectedText,

        stylesCommon: state.common.stylesCommon,
        stylesImages: state.images.stylesImages,
        stylesTexts: state.texts.stylesTexts,
    };
}, (dispatch) => {
    return {
    }
})(NewImage)